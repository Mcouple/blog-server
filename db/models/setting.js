const sequelize = require("../dbConnect")
const { DataTypes } = require("sequelize")
const Setting = sequelize.define("Setting", {
    avatar: {
        type: DataTypes.STRING
    },
    siteTitle: {
        type: DataTypes.STRING
    },
    github: {
        type: DataTypes.STRING
    },
    qq: {
        type: DataTypes.STRING
    },
    qqQrCode: {
        type: DataTypes.STRING
    },
    weixin: {
        type: DataTypes.STRING
    },
    weixinQrCode: {
        type: DataTypes.STRING
    },
    mail: {
        type: DataTypes.STRING
    },
    icp: {
        type: DataTypes.STRING
    },
    githubName: {
        type: DataTypes.STRING
    },
    favicon: {
        type: DataTypes.STRING
    },
}, {
    createdAt: false,
    freezeTableName: true,
    updatedAt: false
})
module.exports = Setting