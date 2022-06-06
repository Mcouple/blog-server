const blogTypeModel = require("./models/blogTypeModel")

//添加一个文章
module.exports.addblogType = async(blogType) => {
    let result = await blogTypeModel.create(blogType)
    result = JSON.parse(JSON.stringify(result))
    const res = await blogTypeModel.findByPk(result.id)
    return JSON.parse(JSON.stringify(res));
}

//查找全部文章分类
module.exports.getTypes = async() => {
    return await blogTypeModel.findAll()
}

//删除一个文章分类
module.exports.delBlogTypes = async(id) => {
    let res = await blogTypeModel.findByPk(id);
    res = JSON.parse(JSON.stringify(res)).articleCount
    const result = await blogTypeModel.destroy({
        where: {
            id
        }
    })
    return res
}

//获取一个文章分类
module.exports.getblog = async(id) => {
    return await blogTypeModel.findByPk(id)
}

//修改一个文章分类
module.exports.resviseBLog = async(info, id) => {
    await blogTypeModel.update(info, {
        where: {
            id
        }
    })
    return await blogTypeModel.findByPk(id)

}

//根据文章分类ID新增文章分类的文章数量
module.exports.addBlogToType = async(id) => {
    const res = await blogTypeModel.findByPk(id)
    res.articleCount++;
    await res.save();
    return
}