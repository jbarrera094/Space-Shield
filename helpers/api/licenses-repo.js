import getConfig from 'next/config';
import bcrypt from 'bcryptjs';
import { db } from 'helpers/api';

const { serverRuntimeConfig } = getConfig();

export const LicensesRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(params) {
    console.log(params);
    return await db.License.findAll({ where: { id_user: params.id_user } });
}

async function getById(id) {
    return await db.User.findByPk(id);
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw 'email "' + params.email + '" is already taken';
    }

    const user = new db.User(params);

    // hash password
    if (params.password) {
        user.hash = bcrypt.hashSync(params.password, 10);
    }

    // save user
    await user.save();
}

async function update(id, params) {
    const user = await db.User.findByPk(id);

    // validate
    if (!user) throw 'User not found';
    if (user.email !== params.email && await db.User.findOne({ where: { email: params.email } })) {
        throw 'email "' + params.email + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = bcrypt.hashSync(params.password, 10);
    }

    // copy params properties to user
    Object.assign(user, params);

    await user.save();
}

async function _delete(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';

    // delete user
    await user.destroy();
}
