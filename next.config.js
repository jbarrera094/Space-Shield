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
    mail_service: {
      email: process.env.EMAIL_SERVICE,
      password: process.env.PASSWORD_EMAIL_SERVICE,
    },
  },
  publicRuntimeConfig: {
    apiUrl: "https://lpscad.bsenergy.co/api",
    baseUrl: "https://lpscad.bsenergy.co",
    pack1: process.env.NEXT_PUBLIC_PACK1,
    pack2_monthly: process.env.NEXT_PUBLIC_PACK2_MONTHLY,
    pack3_monthly: process.env.NEXT_PUBLIC_PACK3_MONTHLY,
    pack2_annual: process.env.NEXT_PUBLIC_PACK2_ANNUAL,
    pack3_annual: process.env.NEXT_PUBLIC_PACK3_ANNUAL,
    next_public_stripe_publishable_key:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
};

module.exports = nextConfig;
