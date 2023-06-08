/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        dbConfig: {
            host: '188.40.63.41',
            port: 3306,
            user: 'bsenergy_jey',
            password: 'Colombia2320*',
            database: 'bsenergy_LCheck'
        },
        secret: 'Space shield by BsEnergy and Developer Jey',
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'https://spaceshield.bsenergy.co/api', // production api
        pack1: 'https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c938084888a408101888e53f99f01bf', // 1 Licencia
        pack2: 'https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c938084889721b7018898b6e71700d4', // 5 Licencias
        pack3: 'https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c93808488907a38018898bac13c03df', // 10 Licencias
    }
}

module.exports = nextConfig