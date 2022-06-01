const express = require("express")
const { addBlogType, getBlogTypes, deleteBlogType, getBlogType, reviseBlogType } = require("../service/blogTypeService")
const router = express.Router()


//获取全部文章分类
router.get("/", async(req, res, next) => {
    res.send(await getBlogTypes())
})


//添加文章分类
router.post("/", async(req, res, next) => {
    res.send(await addBlogType(req.body))
})


//获取一个文章分类
router.get("/:id", async(req, res, next) => {
    res.send(await getBlogType(req.params.id))
})

///删除一个文章分类
router.delete("/:id", async(req, res, next) => {
    res.send(await deleteBlogType(req.params.id))
})

//修改一个文章分类
router.put("/:id", async(req, res, next) => {
    res.send(await reviseBlogType(req.body, req.params.id))
})
module.exports = router