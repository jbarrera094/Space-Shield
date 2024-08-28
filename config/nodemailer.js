import nodemailer from "nodemailer";

const email = process.env.EMAIL_SERVICE;
const password = process.env.PASSWORD_EMAIL_SERVICE;


export const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 465,
  auth: {
    user: email,
    pass: password,
  },
});