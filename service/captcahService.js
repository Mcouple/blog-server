const captcha = require("svg-captcha")

module.exports.captchaService = () => {
    return captcha.create({
        size: 4,
        ignoreChars: "0OoiIl1",
        noise: 6,
        color: true
    })
}