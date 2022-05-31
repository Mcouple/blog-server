//这一层负责和数据库打交道，对数据进行处理，比如查找，添加，删除
const Admin = require("./models/adminModel") //导入数据模型
const md5 = require("md5")

//登录
module.exports.login = async(userInfo) => {
    return await Admin.findOne({
        where: {
            loginId: userInfo.loginId,
            loginPwd: md5(userInfo.loginPwd)
        }
    })
}

//修改信息
module.exports.update = async(userInfo) => {
    console.log(userInfo);
    //userInfo是传递的需要修改的信息,会根据一个Id进行查找
    return await Admin.update(userInfo, {
        where: {
            loginId: userInfo.loginId,
        }
    })
}