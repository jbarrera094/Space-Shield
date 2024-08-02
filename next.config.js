/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    dbConfig: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    secret: process.env.SECRET_PHRASE,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    stripe_webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
  },
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
    baseUrl: process.env.BASE_URL,
    pack1: process.env.PACK1,
    pack2_monthly: process.env.PACK2_MONTHLY,
    pack3_monthly: process.env.PACK3_MONTHLY,
    pack2_annual: process.env.PACK2_ANNUAL,
    pack3_annual: process.env.PACK3_ANNUAL,
    next_public_stripe_publishable_key:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
};

module.exports = nextConfig;
