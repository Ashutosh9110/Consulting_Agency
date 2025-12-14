const router = require("express").Router()
const { AdminGetUsers, getProfile, updateProfile } = require("../controllers/userController")
const { auth, authorizeRoles} = require("../middleware/authMiddleware")
const cache = require("../middleware/cacheMiddleware")
const redisClient = require("../lib/redis");

router.get(
  "/admin-getUsers",
  auth,
  authorizeRoles("admin"),
  cache("users:"),
  async (req, res) => {
    const users = await AdminGetUsers(req, res)
    if (req.cacheKey) {
      await redisClient.setEx(req.cacheKey, 60, JSON.stringify(users))
    }
    return res.json(users)
  }
)

router.get("/me", auth, getProfile)
router.put("/me", auth, updateProfile)

module.exports = router
