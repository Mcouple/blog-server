const express = require("express")
const router = express.Router()
const { getSetting, reviseSetting } = require("../service/settingService")

//获取全局设置
router.get("/", async(req, res, next) => {
    res.send(await getSetting())
})


//修改全局设置
router.put("/", async(req, res, next) => {
    res.send(await reviseSetting(req.body))
})

module.exports = router