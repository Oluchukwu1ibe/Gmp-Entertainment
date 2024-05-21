import User from "../models/User.js";
import { createJwtToken, verifyJwtToken } from "../middleware/token.js";
import _ from "lodash";
import nodemailer from "nodemailer";
import { sendFgPasswordLink, sendResetPassConfirmation, sendVerificationEmail, sendWelcomeEmail } from "../utils/email-sender.js";
import generateOtp from "../utils/otpGenerator.js";
import logger from "../utils/log/logger.js";

export const register = async (req, res) => {
  try {
    const { FullName, PhoneNumber, password, email } = req.body;
    // validate the input
    if (!FullName || !PhoneNumber || !password || !email) {
      res.status(400).json({ error: "Input all fields" });
      return;
    }
    // check if user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // if not...
    const newUser = await User.create({
      FullName,
      PhoneNumber,
      email,
      password,
    });
    // generate OTP and save it to the database
    let otp = generateOtp();
    newUser.otpCode = otp;
    await newUser.save();
    //send verification Email with generated OTP
    await sendVerificationEmail(newUser.email, newUser.FullName, otp);
    // logger.info(newUser);
    return res.status(200).json({
      success: true,
      message: `OTP successfully sent to ${newUser.email}`,
      newUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    //  input
    const { otpCode } = req.body;
    if (!otpCode) {
      return res
        .status(400)
        .json({ message: "Please provide the otp code sent" });
    }
    // check if user  exist
    const user = await User.findOne({ _id: req.params.user_id });
    if (!user) {
      return res.status(401).json({ message: "User not Found" });
    }

    // Check if user is already verified
    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }

    //    check if the otp is correct
    if (user.otpCode !== otpCode) {
      return res.status(400).json({message:"OTP is incorrect"});
    }
    
    // Check if OTP has expired
    const OtpExpirationTime = process.env.OTP_EXPIRATION_TIME;
    if (Date.now() > OtpExpirationTime) {
      return res.status(409).json({message:"OTP expired, please resend OTP"});
    }
    //create a payload and tokenize it
    const payload = {
      user: {
        userId: user._id,
        FullName: user.FullName,
        PhoneNumber: user.PhoneNumber,
        email: user.email,
        role: user.role,
      },
    };
    const token = createJwtToken(payload);
    // Mark isVerified and clear OTP
    user.isVerified = true;
    user.otpCode = null;
    await user.save();
    //send welcome email
    await sendWelcomeEmail(user.email,user.FullName);
    // success response
    logger.info(user._doc);
    return res.status(200).json({
      success: true,
      message: "OTP successfully verified",
      user,
      token,
    });
  } catch (error) {
    return res.status(503).json({
      error: error.message,
      message: "An error occurred during OTP verification",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide an email and password" });
    }
    // find the user by their email address
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    //  Create JWT payload and sign the token
    const payload = {
      userId: user._id,
      FullName: user.FullName,
      PhoneNumber: user.PhoneNumber,
      email: user.email,
      role: user.role,
    };
    const token = createJwtToken(payload);

    return res.status(201).json({ message: "User login successfully", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

// forgot password
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // Validate input
    if (!email) {
      res.status(400).json({message:"Invalid email"});
      return;
    }
    // Check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({message:"User doesn't Exist"});
      return;
    }
    // Generate token and resetLink
    const resetToken = createJwtToken(
      { userId: user._id },
      { expiresIn: "5m" }
    );
    if (!resetToken) {
      return res
        .status(500)
        .json({ message: "An error occurred,Please try again later" });
    }
    const resetLink = `http://localhost:2024/api/reset-password/:${resetToken}`;

    // Save resetLink
    user.resetLinkToken = resetToken;
    await user.save();
    // Send email
   await sendFgPasswordLink(email,resetLink);
   return res.status(200).json({ message: "Your Password Reset link has been sent to your mail" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// reset password
export const resetPassword = async (req, res, next) => {
  try {
    const { newPass, resetLinkToken } = req.body;
    if (resetLinkToken) {
      // Verify token
      const decodedToken = verifyJwtToken(resetLinkToken, next);

      if (!decodedToken) {
        return res.status(401).json({
          error: "Incorrect Token or it's expired.",
        });
      }

      // Find user by resetLinkToken
      const user = await User.findOne({ resetLinkToken });
      if (!user) {
        return res
          .status(400)
          .json({ error: "User with this reset-link doesn't exist" });
      }

      // Update user's password and resetLinkToken
      user.password = newPass;
      user.resetLinkToken = null;
      await user.save();

      // Send email
      await sendResetPassConfirmation(user.email,user.FullName);
      return res
        .status(200)
        .json({ message: "User password reset successfully" });
    } else {
      return res.status(401).json({ error: "Authentication error" });
    }
  } catch (error) {
    console.log(error);
    next({ error: "Server error" });
  }
};
