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
const passport = require("passport");

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
router.get("/auth/google", passport.authenticate("google-user", { scope: ["profile", "email"] }));
router.get(
  "/auth/google/callback",
  (req, res, next) => {
    passport.authenticate("google-user", { session: false }, (err, authData, info) => {
      if (err || !authData) {
        return res.status(400).json({ error: "Google authentication failed" });
      }

      // Extract userResponse and token correctly
      const { userResponse, token } = authData;

      return res.status(200).json({
        success: true,
        message: "Google authentication successful",
        user: userResponse,
        token: token,
      });
    })(req, res, next);
  }
);



module.exports = router;
