const { Home } = require('../models')
const homeValidate = require('./validate/homeValidate')

// 添加一个首页信息
exports.addHome = async (homeObj) => {
    const res = homeValidate(homeObj);
    if (res) {
        throw res;
    }
    return await Home.create(homeObj)
}

// 删除一个首页信息
exports.removeHome = async () => {
    // 首页信息就只有一个
    return await Home.deleteOne({})
}

// 修改一个首页信息
exports.updateHome = async (homeObj) => {
    const res = homeValidate(homeObj);
    if (res) {
        throw res;
    }
    return await Home.updateOne({}, { $set: homeObj })
}

// 查看首页信息
exports.findHome = async () => {
    // 首页信息就只有一个
    return await Home.findOne({})
}