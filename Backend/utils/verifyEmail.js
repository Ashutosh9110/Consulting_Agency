const User = require("../models/User")

const verifyEmail = async (token) => {
  if (!token) {
    throw new Error("Verification token missing")
  }
  const user = await User.findOne({
    where: { emailVerificationToken: token },
  })
  if (!user) {
    throw new Error("Invalid or expired token")
  }
  user.isEmailVerified = true
  user.emailVerificationToken = null
  await user.save()
  return true
}

module.exports = { verifyEmail }
