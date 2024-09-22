import getConfig from "next/config";

import { fetchWrapper } from "helpers";

const { publicRuntimeConfig } = getConfig();
const apiUrl = `${publicRuntimeConfig.apiUrl}/mails`;
const baseUrl = `${publicRuntimeConfig.baseUrl}`;

export const mailService = {
  firstContact,
  resetPassword,
};

async function firstContact(email) {
  await fetchWrapper.post(`${apiUrl}/firstContact`, { email });
}

async function resetPassword(token, email) {
  await fetchWrapper.post(`${apiUrl}/resetPassword`, {
    url: baseUrl + "/account/reset-password?token=" + token,
    email: email,
  });
}
