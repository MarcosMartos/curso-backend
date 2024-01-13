import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import config from "../config/config.js";

async function matchPasswords(passwordToCompare, originalPassword) {
  const result = await bcrypt.compare(passwordToCompare, originalPassword);

  return result;
}

async function generateToken(data) {
  const token = await jwt.sign(data, config.jwt_secret, {
    expiresIn: "7d",
  });

  return token;
}

async function customResponse(res, status, message) {
  return res.status(status).json({ message: message });
}

function createUniqueToken() {
  const uniqueToken = uuidv4();

  return uniqueToken;
}

async function sendEmail(options) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.mail_user,
      pass: config.mail_password,
    },
  });

  options.from = config.mail_user;
  await transporter.sendMail(options);
}

export {
  generateToken,
  customResponse,
  matchPasswords,
  createUniqueToken,
  sendEmail,
};
