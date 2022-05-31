const express = require("express")
const router = express.Router()
const { uploading, formatResponse } = require("../utils/tools")
const multer = require("multer")
const { UploadError } = require("../utils/errors")

router.post("/", async(req, res, next) => {
    //single 方法里面书写上传控件的 name 值
    uploading.single("file")(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            next(new UploadError("上传文件失败，大小需要在2M以内"))
        } else {
            const path = "images/uploads" + req.file.filename
            res.send(formatResponse(0, "", path))
        }
    })
})
module.exports = router