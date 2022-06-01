const sequelize = require("../dbConnect")
const { DataTypes } = require("sequelize")

const Blog = sequelize.define("Blog", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    createDate: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING
    },
    toc: {
        type: DataTypes.TEXT
    },
    htmlContent: {
        type: DataTypes.TEXT
    },
    thumb: {
        type: DataTypes.STRING
    },
    scanNumber: {
        type: DataTypes.INTEGER
    },
    commentNumber: {
        type: DataTypes.INTEGER
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})
module.exports = Blog