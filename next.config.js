/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        dbConfig: {
            host: '127.0.0.1',
            port: 3306,
            user: 'client',
            password: '123456', // @@@
            database: 'bsenergy_lcheck'
        },
        secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING',
        mercadopago: {
            public_key: 'TEST-2c743e03-ac20-42a1-b64e-4b5c36d3428a',
            prod_access_token: 'TEST-823531383461361-050718-d29192cbcff54bd3d9449e8b7f9083a5-137824649'
        }
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'http://localhost:3000/api' // production api
    }
}

module.exports = nextConfig