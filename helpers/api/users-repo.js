import getConfig from "next/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "helpers/api";

const { serverRuntimeConfig } = getConfig();

export const usersRepo = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  recover,
  reset,
  delete: _delete,
};

async function authenticate({ email, password }) {
  const user = await db.User.scope("withHash").findOne({ where: { email } });

  if (!(user && bcrypt.compareSync(password, user.hash))) {
    throw "email or password is incorrect";
  }

  // create a jwt token that is valid for 7 days
  const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, {
    expiresIn: "7d",
  });

  // remove hash from return value
  const userJson = user.get();
  delete userJson.hash;

  // return user and jwt
  return {
    ...userJson,
    token,
  };
}

async function getAll() {
  return await db.License.findAll();
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
  const saved_user = await user.save();

  // get a saved user
  // console.log(saved_user);

  // create a default package for this user
  const currentDate = new Date();
  const futureDate = new Date();
  const offset = -5 * 60; // Desplazamiento horario en minutos (UTC-5)
  const adjustedTime = new Date(currentDate.getTime() + offset * 60000);
  const formattedDateTime = adjustedTime
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  const pack = new db.Pack({
    id_user: saved_user.id_user,
    alias: saved_user.email,
    paid: true,
    licenses_available: 1,
    expiration_date: futureDate.setFullYear(currentDate.getFullYear() + 5),
    createdAtTimeCol: formattedDateTime,
  });

  await pack.save();
}

async function update(id, params) {
  const user = await db.User.findByPk(id);

  // validate
  if (!user) throw "User not found";
  if (
    user.email !== params.email &&
    (await db.User.findOne({ where: { email: params.email } }))
  ) {
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
  if (!user) throw "User not found";

  // delete user
  await user.destroy();
}

async function recover({ email }) {
  const user = await db.User.findOne({ where: { email } });

  if (!user) {
    throw "email not found";
  }

  // create a jwt token that is valid for 1 hour
  const token = jwt.sign({ sub: user.id_user }, serverRuntimeConfig.secret, {
    expiresIn: "1h",
  });

  // return user and jwt
  return {
    token,
  };
}

async function reset({ token, password }) {
  const id_user = jwt.decode(token).sub;

  const user = await db.User.findByPk(id_user);

  if (!user) {
    throw "User not found";
  }

  // update password and remove reset token
  user.hash = bcrypt.hashSync(password, 10);
  await user.save();
  return { id_user };
}
