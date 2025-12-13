const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")





exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        const exists = await User.findOne({ where: { email } })
        if (exists) return res.status(400).json({ message: "Email already exists" })

        const hashed = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashed,
            role
        })

        return res.status(201).json({ message: "User created", user })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ where: { email } })
        if (!user) return res.status(404).json({ message: "User not found" })

        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(400).json({ message: "Wrong password" })

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        return res.json({ accessToken, refreshToken, user })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
