const express = require("express")
const router = express.Router()
const passport = require("passport")
const { signup, login, refreshToken, googleAuthCallback, verifyEmail, forgotPassword, resetPassword } = require("../controllers/authController")
const { validateSignup, validateLogin } = require("../middleware/validate")
const { upload } = require("../middleware/uploadMiddleware")


router.post("/signup", upload.single("image"), validateSignup, signup)
router.post("/login", validateLogin, login)
router.post("/refresh-token", refreshToken)
router.post("/verify-email", verifyEmail)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)


router.get( "/google", passport.authenticate("google", { scope: ["profile", "email"] }))
router.get( "/google/callback", passport.authenticate("google", { session: false }), googleAuthCallback)


module.exports = router
