const { DebrisWord } = require('../models')
const debrisWordValidate = require('./validate/debrisWordValidate')

// 添加一个碎语
exports.addDebrisWord = async (debrisWordObj) => {
    const res = debrisWordValidate(debrisWordObj);
    if (res) {
        throw res;
    }
    return await DebrisWord.create(debrisWordObj)
}

// 删除一个碎语
exports.removeDebrisWord = async (_id) => {
    return await DebrisWord.deleteOne({ _id })
}

// 修改一个碎语
exports.updateDebrisWord = async (_id, debrisWordObj) => {
    const res = debrisWordValidate(debrisWordObj);
    if (res) {
        throw res;
    }
    return await DebrisWord.updateOne({ _id }, { $set: debrisWordObj })
}

// 查看一个碎语
exports.findOneDebrisWord = async (id) => {
    return await DebrisWord.findById(id)
}

// 分页查看碎语
exports.findManyDebrisWord = async (page = 1, limit = 10) => {
    const count = await DebrisWord.countDocuments();
    const datas = await DebrisWord.find({}).sort({ time: -1 }).skip((page - 1) * limit).limit(limit);
    return {
        count,
        datas
    }
}