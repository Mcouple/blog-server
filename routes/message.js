const express = require("express")
const router = express.Router()
const { addMessage, deleteMessage, pageMessage } = require("../service/messageService")

//提交留言或评论
router.post("/", async(req, res, next) => {
    res.send(await addMessage(req.body))
})

//分页获取留言或评论
router.get("/", async(req, res, next) => {
    res.send(await pageMessage(req.query))
})

//删除留言或评论
router.delete("/:id", async(req, res, next) => {
    res.send(await deleteMessage(req.params.id))
})


module.exports = router