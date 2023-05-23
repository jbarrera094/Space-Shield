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
        paid: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
        licenses_available: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
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

    return sequelize.define('User', attributes, options);
}

function licenseModel(sequelize) {
    const attributes = {
        id_license: { type: DataTypes.BIGINT, allowNull: false, autoIncrement: true, primaryKey: true },
        id_user: { type: DataTypes.BIGINT, allowNull: false },
        user: { type: DataTypes.STRING, allowNull: false },
        hash: { type: DataTypes.STRING, allowNull: false },
        expiration_date: { type: DataTypes.DATE, allowNull: false, defaultValue: (new Date())},
        date_last_registration: { type: DataTypes.DATE, allowNull: true },
        info_device: { type: DataTypes.STRING, allowNull: true },
        days_remaining: { type: DataTypes.INTEGER, allowNull: true },
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            // attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            // withHash: { attributes: {}, }
        }
    };

    return sequelize.define('License', attributes, options);
}