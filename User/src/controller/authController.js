const User = require("../models/User.js");
const { createJwtToken, verifyUserToken } = require("../middleware/token.js");
const _ = require("lodash");
const {
  sendFgPasswordLink,
  sendResetPassConfirmation,
  sendVerificationEmail,
  sendWelcomeEmail,
} = require("../utils/email-sender.js");
const generateOtp = require("../utils/otpGenerator.js");
const bcrypt = require("bcrypt");
const Vote = require("../models/Vote.js");
const { updateUserSchema } = require("../utils/validation.js");
const logger = require("../utils/log/log.js");


exports. register = async (req, res) => {
  try {
    const { password, email } = req.body;
    // validate the input
    if (!password || !email) {
      res.status(400).json({ error: "Input all fields" });
      return;
    }
    // check if user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: `User with ${email} already exists` });
    }

    // if not...
    const newUser = await User.create({
      email,
      password,
    });
    // generate OTP and save it to the database
    let otp = generateOtp();
    const otpExpirationTime = new Date(Date.now() + 5 * 60 * 1000);
    newUser.otpCode = otp;
    newUser.otpExpirationTime = otpExpirationTime;
    await newUser.save();
    //send verification Email with generated OTP
    await sendVerificationEmail(newUser.email, otp);
    logger.info({message:`OTP successfully sent to ${newUser.email}`});
    return res.status(200).json({
      success: true,
      message: `OTP successfully sent to ${newUser.email}`,
      newUser,
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

exports. verifyOtp = async (req, res) => {
  try {
    //  input
    const { otpCode } = req.body;
    if (!otpCode) {
      return res
        .status(400)
        .json({ message: "Please provide the otp code sent" });
    }
    // check if user  exist
    const user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    // Check if user is already verified
    if (user.isVerified) {
      return res.status(409).json({ message: "User is already verified" });
    }

    //    check if the otp is correct
    if (user.otpCode !== otpCode) {
      return res.status(400).json({ message: "OTP is incorrect" });
    }

    // Check if OTP has expired
    if (Date.now() > new Date(user.otpExpirationTime).getTime()) {
      return res
        .status(409)
        .json({ message: "OTP expired, please resend OTP" });
    }
    //create a payload and tokenize it
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };
    const token = createJwtToken(payload);
    // Mark isVerified and clear OTP
    user.isVerified = true;
    user.otpCode = null;
    user.otpExpirationTime = null;
    await user.save();
    //send welcome email
    await sendWelcomeEmail(user.email);
    // success response
     logger.info({ message: "OTP successfully verified"});
    return res.status(200).json({
      success: true,
      message: "OTP successfully verified",
      user,
      token,
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(503).json({
      error: error.message,
      message: "An error occurred during OTP verification",
    });
  }
};

exports. resendOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a new OTP code
    const otpCode = generateOtp(); // Assume you have a function to generate OTP code
    // Set expiration time to 5 minutes from now
    const otpExpirationTime = new Date(Date.now() + 5 * 60 * 1000);

    // Update user document with new OTP code and expiration time
    user.otpCode = otpCode;
    user.otpExpirationTime = otpExpirationTime;
    user.isVerified = false;
    await user.save();

    // Send email with new OTP
    await sendVerificationEmail(user.email, otpCode);
logger.info({ message: "OTP resent successfully"});
    return res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    logger.error(error.message);
    return res
      .status(500)
      .json({
        message: "An error occurred while resending OTP",
        error: error.message,
      });
  }
};

exports.login = async (req, res) => {
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
      return res.status(404).json({ message: "Email not Found" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // check if the otp has been verified and if not delete the user credentials
    if (!user.isVerified) {
      await User.findByIdAndDelete(user.id);
      return res
        .status(403)
        .json({ message: "Please verify your email first" });
    }

    //  Create JWT payload and sign the token
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };
    const token = createJwtToken(payload);
logger.info({message: "User login successfully"})
    return res.status(201).json({
      success: true,
      message: "User login successfully",
      user,
       token
       });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

// forgot password
exports. forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // Validate input
    if (!email) {
      res.status(400).json({ message: "Invalid email" });
      return;
    }
    // Check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User doesn't Exist" });
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
    await sendFgPasswordLink(email, resetLink);
    logger.info({message: "Your Password Reset link has been sent to your mail" });
    return res
      .status(200)
      .json({ message: "Your Password Reset link has been sent to your mail" });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// reset password
exports. resetPassword = async (req, res, next) => {
  try {
    const { newPass, resetLinkToken } = req.body;
    if (resetLinkToken) {
      // Verify token
      const decodedToken = verifyUserToken(resetLinkToken, next);

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
      await sendResetPassConfirmation(user.email);
      logger.info({ message: "User password reset successfully" });
      return res
        .status(200)
        .json({ message: "User password reset successfully" });
    } else {
      return res.status(401).json({ error: "Authentication error" });
    }
  } catch (error) {
    logger.error(error.message);
    next({ error: "Server error" });
  }
};

exports. getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json("Server Error");
  }
};

exports. getUserByIdOrName = async (req, res) => {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  } else if (req.params.name) {
    query.name = req.params.name;
  }

  try {
    const user = await User.findOne(query);
    if (!user) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    logger.error(err);
    res.status(500).json("Server Error");
  }
};

exports. UserProfile = async (req, res) => {
  try {
    const userId = req.user;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    logger.info({ message: "User Profile" }, user)
    res.status(200).json({ message: "User Profile" }, user);
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

exports. updateUser = async (req, res) => {
  const { error } = updateUserSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }
  try {
    const userId = req.user;
    const data = req.body;

    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    logger.info({ message: "User updated successfully"})
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports. deleteUser = async (req, res) => {
  try {
    // Find and delete the user
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If the user is deleted successfully, delete their associated vote(s)
    await Vote.deleteMany({ user: user._id });
logger.info({ message: "User and associated votes deleted successfully"})
    res.status(200).json({
      success: true,
      message: "User and associated votes deleted successfully",
    });
  } catch (error) {
    logger.error(error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// change password
exports. changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const userId = req.user;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Check if the new password is different from the old password
    const isSameAsOldPassword = await bcrypt.compare(
      newPassword,
      user.password
    );
    if (isSameAsOldPassword) {
      return res
        .status(400)
        .json({
          message: "New password cannot be the same as the old password",
        });
    }

    user.password = newPassword;
    await user.save();
    logger.info({message: "Password changed successfully" })
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    logger.error(error.message)
    res.status(500).json({ message: "Server error", error });
  }
};
