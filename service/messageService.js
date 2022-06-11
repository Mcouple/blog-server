const { addMessageDb, deleteMessageDb, pageMessageDb } = require("../db/message")
const { formatResponse } = require("../utils/tools")
const { NotFoundError } = require("../utils/errors");
const { validate } = require("validate.js");
const { ValidationError } = require("../utils/tools");
const fs = require("fs")
const { getSingleBlog } = require("../db/blog")
const path = require("path")

/**
 * 读取一个目录下有多少文件
 * @param {*} dir 目录地址
 */
// const dir = "./public/images/avatar"
const dirPath = "./public/images/avatar"
async function readDirLength(dir) {
    return new Promise(resolve => {
        fs.readdir(dir, (err, files) => {
            // if (err) throw new NotFoundError();
            resolve(files)
        })
    })

}


//添加留言或评论
module.exports.addMessage = async(newMessage) => {
    //数据验证规则
    const messageRule = {
        nickname: {
            presence: {
                allowEmpty: false
            },
            type: "string"
        },
        content: {
            presence: {
                allowEmpty: false
            },
            type: "string"
        },
        blogId: {
            type: "string"
        }
    };
    //进行数据验证
    const validateResult = validate.validate(newMessage, messageRule);
    if (!validateResult) {
        //表示数据验证通过
        newMessage.blogId = newMessage.blogId ? newMessage.blogId : null;
        newMessage.createDate = Date.now() //获取当前事件戳

        //有一个头像需要随机生成
        //读取 public/images/avatar
        const files = await readDirLength(dirPath);

        //随机摇一个文件出来
        const randomIndex = Math.floor(Math.random() * files.length);
        newMessage.avatar = '/static/avatar' + files[randomIndex]

        //下面开始新增
        const data = await addMessageDb(newMessage);
        //如果是文章评论，对应文章的评论数量也要增加
        if (newMessage.blogId) {
            const res = await getSingleBlog(newMessage.blogId)
            res.commentNumber++;
            await res.save()
        }
        return formatResponse(0, "", data)

    } else {
        //数据验证失败
        throw new ValidationError("数据验证失败")
    }
}

//删除留言或评论
module.exports.deleteMessage = async(id) => {
    const data = await deleteMessageDb(id)
    if (data) {
        return formatResponse(0, "", true)
    }
    throw new NotFoundError()
}

//分页获取留言或评论
module.exports.pageMessage = async(query) => {
    let { page, limit, keyword, blogId } = query
    const res = await pageMessageDb(page, limit, keyword, blogId)
    return formatResponse(0, "", res)
}