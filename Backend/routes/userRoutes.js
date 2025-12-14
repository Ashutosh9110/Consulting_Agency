const router = require("express").Router()
const { AdminGetUsers, getProfile, updateProfile } = require("../controllers/userController")
const { auth, authorizeRoles} = require("../middleware/authMiddleware")

router.get("/admin-getUsers", auth, authorizeRoles, AdminGetUsers)

router.get("/me", auth, getProfile)
router.put("/me", auth, updateProfile)

module.exports = router
