import nodemailer from "nodemailer";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

const { email, password } = serverRuntimeConfig.mail_service;


export const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 465,
  auth: {
    user: email,
    pass: password,
  },
});