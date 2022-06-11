const { getAboutDb, reviseAboutDb } = require("../db/about")
const { formatResponse } = require("../utils/tools")
module.exports.getAbout = async() => {
    const { url } = await getAboutDb()
    return formatResponse(0, "", url)
}

module.exports.reviseAbout = async(newUrl) => {
    const { url } = await reviseAboutDb(newUrl)
    return formatResponse(0, "", url)
}