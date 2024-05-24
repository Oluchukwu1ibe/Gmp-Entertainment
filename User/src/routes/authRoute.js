import express from "express";
import { deleteUser, forgetPassword, getAllUsers, getUserByIdOrName, login, register, resendOtp, resetPassword, updateUser, verifyOtp } from "../controller/authController.js";

const router = express.Router();


router.post('/register',register);
router.post('/verifyOtp/:user_id',verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/login',login);
router.post('/forget-password',forgetPassword);
router.put('/reset-password',resetPassword);
router.get('/users',getAllUsers);
router.get('/users/:idOrName',getUserByIdOrName)
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
export default router;