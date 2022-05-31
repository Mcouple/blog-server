const sequelize = require("../dbConnect")
const { DataTypes } = require("sequelize")

const Banner = sequelize.define("Banner", {
    midImg: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bigImg: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    }
}, {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
})
module.exports = Banner