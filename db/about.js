const aboutModel = require("./models/about")
module.exports.getAboutDb = async() => {
    return await aboutModel.findOne()
}

module.exports.reviseAboutDb = async(url) => {
    await aboutModel.update(url, {
        where: {
            id: 1
        }
    })
    return await aboutModel.findOne()
}