const express = require("express")
const router = express.Router()
const { addBlog, getBlog, resviseBlog, deleteBlog, pageBlog } = require("../service/blogService")

//获取单篇文章
//要分析两种情况，1、前端获取文章，没有token浏览数要加一 2、后端获取文章有token
router.get("/:id", async(req, res, next) => {
    const header = req.headers
    res.send(await getBlog(req.params.id, header.authorization))
})

//分页获取文章
router.get("/", async(req, res, next) => {
    res.send(await pageBlog(req.query))
})


//删除文章
router.delete("/:id", async(req, res, next) => {
    res.send(await deleteBlog(req.params.id))
})

//修改文章
router.put("/:id", async(req, res, next) => {
    res.send(await resviseBlog(req.params.id, req.body))
})

//发布文章
router.post("/", async(req, res, next) => {
    res.send(await addBlog(req.body))
})
module.exports = router