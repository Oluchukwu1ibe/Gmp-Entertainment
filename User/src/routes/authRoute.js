const express = require("express");
const { 
  UserProfile, 
  changePassword, 
  deleteUser, 
  forgetPassword, 
  getAllUsers, 
  getUserByIdOrName, 
  login, 
  register, 
  resendOtp, 
  resetPassword, 
  updateUser, 
  verifyOtp 
} = require("../controller/authController");
const { authenticateUserToken } = require("../middleware/checkAuth");
const { subscribeNewsletter } = require("../controller/subscribeController");

const router = express.Router();

router.post('/register', register);
router.post('/verifyOtp/:user_id', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/login', login);
router.post('/forget-password', forgetPassword);
router.put('/reset-password', resetPassword);
router.get('/users', getAllUsers);
router.get('/users/:idOrName', getUserByIdOrName);
router.put('/users/edit', authenticateUserToken, updateUser);
router.delete('/users/:id', deleteUser);
router.get('/profile', authenticateUserToken, UserProfile);
router.post('/change-password', authenticateUserToken, changePassword);
router.post('/subscribe', subscribeNewsletter);

module.exports = router;
