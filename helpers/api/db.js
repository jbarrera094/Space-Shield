import getConfig from "next/config";
import mysql from "mysql2/promise";
import { Sequelize, DataTypes } from "sequelize";

const { serverRuntimeConfig } = getConfig();

export const db = {
  initialized: false,
  initialize,
};

// initialize db and models, called on first api request from /helpers/api/api-handler.js
async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = serverRuntimeConfig.dbConfig;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: "mysql",
  });

  // init models and add them to the exported db object
  db.User = userModel(sequelize);
  db.Pack = packModel(sequelize);
  db.License = licenseModel(sequelize);

  // sync all models with database
  // await sequelize.sync({ alter: true });

  // Created Views
  // createViewPacks(sequelize);
  // createViewLicenses(sequelize);
  // await sequelize.sync({ alter: true });

  db.initialized = true;
}

function createViewPacks(sequelize) {
  // Definir una consulta SQL para crear la vista
  const createViewQuery = `
        CREATE OR REPLACE VIEW view_packs AS
        SELECT *,
            DATEDIFF(expiration_date, CURDATE()) AS dl98uj
        FROM packs p ;
    `;

  // Ejecutar la consulta SQL utilizando Sequelize
  sequelize
    .query(createViewQuery)
    .then(() => {
      console.log("Vista de Packs creada exitosamente.");
    })
    .catch((err) => {
      console.error("Error al crear la vista:", err);
    });
}

function createViewLicenses(sequelize) {
  // Definir una consulta SQL para crear la vista
  const createViewQuery = `
        CREATE OR REPLACE VIEW view_licenses AS
        SELECT l.id_license, l.id_pack, l.user, l.hash, l.date_last_registration, l.l435hdi6i, l.s43ghr, l.l88hgnb9m, l.l87ybf5p, l.lhf838os, l.p8326h77n, l.s23hjg8t, l.lbb73g3n, l.p3dsfuh7l, l.o56undm6t, l.lr32r3lr, l.j8h38ff2v, l.pik87678fh3, l.createdAt, l.updatedAt, l.nh2398y1t, l.y55232jps7, vp.dl98uj FROM licenses l LEFT JOIN view_packs vp ON l.id_pack = vp.id_pack;
    `;

  // Ejecutar la consulta SQL utilizando Sequelize
  sequelize
    .query(createViewQuery)
    .then(() => {
      console.log("Vista de Licenses creada exitosamente.");
    })
    .catch((err) => {
      console.error("Error al crear la vista:", err);
    });
}

// sequelize models with schema definitions

function userModel(sequelize) {
  const attributes = {
    id_user: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: { type: DataTypes.STRING, allowNull: false },
    hash: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
  };

  const options = {
    defaultScope: {
      // exclude password hash by default
      attributes: { exclude: ["hash"] },
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {} },
    },
  };

  return sequelize.define("user", attributes, options);
}

function packModel(sequelize) {
  const attributes = {
    id_pack: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: { type: DataTypes.BIGINT, allowNull: false },
    alias: { type: DataTypes.STRING, allowNull: false },
    paid: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
    licenses_available: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    sessionIdStripe: { type: DataTypes.STRING, allowNull: true },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal(
        `DATE_ADD(CURRENT_DATE, INTERVAL 45 DAY)`
      ),
    },
    createdAtTimeCol: { type: DataTypes.STRING, allowNull: false },
  };

  const options = {};

  return sequelize.define("pack", attributes, options);
}

function licenseModel(sequelize) {
  const attributes = {
    id_license: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_pack: { type: DataTypes.BIGINT, allowNull: false },
    user: { type: DataTypes.STRING, allowNull: false },
    hash: { type: DataTypes.STRING, allowNull: false },
    date_last_registration: { type: DataTypes.DATE, allowNull: true },
    l435hdi6i: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    s43ghr: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    l88hgnb9m: { type: DataTypes.STRING, allowNull: true, defaultValue: "NA" },
    l87ybf5p: { type: DataTypes.STRING, allowNull: true, defaultValue: "NA" },
    lhf838os: { type: DataTypes.STRING, allowNull: true, defaultValue: "NA" },
    p8326h77n: { type: DataTypes.STRING, allowNull: true, defaultValue: "NA" },
    s23hjg8t: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    },
    nh2398y1t: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    lbb73g3n: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    },
    p3dsfuh7l: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    },
    o56undm6t: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    },
    lr32r3lr: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    },
    y55232jps7: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 37 },
    j8h38ff2v: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: true },
    pik87678fh3: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 73 },
  };

  const options = {};

  return sequelize.define("license", attributes, options);
}
