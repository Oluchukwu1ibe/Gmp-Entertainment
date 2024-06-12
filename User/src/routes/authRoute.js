import express from "express";
import { UserProfile, deleteUser, forgetPassword, getAllUsers, getUserByIdOrName, login, register, resendOtp, resetPassword, updateUser, verifyOtp } from "../controller/authController.js";
import { authenticateUserToken } from "../middleware/checkAuth.js";

const router = express.Router();


router.post('/register',register);
router.post('/verifyOtp/:user_id',verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/login',login);
router.post('/forget-password',forgetPassword);
router.put('/reset-password',resetPassword);
router.get('/users',getAllUsers);
router.get('/users/:idOrName',getUserByIdOrName)
router.put('/users/edit',authenticateUserToken, updateUser);
router.delete('/users/:id', deleteUser);
router.get('/profile',authenticateUserToken,UserProfile);
export default router;