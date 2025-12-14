const redis = require("redis")

const REDIS_PORT = process.env.REDIS_PORT || 6379
const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1"

const client = redis.createClient({
  socket: {
    port: REDIS_PORT,
    host: REDIS_HOST,
  },
})

client.on("error", (err) => console.error("Redis Client Error", err))
client.connect()
  .then(() => console.log("Redis connected"))
  .catch((err) => console.error("Redis connection failed:", err))

module.exports = client
