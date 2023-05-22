import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';
import { alertService } from './alert.service';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/licenses`;
const userSubject = new BehaviorSubject(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user')));

export const licenseService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

async function register(user) {
    await fetchWrapper.post(`${baseUrl}/register`, user);
}

async function getAll(id_user) {
    return await fetchWrapper.post(baseUrl, id_user);
}

async function getById(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function update(id, params) {
    await fetchWrapper.put(`${baseUrl}/${id}`, params);

    // update stored user if the logged in user updated their own record
    if (id === userSubject.value.id) {
        // update local storage
        const user = { ...userSubject.value, ...params };
        localStorage.setItem('user', JSON.stringify(user));

        // publish updated user to subscribers
        userSubject.next(user);
    }
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(id) {
    await fetchWrapper.delete(`${baseUrl}/${id}`);

    // auto logout if the logged in user deleted their own record
    if (id === userSubject.value.id) {
        logout();
    }
}
