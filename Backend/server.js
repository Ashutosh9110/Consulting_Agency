  require("dotenv").config()
  const express = require("express")
  const cors = require("cors")
  const sequelize = require("./config/sequelize")
  const authRoutes = require("./routes/authRoutes")
  const adminRoutes = require("./routes/adminRoutes")
  const userRoutes = require("./routes/userRoutes")
  const { errors } = require("celebrate");
  const PORT = process.env.PORT || 5000
  const passport = require("./config/passport")

  const app = express()

  const allowedOrigins = [
    "http://localhost:5173",
    "https://consultancy-agency.netlify.app",
  ];
  
  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    optionsSuccessStatus: 200,
  };
  
  app.use(cors(corsOptions));
  app.use(express.json())

  app.use(passport.initialize())
  app.use("/uploads", express.static("uploads"));
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes)
  app.use("/api/admin", adminRoutes);
  app.use(errors())


  async function startServer() {
    try {
      await sequelize.authenticate()
      console.log("Railway MySQL connected")
      await sequelize.sync()
      sequelize.query("SELECT DATABASE()").then(([res]) => {
      })
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
      })
    } catch (error) {
      console.error("Failed to start server:", error)
      process.exit(1)
    }
  }

  startServer()

