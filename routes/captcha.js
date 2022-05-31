const express = require("express")
const router = express.Router()
const { captchaService } = require("../service/captcahService")
router.get("/", (req, res, next) => {

    // 进入captchaService的逻辑
    const captcha = captchaService()

    //把验证码保存在session里面  放在请求头里
    req.session.captcha = captcha.text

    //设置响应头
    res.setHeader("Content-type", "img/svg+xml")
    res.send(captcha.data)
})
module.exports = router