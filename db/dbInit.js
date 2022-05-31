const adminModel = require("./models/adminModel"); //admin数据模型
const bannerModel = require("./models/bannerModel")
const blogTypeModel = require("./models/blogTypeModel")
const sequelize = require("./dbConnect"); //数据库连接实例
const md5 = require("md5");

(async function() {
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
    if (!bannerCount) {
        await bannerModel.bulkCreate([{
                "midImg": "/images/banner/bg1-mid.jpg",
                "bigImg": "/images/banner/bg1-big.jpg",
                "title": "塞尔达旷野之息",
                "description": "2017年度游戏，期待续作"
            }, {
                "midImg": "/images/banner/bg2-mid.jpg",
                "bigImg": "/images/banner/bg2-big.jpg",
                "title": "英雄联盟",
                "description": "RNG never give up"
            },
            {
                "midImg": "/images/banner/bg3-mid.jpg",
                "bigImg": "/images/banner/bg3-big.jpg",
                "title": "lol",
                "description": "这是冬天里的一把火"
            }
        ])
        console.log("banner数据初始化完毕");
    }
    console.log("数据库启动完毕...");
})()