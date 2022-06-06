const { ValidationError } = require("../utils/errors")
const { validate, async } = require("validate.js")
const blogTypeModel = require("../db/models/blogTypeModel")
const { addBlogModel, reBlog, deBlog, pBlog } = require("../db/blog")
const { formatResponse } = require("../utils/tools")
const { addBlogToType } = require("../db/blogType")
const blogModel = require("../db/models/blog")
const { NotFoundError } = require("../utils/errors")
    //传一个要验证的值过来
validate.validators.categoryIdIsExist = async(value) => {
    const blogTypeInfo = blogTypeModel.findByPk(value)
    if (blogTypeInfo) {
        return
    }
    return "CategoryId Is Not Exist"
}

//添加文章
module.exports.addBlog = async(newBlog) => {
    //首先第一个要处理的是 TOC


    //接下来，我们将处理好的TOC格式转换为字符串
    newBlog.toc = JSON.stringify('["a":"b"]')


    //初始化新文章的其它信息
    newBlog.scanNumber = 0; //阅读量初始化为0
    newBlog.commentNumber = 0; //评论数初始化为0


    //定义验证规则
    const blogRule = {
        title: {
            presence: {
                allowEmpty: false
            },
            type: "string"
        },
        description: {
            presence: {
                allowEmpty: true
            },
            type: "string"
        },
        toc: {
            presence: {
                allowEmpty: true
            },
            type: "string"
        },
        htmlContent: {
            presence: {
                allowEmpty: false
            },
            type: "string"
        },
        thumb: {
            presence: {
                allowEmpty: true
            },
            type: "string"
        },
        scanNumber: {
            presence: {
                allowEmpty: true
            }
        },
        commentNumber: {
            presence: {
                allowEmpty: true
            },
            type: "integer"
        },
        //这个相当于是外键，所以规则特殊处理
        categoryId: {
            presence: true,
            type: "integer",
            categoryIdIsExist: true
        }
    }

    //接下来对传递过来的数据进行验证
    try {
        //因为扩展的验证规则里面涉及到异步的操作，所以这里采用异步的验证方式
        await validate.async(newBlog, blogRule)
        const data = await addBlogModel(newBlog); //进行数据的新增
        //文章新增了，对应的文章分类也要新增
        await addBlogToType(newBlog.categoryId)
        return formatResponse(0, "", data)
    } catch (e) {
        //验证未通过
        console.log(e);
        throw new ValidationError("数据验证失败")
    }
}

//获取单篇文章
module.exports.getBlog = async(id) => {
    const { dataValues } = await blogModel.findByPk(id)
    return formatResponse(0, "", dataValues)
}

//修改文章
module.exports.resviseBlog = async(id, newBlog) => {
    const res = await reBlog(id, newBlog)
    return formatResponse(0, "", res)
}

//删除文章
module.exports.deleteBlog = async(id) => {
    const data = await deBlog(id)
    if (data) {
        return formatResponse(0, "", true)
    } else {
        throw new NotFoundError()
    }
}

//分页获取文章
module.exports.pageBlog = async(query) => {
    let { page, limit, keyword, categoryId } = query
    const data = await pBlog(page, limit, keyword, categoryId)
    return formatResponse(0, "", data.rows)
}