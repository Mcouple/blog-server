const { DataTypes } = require("sequelize")
const sequelize = require("../dbConnect")
const Admin = sequelize.define("Admin", {
    loginId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loginPwd: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})
module.exports = Admin