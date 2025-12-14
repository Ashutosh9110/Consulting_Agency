require("dotenv").config()
const express = require("express")
const cors = require("cors")
const sequelize = require("./config/sequelize")
const authRoutes = require("./routes/authRoutes")
const adminRoutes = require("./routes/adminRoutes")
const userRoutes = require("./routes/userRoutes")
const { errors } = require("celebrate");


const app = express()

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }))

app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes)
app.use("/api/admin", adminRoutes);
app.use("/uploads", express.static("uploads"));
app.use(errors())


sequelize.sync({ alter: true })
    .then(() => console.log("MySQL connected & models synced"))
    .catch(err => console.error(err))

app.listen(5000, () => console.log("Server running on port 5000"))
