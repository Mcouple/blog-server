const sequelize = require("../dbConnect")
const { DataTypes } = require("sequelize")

const About = sequelize.define("About", {
    url: {
        type: DataTypes.STRING
    }
}, {
    createdAt: false,
    freezeTableName: true,
    updatedAt: false
})
module.exports = About