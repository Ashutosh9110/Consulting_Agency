const express = require("express")
const sequelize = require("./config/sequelize")

const app = express()

app.use(express.json())

sequelize.sync({ alter: true })
    .then(() => console.log("MySQL connected & models synced"))
    .catch(err => console.error(err))

app.listen(5000, () => console.log("Server running on port 5000"))
