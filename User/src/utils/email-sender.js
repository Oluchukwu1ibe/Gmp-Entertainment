import nodemailer from 'nodemailer';
import verificationTemplate from './templates/verification-template.js';
import welcomeTemplate from './templates/welcome-template.js';
import fgPasswordTemplate from './templates/FgPassword-template.js';
import resetPasswordTemplate from './templates/resetPassword-template.js';



const sendVerificationEmail = async (email,otp) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host:  "smtp.gmail.com",
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
      console.log(
        `${new Date().toLocaleString()} - Email sent successfully:` +
          info.response
      );
    } catch (error) {
      console.log("Email error:", error.message);
    throw new error("Couldn't send verification OTP.");
    }
  };

const sendWelcomeEmail = async(email)=>{
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host:  "smtp.gmail.com",
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
    console.log(
      `${new Date().toLocaleString()} - Email sent successfully:` +
        info.response
    );
  } catch (error) {
    console.log("Email error:", error.message);
    throw new error("Couldn't send the welcome email.");
  }
};


const sendFgPasswordLink = async(email,resetLink)=>{
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host:  "smtp.gmail.com",
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
    console.log(
      `${new Date().toLocaleString()} - Email sent successfully:` +
        info.response
    );
  } catch (error) {
    console.log("Email error:", error.message);
    throw new error("Couldn't send the resetLink to email.");
  }
};

const sendResetPassConfirmation = async(email)=>{
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host:  "smtp.gmail.com",
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
    console.log(
      `${new Date().toLocaleString()} - Email sent successfully:` +
        info.response
    );
  } catch (error) {
    console.log("Email error:", error.message);
    throw new error("Couldn't send Reset Password .");
  }
};


  export{sendVerificationEmail,sendWelcomeEmail,sendFgPasswordLink,sendResetPassConfirmation};