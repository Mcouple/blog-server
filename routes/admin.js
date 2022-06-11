const express = require("express")
const router = express.Router()
const { adminLogin, adminUpdate } = require("../service/adminService")
const { formatResponse, parseToken } = require("../utils/tools")
const { ValidationError } = require("../utils/errors")

//登录
router.post("/login", async(req, res, next) => {
    //对验证码进行验证
    if (req.body.captcha.toLowerCase() !== req.session.captcha.toLowerCase()) {
        //验证码错误
        throw new ValidationError("验证码错误")
    }

    //如果上面验证码通过，进行下面的验证 
    const result = await adminLogin(req.body)
    res.setHeader("authorization", result.token)
    res.send(formatResponse(0, "登录成功", result.data))
})


//恢复登录
router.get("/whoami", (req, res, next) => {
    //1、从客户端请求中 拿到token，让后解析token还原成有用的信息
    const token = parseToken(req.get("Authorization"))
    res.send(formatResponse(0, "恢复登录", {
        loginId: token.loginId,
        name: token.name,
        id: token.id
    }))

})


//修改用户信息
router.put("/", async(req, res, next) => {
    res.send(await adminUpdate(req.body))
})


module.exports = router