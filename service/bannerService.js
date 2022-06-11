const { getBanners, setBanners } = require("../db/banner")
const { formatResponse } = require("../utils/tools")
    //获取首页标语
module.exports.getBanner = async() => {
    return formatResponse(0, "", await getBanners())
}

//添加首页标语
module.exports.setBanner = async(req) => {
    const res = await setBanners(req);
    return formatResponse(0, "", res)
}