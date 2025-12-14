const express = require("express")
const router = express.Router()
const { auth, authorizeRoles } = require("../middleware/authMiddleware")
const { deleteUser, getAllUsers } = require("../controllers/adminController")

router.use(auth)
router.use(authorizeRoles("admin"))

router.get("/users", getAllUsers)
// router.delete("/users/:id", deleteUser)

module.exports = router
