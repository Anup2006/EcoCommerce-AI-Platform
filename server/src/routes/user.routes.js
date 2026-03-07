import {Router} from "express";
import { googleLogin,googleSignUp,forgetPassword, loginUser, logOutUser, registerUser, verifyEmailOtp, resendOtp } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/verify-otp").post(verifyEmailOtp)
router.route("/resend-otp").post(resendOtp)
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJwt,logOutUser) 
router.route("/reset-password").post(forgetPassword) 
router.route("/googleLogin").post(googleLogin)
router.route("/googleSignup").post(googleSignUp)

export default router