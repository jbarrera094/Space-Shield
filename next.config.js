/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        dbConfig: {
            host: '161.35.112.185',
            port: 3306,
            user: 'client',
            password: 'Space2320*',
            database: 'bsenergy_lcheck'
        },
        secret: 'Space shield by BsEnergy and Developer Jey',
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://161.35.112.185/api' // development api
            : 'http://161.35.112.185/api' // production api
    }
}

module.exports = nextConfig