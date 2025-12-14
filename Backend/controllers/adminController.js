const redisClient = require("../lib/redis")
const User = require("../models/User")

exports.getAllUsers = async (req, res) => {
  const cacheKey = "admin:users"
  const cached = await redisClient.get(cacheKey)
  if (cached) {
    return res.json(JSON.parse(cached))
  }
  const users = await User.findAll({
    attributes: ["id", "name", "email", "role"]
  })
  await redisClient.setEx(cacheKey, 60, JSON.stringify(users))
  res.json(users)
}
