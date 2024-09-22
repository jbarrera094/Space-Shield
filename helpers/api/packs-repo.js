import getConfig from "next/config";
import { db } from "helpers/api";

const { serverRuntimeConfig } = getConfig();

export const PacksRepo = {
  getAll,
  getById,
  create,
  update,
  updateSessionPayment,
  delete: _delete,
};

async function getAll(params) {
  return await db.Pack.findAll({
    where: { id_user: params.id_user, paid: true },
  });
}

async function getById(id) {
  return await db.Pack.findByPk(id);
}

/**
 * Validaciones:: Si el paquete(alias) existe si NO existe CREARLA, si existe entonces validar si es del usuario actual, si no ERROR(Paquete ocupado)
 * En caso de serlo validar si fue pagada, si ya se pago entonces ERROR (Paquete ya fue adquirido), si no
 * Proseguir con el pago sin crear la licencia
 */
async function create(params) {
  const tempPack = await db.Pack.findOne({ where: { alias: params.alias } });
  if (tempPack) {
    if (tempPack.id_user == params.id_user) {
      if (tempPack.paid) {
        throw 'Pack "' + params.alias + '" is already in your library';
      } else {
        return tempPack.id_pack;
      }
    } else {
      throw 'Pack "' + params.alias + '" is already taken';
    }
  } else {
    // DateTime utC-5 (Colombian Time)
    const now = new Date();
    const offset = -5 * 60; // Desplazamiento horario en minutos (UTC-5)
    const adjustedTime = new Date(now.getTime() + offset * 60000);
    const formattedDateTime = adjustedTime
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    params["createdAtTimeCol"] = formattedDateTime;

    const pack = new db.Pack(params);

    // Update licenses available
    if (params.typePack == 1) {
      pack.licenses_available = 1;
    } else if (params.typePack == 2 || params.typePack == 21) {
      pack.licenses_available = 5;
    } else if (params.typePack == 3 || params.typePack == 31) {
      pack.licenses_available = 10;
    }

    // save license
    await pack.save();

    // return pack id
    return pack.dataValues.id_pack;
  }
}

async function update(id, params) {
  const pack = await db.Pack.findByPk(id);

  // validate
  if (!pack) throw "Pack not found";
  if (
    await db.Pack.findOne({
      where: { alias: params.alias, id_user: params.id_user },
    })
  ) {
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

async function updateSessionPayment(id, params) {
  const pack = await db.Pack.findByPk(id);

  // validate
  if (!pack) {
    console.log("Pack not found");
    throw "Pack not found";
  }

  // copy params properties to pack
  Object.assign(pack, params);

  await pack.save();

  return pack.dataValues.id_pack;
}

async function _delete(id_license) {
  const license = await db.License.findByPk(id_license);
  if (!license) throw "License not found";

  // sum available license to this user
  const id_user = license.id_user;
  const admin = await db.User.findByPk(id_user);
  if (!admin) throw "User not found";
  admin.licenses_available = admin.licenses_available + 1;
  await admin.save();

  // delete license
  await license.destroy();
}
