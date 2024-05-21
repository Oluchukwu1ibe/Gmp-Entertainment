import express from "express";
import { forgetPassword, login, register, resetPassword, verifyOtp } from "../controller/authController.js";
const router = express.Router();


router.post('/register',register);
router.post('/verifyOtp/:user_id',verifyOtp);
router.post('/login',login);
router.post('/forget-password',forgetPassword);
router.put('/reset-password',resetPassword);

export default router;