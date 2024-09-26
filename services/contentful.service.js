import getConfig from "next/config";

import { fetchWrapper } from "helpers";

const { publicRuntimeConfig } = getConfig();
const apiUrl = `${publicRuntimeConfig.apiUrl}/contentful`;

export const contentfulService = {
    news,
    status,
};

async function news(language) {
    return await fetchWrapper.get(`${apiUrl}/news/${language}`);
}

async function status() {
    return await fetchWrapper.get(`${apiUrl}/status`);
}
