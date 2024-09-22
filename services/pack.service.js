import getConfig from "next/config";

import { fetchWrapper } from "helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/packs`;

export const packService = {
  register,
  getAll,
  getById,
  update,
  updateSessionPayment,
  delete: _delete,
};

async function register(user) {
  return await fetchWrapper.post(`${baseUrl}/register`, user);
}

async function getAll(id_user) {
  return await fetchWrapper.post(baseUrl, id_user);
}

async function getById(id) {
  return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function update(id, params) {
  await fetchWrapper.put(`${baseUrl}/${id}`, params);
}

async function updateSessionPayment(id, params) {
  await fetchWrapper.patch(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(id) {
  await fetchWrapper.delete(`${baseUrl}/${id}`);
}
