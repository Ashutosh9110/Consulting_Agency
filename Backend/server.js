require("dotenv").config()
const express = require("express")
const sequelize = require("./config/sequelize")
const authRoutes = require("./routes/authRoutes")
const adminRoutes = require("./routes/adminRoutes")


const app = express()

app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/uploads", express.static("uploads"));



sequelize.sync({ alter: true })
    .then(() => console.log("MySQL connected & models synced"))
    .catch(err => console.error(err))

app.listen(5000, () => console.log("Server running on port 5000"))
