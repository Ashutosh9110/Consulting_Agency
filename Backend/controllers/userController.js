const { Op } = require("sequelize")
const User = require("../models/User")


exports.AdminGetUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search || ""
    const offset = (page - 1) * limit

    const { rows, count } = await User.findAndCountAll({
      where: search
        ? {
            [Op.or]: [
              { email: { [Op.like]: `%${search}%` } },
              { name: { [Op.like]: `%${search}%` } },
            ],
          }
        : {},
      attributes: ["id", "name", "email", "role"],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    })
    res.json({
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    })
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" })
  }
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
