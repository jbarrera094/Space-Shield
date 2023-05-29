/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        dbConfig: {
            host: '127.0.0.1',
            port: 3306,
            user: 'client',
            password: '123456',
            database: 'bsenergy_lcheck'
        },
        secret: 'Space shield by BsEnergy and Developer Jey',
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'http://localhost:3000/api' // production api
    }
}

module.exports = nextConfig