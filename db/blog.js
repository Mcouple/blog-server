const blogModel = require("./models/blog")
const blogTypeModel = require("./models/blogTypeModel")

//添加文章
module.exports.addBlogModel = async(newBlog) => {
    const { dataValues } = await blogModel.create(newBlog)
    return dataValues
}

//修改文章
module.exports.upBlog = async(id, newBlog) => {
    await blogModel.update(newBlog, {
        where: {
            id
        }
    })
    const { dataValues } = await blogModel.findByPk(id)
    return dataValues
}

//删除文章
module.exports.deBlog = async(id) => {


    const data = await blogModel.destroy({
        where: {
            id
        }
    })
    return data

}

//分页获取文章
module.exports.pBlog = async(page = 1, limit = 10, keyword = "", categoryId = -1) => {
    if (categoryId && categoryId != -1) {
        console.log("相关分类");
        //表示根据分类查询文章
        return await blogModel.findAndCountAll({
            include: [{
                model: blogTypeModel,
                as: "category",
                where: {
                    id: categoryId
                },
                attributes: ['id', 'name']
            }],
            offset: (page * 1 - 1) * limit,
            limit: +limit
        })
    } else {
        console.log("全部文章");
        //没有categoryId，表示查询全部文章
        return await blogModel.findAndCountAll({
            include: [{
                model: blogTypeModel,
                as: 'category',
                attributes: ['id', 'name']
            }],
            offset: (page * 1 - 1) * limit,
            limit: +limit
        })
    }
}

//获取单篇文章
module.exports.getSingleBlog = async(id) => {
    return await blogModel.findByPk(id, {
        include: [{
            model: blogTypeModel,
            as: 'category',
            attributes: ['id', 'name']
        }]
    })
}