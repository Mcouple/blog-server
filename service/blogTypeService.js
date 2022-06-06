const { async } = require("validate.js");
const { addblogType, getTypes, delBlogTypes, getblog, resviseBLog } = require("../db/blogType")
const { formatResponse } = require("../utils/tools")


//添加文章分类
module.exports.addBlogType = async(blogType) => {
    //因为是新增分类，所以文章数量初始化为0
    blogType.articleCount = 0;
    let result = await addblogType(blogType)
    return formatResponse(0, "", result)
}



//获取全部文章分类
module.exports.getBlogTypes = async() => {
    let result = await getTypes()
    result = JSON.parse(JSON.stringify(result));
    //根据order进行排序
    result.sort((a, b) => {
        return a.order - b.order
    })
    console.log(result);
    return formatResponse(0, "", result)
}



//获取一个文章分类
module.exports.getBlogType = async(id) => {
    let res = await getblog(id)
    res = JSON.parse(JSON.stringify(res))
    return formatResponse(0, "", res)
}

//修改一个文章分类
module.exports.reviseBlogType = async(info, id) => {
    let res = await resviseBLog(info, id)
    res = JSON.parse(JSON.stringify(res))
    return formatResponse(0, "", res)
}

//删除一个文章分类
module.exports.deleteBlogType = async(id) => {
    const res = await delBlogTypes(id)
    return formatResponse(0, "", res)
}