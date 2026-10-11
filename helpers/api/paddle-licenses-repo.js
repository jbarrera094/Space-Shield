import mysql from "mysql2/promise";
import { randomInt } from "crypto";

const LICENSE_COUNTS = {
  basic: 2,
  professional: 3,
  corporate: 5,
};

const EXPIRATION_DATE = "2035-12-31 23:59:59";
const LOCK_NAME = "licensesV2_create_subscription";

function getDbConfig() {
  return {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
}

export const paddleLicensesRepo = {
  testConnection,
  findBySubscriptionId,
  createSubscriptionLicenses,
};

async function testConnection() {
  const connection = await mysql.createConnection(getDbConfig());

  try {
    const [rows] = await connection.execute(
      "SELECT COUNT(*) AS total FROM `licensesV2`"
    );

    return rows[0];
  } finally {
    await connection.end();
  }
}

async function findBySubscriptionId(subscriptionId) {
  const connection = await mysql.createConnection(getDbConfig());

  try {
    const [rows] = await connection.execute(
      "SELECT * FROM `licensesV2` WHERE `IdGroup` = ?",
      [subscriptionId]
    );

    return rows;
  } finally {
    await connection.end();
  }
}

async function createSubscriptionLicenses({
  subscriptionId,
  empresa,
  prefijo,
  plan,
}) {
  if (
    typeof subscriptionId !== "string" ||
    !subscriptionId.startsWith("sub_")
  ) {
    throw new Error("Invalid subscription ID");
  }

  const normalizedEmpresa =
    typeof empresa === "string" ? empresa.trim() : "";

  const normalizedPrefijo =
    typeof prefijo === "string"
      ? prefijo.trim().toUpperCase()
      : "";

  const normalizedPlan =
    typeof plan === "string"
      ? plan.trim().toLowerCase()
      : "";

  if (!normalizedEmpresa) {
    throw new Error("Empresa is required");
  }

  if (normalizedEmpresa.length > 256) {
    throw new Error("Empresa is too long");
  }

  if (!/^[A-Z]{3}$/.test(normalizedPrefijo)) {
    throw new Error("Invalid prefix");
  }

  const licenseCount = LICENSE_COUNTS[normalizedPlan];

  if (!licenseCount) {
    throw new Error("Invalid plan");
  }

  const connection = await mysql.createConnection(getDbConfig());

  let transactionStarted = false;
  let lockAcquired = false;

  try {
    // Evita que dos suscripciones generen el mismo id_pack
    // o los mismos usuarios al mismo tiempo.
    const [lockRows] = await connection.execute(
      "SELECT GET_LOCK(?, 10) AS acquired",
      [LOCK_NAME]
    );

    if (Number(lockRows[0]?.acquired) !== 1) {
      throw new Error("Could not acquire license creation lock");
    }

    lockAcquired = true;

    await connection.beginTransaction();
    transactionStarted = true;

    // Evita procesar dos veces el mismo webhook/suscripción.
    const [existingRows] = await connection.execute(
      "SELECT `id_license` FROM `licensesV2` WHERE `IdGroup` = ? LIMIT 1",
      [subscriptionId]
    );

    if (existingRows.length > 0) {
      await connection.rollback();
      transactionStarted = false;

      return {
        created: false,
        reason: "already_exists",
      };
    }

    // Generar el siguiente id_pack.
    const [packRows] = await connection.query(
      "SELECT COALESCE(MAX(CAST(`id_pack` AS UNSIGNED)), 0) AS maxPack FROM `licensesV2`"
    );

    const idPack = Number(packRows[0].maxPack) + 1;

    // Buscar el último consecutivo usado para este prefijo.
    const [userRows] = await connection.execute(
      "SELECT `user` FROM `licensesV2` WHERE `user` LIKE ?",
      [`${normalizedPrefijo}%`]
    );

    let maxUserNumber = 0;

    const userRegex = new RegExp(
      `^${normalizedPrefijo}(\\d+)$`
    );

    for (const row of userRows) {
      const match = String(row.user).match(userRegex);

      if (match) {
        maxUserNumber = Math.max(
          maxUserNumber,
          Number(match[1])
        );
      }
    }

    const createdUsers = [];

    for (let i = 1; i <= licenseCount; i++) {
      const userNumber = maxUserNumber + i;

      const generatedUser =
        normalizedPrefijo +
        String(userNumber).padStart(3, "0");

      const generatedHash =
        await generateUniqueHash(connection);

      await connection.execute(
        `INSERT INTO \`licensesV2\`
        (
          \`id_pack\`,
          \`IdGroup\`,
          \`user\`,
          \`hash\`,
          \`Kpny25\`,
          \`m3dfl087f\`
        )
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          idPack,
          subscriptionId,
          generatedUser,
          generatedHash,
          normalizedEmpresa,
          EXPIRATION_DATE,
        ]
      );

      createdUsers.push(generatedUser);
    }

    await connection.commit();
    transactionStarted = false;

    return {
      created: true,
      idPack,
      licenseCount,
      users: createdUsers,
    };
  } catch (error) {
    if (transactionStarted) {
      await connection.rollback();
    }

    throw error;
  } finally {
    if (lockAcquired) {
      try {
        await connection.execute(
          "SELECT RELEASE_LOCK(?)",
          [LOCK_NAME]
        );
      } catch {
        // La conexión también libera el lock al cerrarse.
      }
    }

    await connection.end();
  }
}

async function generateUniqueHash(connection) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let attempt = 0; attempt < 100; attempt++) {
    let value = "";

    for (let i = 0; i < 3; i++) {
      value += letters[randomInt(0, letters.length)];
    }

    value += String(randomInt(0, 1000)).padStart(3, "0");

    const [rows] = await connection.execute(
      "SELECT `id_license` FROM `licensesV2` WHERE `hash` = ? LIMIT 1",
      [value]
    );

    if (rows.length === 0) {
      return value;
    }
  }

  throw new Error("Unable to generate unique license key");
}