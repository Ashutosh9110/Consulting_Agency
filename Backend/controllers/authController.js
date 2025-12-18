const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const crypto = require("crypto")
const { sendMail } = require("../utils/sendMail")
const { verifyEmailTemplate } = require("../utils/emailTemplates")
const { verifyEmail } = require("../utils/verifyEmail")
const { resetPassword } = require("../utils/resetPassword")
const { getFrontendUrl } = require("../utils/getFrontendUrl")

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
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  })
}

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    // console.log("req body:", req.body)
    const exists = await User.findOne({ where: { email } })
    console.log("Signup email exists check:", exists?.email, exists?.id)
    if (exists) {
      return res.status(400).json({ message: "Email already exists" })
    }
    const hashed = await bcrypt.hash(password, 10)
    const token = crypto.randomBytes(32).toString("hex")
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role === "admin" ? "admin" : "user",
      profileImage: req.file ? `/uploads/${req.file.filename}` : null,
      emailVerificationToken: token
    })

    const verifyLink = `https://consultancy-agency.netlify.app/verify-email?token=${token}`

    await sendMail({
        to: email,
        subject: "Verify your email - ABC Consultancy",
        htmlContent: verifyEmailTemplate(verifyLink)
      })

    res.status(201).json({
      message: "Registration successful. Please verify your email."
    })
  } catch (err) {
    console.error("signup error:", err)
    return res.status(500).json({ message: err.message })
  }
}


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    if (!user.isEmailVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
      })
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return res.status(400).json({ message: "Wrong password" })
    }
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    return res.json({ accessToken, refreshToken, user })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

exports.refreshToken = (req, res) => {
  const { token } = req.body
  if (!token)
    return res.status(400).json({ message: "Refresh token required" })
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)

    const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    })
    return res.json({ accessToken })
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" })
  }
}

exports.googleAuthCallback = async (req, res) => {
  try {
    console.log("Google user profile:", req.user)
    const googleProfile = req.user
    let user = await User.findOne({ where: { email: googleProfile.emails[0].value } })
    console.log("Found user in DB:", user)
    if (!user) {
      user = await User.create({
        name: googleProfile.displayName,
        email: googleProfile.emails[0].value,
        googleId: googleProfile.id,
        role: "user",
        isEmailVerified: true,
        profileImage: googleProfile.photos?.[0]?.value || null,
      })
      console.log("Created new user:", user)
    }
    const accessToken = generateAccessToken(user)
    console.log("Generated access token:", accessToken);
    const refreshToken = generateRefreshToken(user)

    const redirectUrl = `${process.env.FRONTEND_URL}/oauth-success?token=${accessToken}`;
    console.log("Redirecting to frontend:", redirectUrl);
    res.redirect(redirectUrl);

  } catch (err) {
    console.error(err)
    console.error("OAuth callback error:", err)
    res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`)
  }
}

exports.verifyEmail = async (req, res) => {
  try {
    const token = req.body.token || req.query.token
    await verifyEmail(token)

    res.json({ message: "Email verified successfully" })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}





exports.forgotPassword = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ where: { email } })

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }
  const token = crypto.randomBytes(32).toString("hex")
  user.passwordResetToken = token
  user.passwordResetExpires = Date.now() + 3600 * 1000 // 1 hour
  await user.save()

  const resetLink = `https://consultancy-agency.netlify.app/reset-password?token=${token}`
  await sendMail({
    to: email,
    subject: "Reset your password – ABC Consultancy Consulting",
    htmlContent: `
      <p>Hello ${user.name},</p>
      <p>Click the link below to reset your password. This link is valid for 1 hour.</p>
      <a href="${resetLink}" style="background:#2563ebcolor:whitepadding:10px 20pxborder-radius:5pxtext-decoration:none">Reset Password</a>
    `,
  })

  res.json({ message: "Reset link sent to your email" })
}

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body
    await resetPassword(token, password)

    res.json({ message: "Password reset successfully" })
  } catch (err) {
    console.error("resetPassword error:", err)
    res.status(400).json({ message: err.message })
  }
}




exports.getUsers = async (req, res) => {
  const { search } = req.query
  const users = await User.findAll({
    where: search
      ? { email: { [Op.like]: `%${search}%` } }
      : {},
    attributes: ["id", "name", "email", "role"],
  })

  res.json(users)
}
