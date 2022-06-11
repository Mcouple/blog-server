const express = require("express")
const router = express.Router()
const { addProject, getProject, reviseProject, deleteProject } = require("../service/projectService")

//添加项目
router.post("/", async(req, res, next) => {
    res.send(await addProject(req.body))
})


//获取所有项目
router.get("/", async(req, res, next) => {
    res.send(await getProject())
})

//修改项目
router.put("/:id", async(req, res, next) => {
    res.send(await reviseProject(req.params.id, req.body))
})

//删除项目
router.delete("/:id", async(req, res, next) => {
    res.send(await deleteProject(req.params.id))
})

module.exports = router