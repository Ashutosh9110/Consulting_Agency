const express = require("express");
const router = express.Router();
const { signup, login, refreshToken } = require("../controllers/authController");
const { validateSignup, validateLogin } = require("../middleware/validate");
const { auth, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);
router.post("/refresh-token", refreshToken);
router.get("/admin-only", auth, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "Admin Access Granted" });
});




module.exports = router;
