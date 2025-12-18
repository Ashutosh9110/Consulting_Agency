const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const crypto = require("crypto")
const { verifyEmail } = require("../utils/verifyEmail")
const { resetPassword } = require("../utils/resetPassword")
const { forgotPassword } = require("../utils/forgotPassword")
const { sendVerifyEmail } = require("../utils/sendVerifyEmail")
const { signupSchema, loginSchema } = require("../validators/validation.schema")




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
    const { error, value } = signupSchema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    })

    if (error) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.details.map(d => d.message),
      })
    }
    const { name, email, password, role } = value
    const exists = await User.findOne({ where: { email } })
    if (exists) {
      return res.status(400).json({ message: "Email already exists" })
    }

    const hashed = await bcrypt.hash(password, 10)
    const token = crypto.randomBytes(32).toString("hex")

    const profileImage = req.file
    ? `/uploads/${req.file.filename}`
    : null
    // console.log("Resolved profileImage:", profileImage)
    await User.create({
      name,
      email,
      password: hashed,
      role: role === "admin" ? "admin" : "user",
      profileImage,
      emailVerificationToken: token,
    })

    await sendVerifyEmail({ email, token })

    res.status(201).json({
      message: "Registration successful. Please verify your email.",
    })
  } catch (err) {
    console.error("signup error:", err)
    res.status(500).json({ message: err.message })
  }
}


exports.login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    })

    if (error) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.details.map(d => d.message),
      })
    }

    const { email, password } = value

    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      })
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
      })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({
        message: "Invalid email or password",
      })
    }
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    return res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    })
  } catch (err) {
    console.error("login error:", err)
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

    res.status(200).json({
      message: "Email verified successfully. You can now login.",
    })  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}



exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    await forgotPassword(email)

    res.json({ message: "Reset link sent to your email" })
  } catch (err) {
    res.status(err.message === "User not found" ? 404 : 400).json({
      message: err.message,
    })
  }
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
