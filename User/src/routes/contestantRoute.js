const express = require('express');
const { 
  createContestant, 
  login, 
  deleteContestant, 
  forgetPassword, 
  getAllContestants, 
  getContestantByIdOrName, 
  resendOtp, 
  resetPassword, 
  updateContestant, 
  uploadVideo, 
  verifyOtp, 
  uploadImage, 
  contestantProfile, 
  deleteVideo, 
  changePassword 
} = require('../controller/contestantController');
const upload = require('../utils/multer');
const { authenticateContestantToken } = require('../middleware/checkAuth');
const passport = require("passport");


const router = express.Router();

router.post('/addContestant', createContestant);
router.post('/verifyOtp/:contestant_id', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/login', login);
router.post('/forget-password', forgetPassword);
router.put('/reset-password', resetPassword);
router.get('/contestants', getAllContestants);
router.get('/contestants/:idOrName', getContestantByIdOrName);
router.put('/contestants/edit', authenticateContestantToken, updateContestant);
router.delete('/contestants/:id', deleteContestant);
router.get('/profile', authenticateContestantToken, contestantProfile);
router.post('/uploadImage', upload.single('image'), authenticateContestantToken, uploadImage);
router.post('/uploadVideo', upload.single('Video'), authenticateContestantToken, uploadVideo);
router.delete('/deleteVideo', authenticateContestantToken, deleteVideo);
router.post('/change-password', authenticateContestantToken, changePassword);
router.get(
  "/auth/google",
  passport.authenticate("google-contestant", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  (req, res, next) => {
    passport.authenticate("google-contestant", { session: false }, (err, data, info) => {
      if (err || !data) {
        return res.status(400).json({ error: "Google authentication failed" });
      }
      const { contestantResponse, token } = data;

      return res.status(200).json({
        success: true,
        message: "Google authentication successful",
        contestant: contestantResponse,
        token: token,
      });
    })(req, res, next);
  }
);

module.exports = router;
