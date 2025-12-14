const router = require("express").Router()
const { AdminGetUsers, getProfile, updateProfile } = require("../controllers/userController")
const { auth, authorizeRoles} = require("../middleware/authMiddleware")

router.get(
  "/admin-getUsers",
  authMiddleware,
  authorizeRoles("admin"),
  cache("users:"),
  async (req, res) => {
    const users = await getUsers(req, res)
    if (req.cacheKey) {
      await redisClient.setEx(req.cacheKey, 60, JSON.stringify(users))
    }
    return res.json(users)
  }
)

router.get("/me", auth, getProfile)
router.put("/me", auth, updateProfile)

module.exports = router
