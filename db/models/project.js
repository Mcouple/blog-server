const sequelize = require("../dbConnect")
const { DataTypes } = require("sequelize")

const Project = sequelize.define("Project", {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
    },
    github: {
        type: DataTypes.STRING
    },
    thumb: {
        type: DataTypes.STRING
    },
    order: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

module.exports = Project