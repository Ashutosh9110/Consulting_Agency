const bcrypt = require("bcrypt")
const User = require("../models/User")

const resetPassword = async (token, newPassword) => {
  if (!token || !newPassword) {
    throw new Error("Token and password are required")
  }
  const user = await User.findOne({
    where: { passwordResetToken: token },
  })
  if (!user || user.passwordResetExpires < Date.now()) {
    throw new Error("Invalid or expired token")
  }
  const isSamePassword = await bcrypt.compare(newPassword, user.password)
  if (isSamePassword) {
    throw new Error("New password cannot be same as the old password")
  }
  user.password = await bcrypt.hash(newPassword, 10)
  user.passwordResetToken = null
  user.passwordResetExpires = null
  await user.save()

  return true
}

module.exports = { resetPassword }
