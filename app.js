var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const md5 = require("md5")
const expressJWT = require("express-jwt");
const { ForbiddenError, ServiceError, UnknowError } = require("./utils/errors")
const session = require("express-session")

//创建服务器实例
var app = express();

//默认读取项目根目录下的 .env 环境变量文件
require("dotenv").config()

//使用express-session 保存captcha
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

//使用各种中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




//获取异步错误
require("express-async-errors")


//引入路由
const admin = require("./routes/admin")
const captcha = require("./routes/captcha");
const banner = require("./routes/banner")
const upload = require("./routes/upload")
const blogType = require("./routes/blogType")
const blog = require("./routes/blog")



//连接数据库
require("./db/dbInit")


//配置验证token接口
app.use(expressJWT({
    secret: md5(process.env.JWT_SECRET), //我们设置的密钥
    algorithms: ['HS256'], //新版的expressJWT 必须要指定算法
}).unless({
    //需要排除token验证的路由
    path: [
        { "url": "/api/admin/login", methods: ["POST"] },
        { "url": "/res/captcha", methods: ["GET"] },
        { "url": "/api/banner", methods: ["GET"] },
    ]
}))


//使用路由
app.use("/api/admin", admin)
app.use("/res/captcha", captcha)
app.use("/api/banner", banner)
app.use("/api/upload", upload)
app.use("/api/blogtype", blogType)
app.use("/api/blog", blog)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// 错误处理，一旦发生错误，就会到这里来
app.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.send(new ForbiddenError("用户未登录，或者登录已过期").toResponseJSON())
    } else if (err instanceof ServiceError) {
        res.send(err.toResponseJSON())
    } else {
        res.send(new UnknowError().toResponseJSON())
    }
});

module.exports = app;