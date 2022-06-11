const jwt = require("jsonwebtoken")
const md5 = require("md5")
const multer = require("multer")
const path = require("path")
    //格式化服务器返回的数据格式
module.exports.formatResponse = (code, msg, data) => ({
    code,
    msg,
    data
})

//解析token
module.exports.parseToken = (token) => {
    // jsonwebtoken 的实例方法 verify() 用于解析token
    return jwt.verify(token.split(" ")[1], md5(process.env.JWT_SECRET))
}

//上传文件组件
const storage = multer.diskStorage({
    //文件存储的位置
    destination: function(req, file, cb) {
        cb(null, __dirname + '/../public/images/uploads')
    },

    //上传到服务器的文件，文件名要做处理
    filename: function(req, file, cb) {
        //file.originalname 原本的名字，path.extname() 排除后缀名
        const basename = path.basename(file.originalname, path.extname(file.originalname))
        const extname = path.extname(file.originalname)
        const filename = basename + Math.floor(Math.random() * 9000 + 1000) + new Date().getTime() + extname
        cb(null, filename)
    }
})

module.exports.uploading = multer({
    storage: storage,
    limits: {
        fileSize: 3000000,
        files: 1
    }
})