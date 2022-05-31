const bannerModel = require("./models/bannerModel")

//获取首页标语
module.exports.getBanners = async() => {
    //因为就三条数据查找所有的
    let resp = await bannerModel.findAll()
    return JSON.parse(JSON.stringify(resp));
}

//添加首页标语
module.exports.setBanners = async(req) => {
    // return await bannerModel.create(req)
    const resp = await bannerModel.create(req)
    return resp.toJSON()
}