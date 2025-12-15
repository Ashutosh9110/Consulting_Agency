  require("dotenv").config()
  const express = require("express")
  const cors = require("cors")
  const sequelize = require("./config/sequelize")
  const authRoutes = require("./routes/authRoutes")
  const adminRoutes = require("./routes/adminRoutes")
  const userRoutes = require("./routes/userRoutes")
  const { errors } = require("celebrate");
  const PORT = process.env.PORT || 5000


  const app = express()

  app.use(
      cors({
        origin: [
        "http://localhost:5173",
        "https://consultancy-agency.netlify.app",
        ],
        credentials: true,
      }))

  app.use(express.json())

  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes)
  app.use("/api/admin", adminRoutes);
  app.use("/uploads", express.static("uploads"));
  app.use(errors())


  async function startServer() {
    try {
      console.log("DB_HOST:", process.env.DB_HOST)
      await sequelize.authenticate()
      console.log("Railway MySQL connected")
      await sequelize.sync()
      console.log("Models synced")
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
      })
    } catch (error) {
      console.error("Failed to start server:", error)
      process.exit(1)
    }
  }

  startServer()

