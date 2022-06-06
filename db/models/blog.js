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
    createDate: {
        type: DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})
module.exports = Blog