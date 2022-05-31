const { getBanners, setBanners } = require("../db/banner")
const { formatResponse } = require("../utils/tools")
    //获取首页标语
module.exports.getBanner = async() => {
    return formatResponse(0, "", await getBanners())
}

//添加首页标语
module.exports.setBanner = async(req) => {
    return await setBanners(req);
}