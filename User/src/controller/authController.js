import User from "../models/User.js";
import {
  createJwtToken,
  verifyJwtToken,
} from "../middleware/token.js";
import _ from "lodash";
import nodemailer from "nodemailer";

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
    // create  a token for this user and send it back as response
    const payload = {
      userId: newUser._id,
      FullName: newUser.FullName,
      PhoneNumber: newUser.PhoneNumber,
      email: newUser.email,
      role: newUser.role, 
    };
    const token = createJwtToken(payload);

    res
      .status(201)
      .json({ message: "User registered successfully", newUser, token });
    // if (newUser.role === 'admin') {
    //   res.redirect('/admin-dashboard' );
    // } else {
    //   res.json({ token, redirect: '/dashboard' });
    // }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
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

    res.status(201).json({ message: "User login successfully", token });
    // if (user.role === 'admin') {
    //   res.redirect('/admin-dashboard');
    // } else {
    //   res.redirect('/dashboard');
    // }
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
      res.status(400).json("Invalid email");
      return;
    }
    // Check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json("User doesn't Exist");
      return;
    }
    // Generate token and resetLink
    const resetToken = createJwtToken({ userId: user._id }, { expiresIn: "5m" });
    if (!resetToken) {
      return res
        .status(500)
        .json({ message: "An error occurred,Please try again later" });
    }
    const resetLink = `http://localhost:2024/api/reset-password/:${resetToken}`;

    // Save resetLink
    user.resetLinkToken = resetToken;
    await user.save();
    // Send resetLink using nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.EMAIL_,
        pass: process.env.PASSWORD_,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_,
      to: email,
      subject: "Forgot password reset link",
      text: resetLink,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Email error application", error.message);
      } else {
        console.log(
          `${new Date().toLocaleString()} - Email sent successfully:` +
            info.response
        );
      }
    });
    res
      .status(200)
      .json({ message: "Your Password Reset link has been sent to your mail" });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
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
        return res.status(400).json({ error: "User with this reset-link doesn't exist" });
      }

      // Update user's password and resetLinkToken
      user.password = newPass;
      user.resetLinkToken = null;
      await user.save();

      // Send email with the new password
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: process.env.EMAIL_,
          pass: process.env.PASSWORD_,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_,
        to: user.email,
        subject: "Your Password has been updated",
        html: `<h2>Here's your new password</h2><p>New password: ${newPass}</p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error.message);
        } else {
          console.log("Email sent: " + info.accepted);
        }
      });

      return res.status(200).json({ message: "User password reset successfully" });
    } else {
      return res.status(401).json({ error: "Authentication error" });
    }
  } catch (error) {
    console.log(error);
    next({error:"Server error"});
  }
};

