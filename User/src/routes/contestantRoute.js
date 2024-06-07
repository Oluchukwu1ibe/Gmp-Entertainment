import express from 'express';
import { createContestant,login, deleteContestant, forgetPassword, getAllContestants, getContestantByIdOrName, resendOtp, resetPassword, updateContestant, uploadVideo, verifyOtp, uploadImage } from '../controller/contestantController.js';
import upload from "../utils/multer.js";
import { authenticateContestantToken } from '../middleware/checkAuth.js';

const router = express.Router();

router.post('/addContestant',createContestant);
router.post('/verifyOtp/:contestant_id',verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/login',login);
router.post('/forget-password',forgetPassword);
router.put('/reset-password',resetPassword);
router.get('/contestants',getAllContestants);
router.get('/contestants/:idOrName', getContestantByIdOrName);
router.put('/contestants/:id', updateContestant);
router.delete('/contestants/:id', deleteContestant);
router.post('/uploadImage',upload.single('image'),authenticateContestantToken,uploadImage);
router.post('/uploadVideo', upload.single('VideoUrl'), authenticateContestantToken, uploadVideo);

export default router;