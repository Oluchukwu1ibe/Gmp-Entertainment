import express from "express";
import { forgetPassword, login, register, resetPassword } from "../controller/authController.js";
const router = express.Router();


router.post('/register',register);
router.post('/login',login);
router.post('/forget-password',forgetPassword);
router.put('/reset-password',resetPassword);

export default router;