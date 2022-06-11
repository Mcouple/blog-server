const settingModel = require("./models/setting");


//获取全局设置
module.exports.getSettingDb = async() => {
    return await settingModel.findOne()
}

//修改全局设置
module.exports.reviseSettingDb = async(newInfo) => {
    console.log(newInfo);
    await settingModel.update(newInfo, {
        where: {
            id: 1
        }
    })
    return await settingModel.findOne()
}