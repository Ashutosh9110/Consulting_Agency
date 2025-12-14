const redisClient = require("../lib/redis")

const cache = (prefix) => {
  return async (req, res, next) => {
    const key = prefix + (req.query.search || "all")

    try {
      const cached = await redisClient.get(key)
      if (cached) {
        return res.json(JSON.parse(cached))
      }
      req.cacheKey = key
      next()
    } catch (err) {
      console.error("Cache error:", err)
      next()
    }
  }
}

module.exports = cache
