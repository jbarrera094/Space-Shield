import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';
import { alertService } from './alert.service';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/licenses`;

export const licenseService = {
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

async function register(user) {
    await fetchWrapper.post(`${baseUrl}/register`, user);
}

async function getAll(id_pack) {
    return await fetchWrapper.post(baseUrl, id_pack);
}

async function getById(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function update(id, params) {
    await fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(id) {
    await fetchWrapper.delete(`${baseUrl}/${id}`);
}
