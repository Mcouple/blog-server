const sequelize = require("../dbConnect")
const { DataTypes } = require("sequelize")

const BlogType = sequelize.define("BlogType", {
    order: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    articleCount: {
        type: DataTypes.STRING
    },

}, {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
})
module.exports = BlogType