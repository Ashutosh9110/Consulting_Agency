const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] }
  });
  res.json(users);
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  if (req.user.id == id) {
    return res.status(400).json({ message: "Admin cannot delete self" });
  }

  await User.destroy({ where: { id } });
  res.json({ message: "User deleted successfully" });
};
