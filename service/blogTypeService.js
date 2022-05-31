const { addblogType } = require("../db/blogType")

//获取全部文章分类
module.exports.getBlogTypes = () => {

}

//添加文章分类
module.exports.addBlogType = async(blogType) => {
    const result = await addblogType(blogType)
    console.log(result);
}

//获取一个文章分类
module.exports.getBlogType = (id) => {

}

//修改一个文章分类
module.exports.reviseBlogType = (id) => {

}

//删除一个文章分类
module.exports.deleteBlogType = (id) => {

}