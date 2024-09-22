import getConfig from 'next/config';
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
    return await db.License.findAll({ where: { id_pack: params.id_pack } });
}

async function getById(id) {
    return await db.License.findByPk(id);
}

async function create(params) {
    // validate
    // Primero consultar cuantas licencias lleva registradas el pack
    const pack = await db.Pack.findByPk(params.id_pack);
    if (!pack) throw 'Pack not found';

    if (pack.licenses_available > 0){
        // Validar  si ese mismo nombre de usuario ya existe en las licencias del administrador
        if (await db.License.findOne({ where: { id_pack: params.id_pack, user: params.user } })) {
            throw 'user "' + params.user + '" is already taken';
        }
        const license = new db.License(params);
    
        // hash password
        /* if (params.password) {
            license.hash = bcrypt.hashSync(params.password, 10);
        }*/
        license.hash = params.password;
    
        // save license
        await license.save();

        // restarle una licencia al pack
        pack.licenses_available = pack.licenses_available - 1;
        await pack.save();
    } else {
        throw 'No Licenses Available';
    }
}

async function update(id, params) {
    const license = await db.License.findByPk(id);

    // validate
    if (!license) throw 'License not found';
    if (await db.License.findOne({ where: { user: params.user } })) {
        throw 'User "' + params.user + '" is already taken';
    }

    // hash password if it was entered
    /*if (params.password) {
        params.hash = bcrypt.hashSync(params.password, 10);
    }*/
    params.hash = params.password ? params.password : license.hash;

    // copy params properties to user
    Object.assign(license, params);

    await license.save();
}

async function _delete(id_license) {
    const license = await db.License.findByPk(id_license);
    if (!license) throw 'License not found';

    // sum available license to this pack
    const id_pack = license.id_pack;
    const pack = await db.Pack.findByPk(id_pack);
    if (!pack) throw 'Pack not found';
    pack.licenses_available = pack.licenses_available + 1;
    await pack.save();

    // delete license
    await license.destroy();

    
}
