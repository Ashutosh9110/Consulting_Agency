const redisClient = require("../lib/redis")

const cache = (keyPrefix) => {
  return async (req, res, next) => {
    const key = keyPrefix + (req.query.search || "all")

    try {
      const cachedData = await redisClient.get(key)
      if (cachedData) {
        return res.json(JSON.parse(cachedData))
      }
      req.cacheKey = key
      next()
    } catch (err) {
      console.error("Redis error:", err)
      next()
    }
  }
}

module.exports = cache
