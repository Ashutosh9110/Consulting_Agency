const { Op } = require("sequelize")
const User = require("../models/User")


exports.AdminGetUsers = async (req, res) => {
  const { search } = req.query
  const users = await User.findAll({
    where: search
      ? { email: { [Op.like]: `%${search}%` } }
      : {},
    attributes: ["id", "name", "email", "role"],
  })

  res.json(users)
}

exports.getProfile = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ["id", "name", "email", "role"],
  })
  res.json(user)
}

exports.updateProfile = async (req, res) => {
  const { name, email } = req.body

  await User.update(
    { name, email },
    { where: { id: req.user.id } }
  )

  res.json({ message: "Profile updated successfully" })
}
