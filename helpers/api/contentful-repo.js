import { client } from 'config/contentful';

export const ContentfulRepo = {
    news,
    status,
};

async function news(locale) {
    const res = await client.getEntries({
        content_type: 'news', // Nombre del modelo en Contentful
        order: '-fields.date', // Ordenar por fecha de creación
        locale: locale // Idioma
    });

    return {
        items: res.items ?? []
    };
}

async function status() {
    const res = await client.getEntries({
        content_type: 'status', // Nombre del modelo en Contentful
    });

    return {
        items: res.items ?? []
    };
}