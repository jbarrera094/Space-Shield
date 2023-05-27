import getConfig from 'next/config';
import mysql from 'mysql2/promise';
import { Sequelize, DataTypes } from 'sequelize';

const { serverRuntimeConfig } = getConfig();

export const db = {
    initialized: false,
    initialize
};

// initialize db and models, called on first api request from /helpers/api/api-handler.js
async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = serverRuntimeConfig.dbConfig;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = userModel(sequelize);
    db.Pack = packModel(sequelize);
    db.License = licenseModel(sequelize);

    // sync all models with database
    await sequelize.sync({ alter: true });

    db.initialized = true;
}

// sequelize models with schema definitions

function userModel(sequelize) {
    const attributes = {
        id_user: { type: DataTypes.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true },
        email: { type: DataTypes.STRING, allowNull: false },
        hash: { type: DataTypes.STRING, allowNull: false },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('user', attributes, options);
}

function packModel(sequelize) {
    const attributes = {
        id_pack: { type: DataTypes.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true },
        id_user: { type: DataTypes.BIGINT, allowNull: false },
        alias: { type: DataTypes.STRING, allowNull: false },
        paid: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        licenses_available: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        expiration_date: { type: DataTypes.DATE, allowNull: false, defaultValue: (new Date())},
        days_remaining: { type: DataTypes.INTEGER, allowNull: true },
    };

    const options = {};

    return sequelize.define('pack', attributes, options);
}

function licenseModel(sequelize) {
    const attributes = {
        id_license: { type: DataTypes.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true },
        id_pack: { type: DataTypes.BIGINT, allowNull: false },
        user: { type: DataTypes.STRING, allowNull: false },
        hash: { type: DataTypes.STRING, allowNull: false },
        date_last_registration: { type: DataTypes.DATE, allowNull: true },
        logedIn: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        sessionRuns: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        lastMachine: { type: DataTypes.STRING, allowNull: true },
        lastProid: { type: DataTypes.STRING, allowNull: true },
        lastOs: { type: DataTypes.STRING, allowNull: true },
        lastPronum: { type: DataTypes.STRING, allowNull: true },
        solTime: { type: DataTypes.DATE, allowNull: true },
        nowTime: { type: DataTypes.DATE, allowNull: true },
        lastIn: { type: DataTypes.DATE, allowNull: true },
        lastPull: { type: DataTypes.DATE, allowNull: true },
        lastLout: { type: DataTypes.DATE, allowNull: true },
        lastRun: { type: DataTypes.DATE, allowNull: true },
        lastPassCh: { type: DataTypes.DATE, allowNull: true },
        VVig_1: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
    };

    const options = {};

    return sequelize.define('license', attributes, options);
}