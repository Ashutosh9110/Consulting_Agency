// utils/sendVerifyEmail.js
const crypto = require("crypto")
const { sendMail } = require("./sendMail")
const { verifyEmailTemplate } = require("./emailTemplates")
const { getFrontendUrl } = require("./getFrontendUrl")

const sendVerifyEmail = async ({ email, token }) => {
  if (!email || !token) {
    throw new Error("Email and token are required for verification email")
  }

  const frontendUrl = getFrontendUrl()
  const verifyLink = `${frontendUrl}/verify-email?token=${token}`

  await sendMail({
    to: email,
    subject: "Verify your email - ABC Consultancy",
    htmlContent: verifyEmailTemplate(verifyLink),
  })
}

module.exports = { sendVerifyEmail }
