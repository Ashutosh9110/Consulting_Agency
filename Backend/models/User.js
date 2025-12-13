const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING },
    role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user"
    },
    googleId: { type: DataTypes.STRING, allowNull: true }
});

module.exports = User;
