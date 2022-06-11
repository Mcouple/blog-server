const { addPro, revisePro, deleProject } = require("../db/project")
const { formatResponse } = require("../utils/tools")
const projectModel = require("../db/models/project")
const { NotFoundError } = require("../utils/errors")

//添加项目
module.exports.addProject = async(projectInfo) => {
    //需要对项目描述，description做处理，因为传过来的是一个数组
    projectInfo.description = JSON.stringify(projectInfo.description)
    const data = await addPro(projectInfo)
    return formatResponse(0, "", data)
};


//获取所有项目
module.exports.getProject = async() => {
    let data = await projectModel.findAll()
    for (const key of data) {
        key.dataValues.description = (key.dataValues.description)
    }
    return formatResponse(0, "", data)
}

//修改项目
module.exports.reviseProject = async(id, newInfo) => {
    newInfo.description = JSON.stringify(newInfo.description)
    const { dataValues } = await revisePro(id, newInfo)
    dataValues.description = JSON.parse(dataValues.description)
    return formatResponse(0, "", data)
}

//删除一个项目
module.exports.deleteProject = async(id) => {
    const data = await deleProject(id)
    if (data) {
        return formatResponse(0, "", true)
    }
    throw new NotFoundError()
}