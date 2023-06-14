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
    const sequelize = new Sequelize(database, user, password, { host: host, dialect: 'mysql' });

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
        id_user: { type: DataTypes.BIGINT, allowNull: false},
        alias: { type: DataTypes.STRING, allowNull: false },
        paid: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        licenses_available: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        expiration_date: { type: DataTypes.DATE, allowNull: false, defaultValue: (new Date())},
        days_remaining: { type: DataTypes.INTEGER, allowNull: true },
        createdAtTimeCol: { type: DataTypes.STRING, allowNull: false },
    };

    const options = {};

    return sequelize.define('pack', attributes, options);
}

function licenseModel(sequelize) {
    var fechaAnterior = new Date();
    fechaAnterior.setDate(fechaActual.getDate() - 1);

    const attributes = {
        id_license: { type: DataTypes.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true },
        id_pack: { type: DataTypes.BIGINT, allowNull: false },
        user: { type: DataTypes.STRING, allowNull: false },
        hash: { type: DataTypes.STRING, allowNull: false },
        date_last_registration: { type: DataTypes.DATE, allowNull: true },
        LogedIn: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        SesionRuns: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        LastMachine: { type: DataTypes.STRING, allowNull: true },
        LastProid: { type: DataTypes.STRING, allowNull: true },
        LastOs: { type: DataTypes.STRING, allowNull: true },
        LastPronum: { type: DataTypes.STRING, allowNull: true },
        SolTime: { type: DataTypes.DATE, allowNull: true, defaultValue: fechaAnterior },
        NowTime: { type: DataTypes.DATE, allowNull: true, defaultValue: Date.now() },
        LastLin: { type: DataTypes.DATE, allowNull: true, defaultValue: fechaAnterior },
        LastPull: { type: DataTypes.DATE, allowNull: true, defaultValue: fechaAnterior },
        LastLout: { type: DataTypes.DATE, allowNull: true, defaultValue: fechaAnterior },
        LastRun: { type: DataTypes.DATE, allowNull: true, defaultValue: fechaAnterior },
        lastPassCh: { type: DataTypes.DATE, allowNull: true, defaultValue: fechaAnterior },
        Vvig_1: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        DaysLeft: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 45 }
    };

    const options = {};

    return sequelize.define('license', attributes, options);
}