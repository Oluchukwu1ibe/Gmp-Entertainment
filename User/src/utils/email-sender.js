const nodemailer = require('nodemailer');
const verificationTemplate = require('./templates/verification-template.js');
const welcomeTemplate = require('./templates/welcome-template.js');
const fgPasswordTemplate = require('./templates/FgPassword-template.js');
const resetPasswordTemplate = require('./templates/resetPassword-template.js');
const logger =require('./log/log.js');

const sendVerificationEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_,
        pass: process.env.PASSWORD_,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_,
      to: email,
      subject: "Verification OTP",
      html: verificationTemplate(otp),
    };
    const info = await transporter.sendMail(mailOptions);
    logger.info(
      `${new Date().toLocaleString()} - Email sent successfully:` +
        info.response
    );
  } catch (error) {
    logger.error("Email error:", error.message);
    throw new Error("Couldn't send verification OTP.");
  }
};

const sendWelcomeEmail = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_,
        pass: process.env.PASSWORD_,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_,
      to: email,
      subject: "Welcome to GMPEntertainment",
      html: welcomeTemplate(),
    };
    const info = await transporter.sendMail(mailOptions);
    logger.info(
      `${new Date().toLocaleString()} - Email sent successfully:` +
        info.response
    );
  } catch (error) {
    logger.error("Email error:", error.message);
    throw new Error("Couldn't send the welcome email.");
  }
};

const sendFgPasswordLink = async (email, resetLink) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_,
        pass: process.env.PASSWORD_,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_,
      to: email,
      subject: "Forget Password Link Email",
      html: fgPasswordTemplate(resetLink),
    };
    const info = await transporter.sendMail(mailOptions);
    logger.info(
      `${new Date().toLocaleString()} - Email sent successfully:` +
        info.response
    );
  } catch (error) {
    logger.error("Email error:", error.message);
    throw new Error("Couldn't send the resetLink to email.");
  }
};

const sendResetPassConfirmation = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_,
        pass: process.env.PASSWORD_,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_,
      to: email,
      subject: "Password Reset Successful",
      html: resetPasswordTemplate(),
    };
    const info = await transporter.sendMail(mailOptions);
    logger.info(
      `${new Date().toLocaleString()} - Email sent successfully:` +
        info.response
    );
  } catch (error) {
    logger.error("Email error:", error.message);
    throw new Error("Couldn't send Reset Password.");
  }
};

module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendFgPasswordLink,
  sendResetPassConfirmation,
};
