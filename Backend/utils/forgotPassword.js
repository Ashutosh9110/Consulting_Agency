const crypto = require("crypto")
const User = require("../models/User")
const { sendMail } = require("./sendMail")
const { getFrontendUrl } = require("./getFrontendUrl")
const { resetPasswordTemplate } = require("./resetPasswordTemplate")

const forgotPassword = async (email) => {
  if (!email) {
    throw new Error("Email is required")
  }

  const user = await User.findOne({ where: { email } })
  if (!user) {
    throw new Error("User not found")
  }
  const token = crypto.randomBytes(32).toString("hex")
  user.passwordResetToken = token
  user.passwordResetExpires = Date.now() + 60 * 60 * 1000
  await user.save()
  const frontendUrl = getFrontendUrl()
  const resetLink = `${frontendUrl}/reset-password?token=${token}`

  await sendMail({
    to: email,
    subject: "Reset your password – ABC Consultancy",
    htmlContent: resetPasswordTemplate(resetLink, user.name),
  })
  return true
}

module.exports = { forgotPassword }
