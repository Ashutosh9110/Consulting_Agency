const router = require("express").Router()
const { AdminGetUsers, getProfile, updateProfile } = require("../controllers/userController")
const { auth, authorizeRoles} = require("../middleware/authMiddleware")
const cache = require("../middleware/cacheMiddleware")
const redisClient = require("../lib/redis");
const multer = require("multer")
const upload = multer({ dest: "uploads/" }) 


router.get(
  "/admin-getUsers",
  auth,
  authorizeRoles("admin"),
  AdminGetUsers
)


router.get("/me", auth, getProfile)
router.put("/me", auth, upload.single("profileImage"), updateProfile)

module.exports = router
