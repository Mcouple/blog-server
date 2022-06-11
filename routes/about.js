const express = require("express")
const router = express.Router()
const { getAbout, reviseAbout } = require("../service/aboutService")

router.get("/", async(req, res, next) => {
    res.send(await getAbout())
})

router.post("/", async(req, res, next) => {
    res.send(await reviseAbout(req.body))
})
module.exports = router