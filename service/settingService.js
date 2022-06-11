const { getSettingDb, reviseSettingDb } = require("../db/setting")
const { formatResponse } = require("../utils/tools")

//获取全局设置
module.exports.getSetting = async() => {
    const res = await getSettingDb()
    return formatResponse(0, "", res)
}

//修改全局设置
module.exports.reviseSetting = async(newInfo) => {
    return await reviseSettingDb(newInfo)
}