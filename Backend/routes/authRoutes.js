const express = require("express")
const router = express.Router()
const passport = require("passport")
const { signup, login, refreshToken, googleAuthCallback, verifyEmail, forgotPassword, resetPassword } = require("../controllers/authController")
const upload = require("../middleware/uploadMiddleware")
const { getFrontendUrl } = require("../utils/getFrontendUrl")

// -------------------- AUTH --------------------

router.post("/signup", upload.single("image"), signup)
router.post("/login", login)
router.post("/refresh-token", refreshToken)
router.post("/verify-email", verifyEmail)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)

// -------------------- GOOGLE OAUTH --------------------
router.get( "/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }))
router.get( "/google/callback", passport.authenticate("google", { session: false, failureRedirect: `${getFrontendUrl()}/login` }), googleAuthCallback)


module.exports = router
