const blogTypeModel = require("./models/blogTypeModel")
module.exports.addblogType = async(blogType) => {
    return await blogTypeModel.create(blogType)
}