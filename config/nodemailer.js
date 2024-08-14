import nodemailer from "nodemailer";

const email = 'comercial@bsenergy.co';
const pass = 'fptmmitzsaihpcwh';

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
});