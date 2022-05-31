const express = require("express")
const banner = express.Router()
const { getBanner, setBanner } = require("../service/bannerService")

//获取首页标语
banner.get("/", async(req, res, next) => {
    res.send(await getBanner())
})

//设置首页标语
banner.post("/", async(req, res, next) => {
    res.send(await setBanner(req.body))
})

module.exports = banner