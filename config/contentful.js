import { createClient } from 'contentful';
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();
const contentful_space_id = `${serverRuntimeConfig.contentful_space_id}`;
const contentful_access_token = `${serverRuntimeConfig.contentful_access_token}`;


export const client = createClient({
    space: contentful_space_id,       // ID de tu espacio en Contentful
    accessToken: contentful_access_token, // Token de acceso de API
});