const express = require("express");
const router = express.Router();
const passport = require("passport");
const { signup, login, refreshToken, googleAuthCallback } = require("../controllers/authController");
const { validateSignup, validateLogin } = require("../middleware/validate");
const { auth, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);
router.post("/refresh-token", refreshToken);
router.get("/admin-only", auth, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "Admin Access Granted" });
});
router.get( "/google", passport.authenticate("google", { scope: ["profile", "email"] }))
router.get( "/google/callback", passport.authenticate("google", { session: false }), googleAuthCallback)



module.exports = router;
