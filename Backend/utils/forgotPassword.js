const crypto = require("crypto")
const User = require("../models/User")
const { sendMail } = require("./sendMail")
const { getFrontendUrl } = require("./getFrontendUrl")

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
  user.passwordResetExpires = Date.now() + 60 * 60 * 1000 // 1 hour
  await user.save()

  const frontendUrl = getFrontendUrl()
  const resetLink = `${frontendUrl}/reset-password?token=${token}`

  await sendMail({
    to: email,
    subject: "Reset your password – ABC Consultancy",
    htmlContent: `
      <p>Hello ${user.name},</p>
      <p>Click the link below to reset your password. This link is valid for 1 hour.</p>
      <a href="${resetLink}"
         style="background:#2563eb;color:white;padding:10px 20px;border-radius:5px;text-decoration:none">
         Reset Password
      </a>
    `,
  })

  return true
}

module.exports = { forgotPassword }
