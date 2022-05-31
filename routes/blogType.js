const express = require("express")
const { addBlogType } = require("../service/blogTypeService")
const router = express.Router()


//获取全部文章分类
router.get("/", (req, res, next) => {

})


//添加文章分类
router.post("/", async(req, res, next) => {
    await addBlogType(req.body)
})


//获取一个文章分类
router.get("/:id", (req, res, next) => {

})

///删除一个文章分类
router.delete("/:id", (req, res, next) => {

})

//修改一个文章分类
router.put("/:id", (req, res, next) => {

})
module.exports = router