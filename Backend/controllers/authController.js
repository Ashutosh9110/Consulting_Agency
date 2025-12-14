const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")




const generateAccessToken = (user) => {
    // console.log("JWT_SECRET:", process.env.JWT_SECRET)
    // console.log("JWT_REFRESH_SECRET:", process.env.JWT_REFRESH_SECRET)

    return jwt.sign(
        { id: user.id, role: user.role, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    )
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    )
}

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        console.log("req body:", req.body)
        const exists = await User.findOne({ where: { email } })
        if (exists) return res.status(400).json({ message: "Email already exists" })
        const hashed = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashed,
            role: "user"
        })
        return res.status(201).json({ message: "User created", user })
    } catch (err) {
        console.error("signup error:", err)
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

exports.refreshToken = (req, res) => {
    const { token } = req.body
    if (!token) return res.status(400).json({ message: "Refresh token required" })
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)

        const accessToken = jwt.sign(
            { id: decoded.id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        )
        return res.json({ accessToken })
    } catch (err) {
        return res.status(403).json({ message: "Invalid refresh token" })
    }
}

exports.googleAuthCallback = async (req, res) => {
    try {
        const googleProfile = req.user 
        let user = await User.findOne({ where: { googleId: googleProfile.id } })
        if (!user) {
            user = await User.create({
                name: googleProfile.displayName,
                email: googleProfile.emails[0].value,
                googleId: googleProfile.id,
                role: "user"
            })
        }
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)
        return res.json({ accessToken, refreshToken, user })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
