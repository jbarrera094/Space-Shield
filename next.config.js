/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        dbConfig: {
            host: 'space-shield-v1.ck4pmf2u7pja.us-east-2.rds.amazonaws.com',
            port: 3306,
            user: 'admin',
            password: 'colombia2320',
            database: 'bsenergy_lcheck'
        },
        secret: 'Space shield by BsEnergy and Developer Jey',
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'https://spaceshield.bsenergy.co/api', // production api
        pack1: 'https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c938084888a408101888e53f99f01bf',
        pack2: 'https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c938084888a408101888e53f99f01bf',
    }
}

module.exports = nextConfig