const { createClient } = require("redis")

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
})

redisClient.on("error", (err) => console.error("Redis Client Error:", err))
redisClient.on("connect", () => console.log("Redis client connecting..."))
redisClient.on("ready", () => console.log("Redis connected and ready"))

;(async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect()
    }
  } catch (err) {
    console.error("Redis connection failed:", err)
  }
})()

redisClient.safeSetEx = async (key, seconds, value) => {
  if (
    typeof key !== "string" ||
    typeof seconds !== "number" ||
    seconds <= 0 ||
    value === undefined ||
    value === null
  ) {
    console.warn("Redis safeSetEx skipped due to invalid arguments", {
      key,
      seconds,
      valueType: typeof value,
    })
    return
  }
  await redisClient.setEx(
    key,
    seconds,
    JSON.stringify(value)
  )
}

module.exports = redisClient
