import getConfig from 'next/config';
import { db } from 'helpers/api';

const { serverRuntimeConfig } = getConfig();

export const PacksRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(params) {
    return await db.Pack.findAll({ where: { id_user: params.id_user } });
}

async function getById(id) {
    return await db.Pack.findByPk(id);
}

async function create(params) {
    // Validar  si ese mismo nombre de usuario ya existe en las licencias del administrador
    if (await db.Pack.findByPk(params.id_pack)) {
        throw 'pack "' + params.alias + '" is already taken';
    }

    const pack = new db.Pack(params);
    
    // save license
    await pack.save();
}

async function update(id, params) {
    const pack = await db.Pack.findByPk(id);

    // validate
    if (!pack) throw 'Pack not found';
    if (await db.Pack.findOne({ where: { alias: params.alias } })) {
        throw 'Pack "' + params.alias + '" is already taken';
    }

    // copy params properties to user
    Object.assign(pack, params);

    // Update All Licences for this Pack
    const licenses = await db.License.findAll({ where: { id_pack: id } });
    licenses.map(async (license) => {
        license.user = params.alias + "_" + license.user.split("_")[1];
        await license.save();
    });

    await pack.save();
}

async function _delete(id_license) {
    const license = await db.License.findByPk(id_license);
    if (!license) throw 'License not found';

    // sum available license to this user
    const id_user = license.id_user;
    const admin = await db.User.findByPk(id_user);
    if (!admin) throw 'User not found';
    admin.licenses_available = admin.licenses_available + 1;
    await admin.save();

    // delete license
    await license.destroy();

    
}
