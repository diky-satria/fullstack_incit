const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendMail = async (data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });
  try {
    await transporter.sendMail(data);
    return { success: true, message: "Send email verification successfully" };
  } catch (err) {
    return { success: false, message: "Failed to send email", error: err };
  }
};
