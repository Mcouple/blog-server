const projectModel = require("./models/project")

//添加项目
module.exports.addPro = async(projectInfo) => {
    return await projectModel.create(projectInfo)
}

//修改项目
module.exports.revisePro = async(id, newInfo) => {
    await projectModel.update(newInfo, {
        where: {
            id
        }
    })
    return await projectModel.findByPk(id)
}

//删除一个项目
module.exports.deleProject = async(id) => {
    return await projectModel.destroy({
        where: {
            id
        }
    })
}