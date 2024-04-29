import express from "express";
import { login, register, logout, resetPassword, forgotPassword } from "../controllers/auth"
const router = express.Router();

import { authLimiter } from "../../security/middlewares/rateLimiter";
import { captcha } from "../controllers/captcha";
import { isAuth } from "../../security/middlewares/authentication";


router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/logout", isAuth, authLimiter, logout);

router.post("/reset-password/:resetToken", authLimiter, resetPassword);
router.post("/forgot-password", authLimiter, forgotPassword);

router.get("/captcha", captcha);


export default router;