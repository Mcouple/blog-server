const adminModel = require("./models/adminModel"); //admin数据模型
const bannerModel = require("./models/bannerModel")
const blogTypeModel = require("./models/blogTypeModel")
const settingModel = require("./models/setting")
const BlogModel = require("./models/blog")
const Project = require("./models/project")
const Message = require("./models/message")
const Setting = require("./models/setting")
const About = require("./models/about")

const sequelize = require("./dbConnect"); //数据库连接实例
const md5 = require("md5");

(async function() {
    //定义模型之间的关联关系

    //文章和文章分类之间的关系
    blogTypeModel.hasMany(BlogModel, {
        foreignKey: 'categoryId',
        targetKey: "id"
    })
    BlogModel.belongsTo(blogTypeModel, {
        foreignKey: 'categoryId',
        targetKey: "id",
        as: 'category'
    });

    //博客和博客评论之间存在关联关系
    BlogModel.hasMany(Message, {
        foreignKey: 'blogId',
        targetKey: 'id',
    })
    Message.belongsTo(BlogModel, {
        foreignKey: 'blogId',
        targetKey: 'id',
        as: "blog"
    })


    //将数据模型和表进行同步
    await sequelize.sync({
            alter: true
        })
        //同步完成之后，有一些表需要初始化数据
        //我们需要先查询这张表有没有数据，没有数据我们才进行初始化数据
    const adminCount = await adminModel.count()
    if (!adminCount) {
        adminModel.create({
            loginId: "root",
            loginPwd: md5("123123"),
            name: "超级管理员"
        })
        console.log("管理员数据初始化完毕...");
    }
    const bannerCount = await bannerModel.count()
        // if (!bannerCount) {
        //     await bannerModel.bulkCreate([{
        //             "midImg": "/images/banner/bg1-mid.jpg",
        //             "bigImg": "/images/banner/bg1-big.jpg",
        //             "title": "塞尔达旷野之息",
        //             "description": "2017年度游戏，期待续作"
        //         }, {
        //             "midImg": "/images/banner/bg2-mid.jpg",
        //             "bigImg": "/images/banner/bg2-big.jpg",
        //             "title": "英雄联盟",
        //             "description": "RNG never give up"
        //         },
        //         {
        //             "midImg": "/images/banner/bg3-mid.jpg",
        //             "bigImg": "/images/banner/bg3-big.jpg",
        //             "title": "lol",
        //             "description": "这是冬天里的一把火"
        //         }
        //     ])
        //     console.log("banner数据初始化完毕");
        // }
    const settingCount = await settingModel.count()
    if (!settingCount) {
        const result = {
            "avatar": "http://www.duyiedu.com/source/img/logo.png", // 博主照片
            "siteTitle": "袁进的空间", // 网站标题
            "github": "https://github.com/DuYi-Edu", // 博主github主页
            "qq": "3263023350", // 博主 qq
            "qqQrCode": "http://www.duyiedu.com/source/img/%E5%B0%8F%E6%B8%A1%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.png", // 博主qq二维码
            "weixin": "yh777bao", // 博主微信号
            "weixinQrCode": "http://www.duyiedu.com/source/img/%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.png", // 博主微信二维码
            "mail": "3263023350@qq.com", // 博主邮箱
            "icp": "黑ICP备17001719号", // 网站备案号
            "githubName": "DuYi-Edu", // 博主github名称
            "favicon": "http://mdrs.yuanjin.tech/Fs4CDlC6mwe_WXLMIiXcmSJLHO4f", // 网站图标
        }
        await settingModel.create(result)
        console.log("全局数据初始化完毕。。。");
    }
    console.log("数据库启动完毕...");
})()