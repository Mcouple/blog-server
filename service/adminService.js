const { login, update } = require("../db/admin")
const jwt = require("jsonwebtoken")
const { ValidationError } = require("../utils/errors")
const md5 = require("md5")
const { formatResponse } = require("../utils/tools")
    //admin 登录 模块的业务逻辑层 
module.exports.adminLogin = async(userInfo) => {
        //用户信息传递到数据库，数据库验证，查询用户传递的信息，数据库有没有
        const result = await login(userInfo)
        let data = {
                id: result.dataValues.id,
                loginId: result.dataValues.loginId,
                name: result.dataValues.name
            }
            //如果数据库内有用户信息
        if (result && result.dataValues) {

            //定义loginPeriod 接收有无七天登录
            let = loginPeriod = null;
            //判断有无七天免登录
            if (userInfo.remember) {
                loginPeriod = parseInt(userInfo.remember)
            } else {
                loginPeriod = 1;
            }

            //jsonwebtoken 的实例方法 sign()用于生成token
            //添加token 接收的参数：  用户信息  密钥   过期时间expiresIn
            let token = jwt.sign({
                id: data.id,
                loginId: data.loginId,
                name: data.name
            }, md5(process.env.JWT_SECRET), { expiresIn: 60 * 60 * 24 * loginPeriod })
            return { token, data }
        }
        //账号信息不对
        return {
            data
        }
    }
    //修改用户
module.exports.adminUpdate = async(userInfo) => {
    //用户名密码正确 根据传入的账号信息查询对应的用户（使用旧密码）
    const result = await login({
        loginId: userInfo.loginId,
        loginPwd: userInfo.oldLoginPwd
    })

    //新旧密码相同
    if (result && result.dataValues.loginPwd === md5(userInfo.loginPwd)) {
        throw new ValidationError("新密码与旧密码重复！！！")
    }

    if (result && result.dataValues) {
        //说明密码正确
        //如果可以从数据库中查询到这个人，就去修改他的信息
        //data是受影响的行数
        const data = await update({
            name: userInfo.name,
            loginId: userInfo.loginId,
            loginPwd: md5(userInfo.loginPwd)
        })

        return formatResponse(0, "", {
            loginId: result.dataValues.loginId,
            name: userInfo.name,
            id: result.dataValues.id
        })

    } else {
        //用户名或密码不正确
        //这里需要安装一个包，express-async-errors,可以获取异步的错误
        // 这里不需要return出去，直接throw错误，会进入错误中间件，到那里统一处理
        throw new ValidationError("旧密码不正确")
    }
}