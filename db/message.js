const messageModel = require("./models/message")
const BlogModel = require("./models/blog")
const { Op } = require("sequelize")
const { async } = require("validate.js")

//添加留言或评论
module.exports.addMessageDb = async(message) => {
    return await messageModel.create(message)
}



//分页获取留言或评论
module.exports.pageMessageDb = async(page = 1, limit = 10, keyword = "", blogId = -1) => {
    //根据blogId，来区分情况
    if (blogId != -1) {
        //表示获取文章的评论
        //分为两种情况，
        if (blogId === "all") {
            //1、后台获取全部的文章评论方便管理
            return await messageModel.findAndCountAll({
                offset: (page * 1 - 1) * limit,
                limit: +limit,
                where: {
                    blogId: {
                        [Op.ne]: null
                    }
                },
                order: [
                    ["createDate", "DESC"]
                ],
                include: [{
                    model: BlogModel,
                    as: "blog"
                }]
            })
        } else {
            //2、前台只获取对应blogId的评论，
            return await messageModel.findAndCountAll({
                offset: (page * 1 - 1) * limit,
                limit: +limit,
                where: {
                    blogId
                },
                order: [
                    ["createDate", "DESC"]
                ],
                include: [{
                    model: BlogModel,
                    as: "blog"
                }]
            })
        }


    } else {
        //表示获取博客的留言
        return await messageModel.findAndCountAll({
            offset: (page * 1 - 1) * limit,
            limit: +limit,
            where: {
                blogId: null
            },
            order: [ //排序，根据时间降序
                ["createDate", "DESC"]
            ]
        })
    }

}

//删除留言或评论
module.exports.deleteMessageDb = async(id) => {
    return await messageModel.destroy({
        where: {
            id
        }
    })
}

//删除文章，并且删除相应的评论
module.exports.deleteBlogMessage = async(blogId) => {
    await messageModel.destroy({
        where: {
            blogId
        }
    })
}