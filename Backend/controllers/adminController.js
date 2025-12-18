const redisClient = require("../lib/redis")
const User = require("../models/User")

exports.getAllUsers = async (req, res) => {
  try {
    const cacheKey = "admin:users"
    const cached = await redisClient.get(cacheKey)
    if (cached) {
      return res.json(JSON.parse(cached))
    }
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"],
      order: [["createdAt", "DESC"]],
    })
    if (Array.isArray(users) && users.length > 0) {
      await redisClient.safeSetEx(cacheKey, 60, users)
    }
    res.json(users)
  } catch (err) {
    console.error("Error fetching users:", err)
    res.status(500).json({ message: "Failed to fetch users" })
  }
}
