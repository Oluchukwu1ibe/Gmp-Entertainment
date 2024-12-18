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

module.exports = router;
