/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        dbConfig: {
            host: '127.0.0.1',
            port: 3306,
            user: 'USER_NAME',
            password: '',
            database: 'DB_NAME'
        },
        secret: 'Change this secret encrypt phrasal',
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'https://example.com/api', // production api
        pack1: '', // 1 Licencia
        pack2_annual: '', // 5 Licencias
        pack2_monthly: '', // 5 Licencias
        pack3_annual: '', // 10 Licencias
        pack3_monthly: '', // 10 Licencias
    }
}

module.exports = nextConfig