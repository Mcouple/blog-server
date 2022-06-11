const sequelize = require("../dbConnect")
const { DataTypes } = require("sequelize")

const Message = sequelize.define("Message", {
    nickname: {
        type: DataTypes.STRING,
    },
    content: {
        type: DataTypes.STRING,
    },
    createDate: {
        type: DataTypes.STRING
    },
    avatar: {
        type: DataTypes.STRING
    },
}, {
    createdAt: false,
    freezeTableName: true,
    updatedAt: false
})

module.exports = Message