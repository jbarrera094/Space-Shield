import mysql from "mysql2/promise";

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