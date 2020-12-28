const { LeaveWord } = require('../models')
const { commentValidate, childCommentValidate } = require('./validate/commentValidate')


// 分页获取留言
exports.findLeaveWord = async (page = 1, limit = 10) => {
    return await LeaveWord.find({}).sort({ time: -1 }).skip((page - 1) * limit).limit(limit);
}


// 添加一条留言
exports.addLeaveWord = async (leaveWordObj) => {
    const res = commentValidate(leaveWordObj)
    if (res) {
        throw res;
    }
    return await LeaveWord.create(leaveWordObj)
}

// 添加一条子留言
exports.addChildLeaveWord = async (id, childLeaveWordObj) => {
    const res = childCommentValidate(childLeaveWordObj)
    if (res) {
        throw res;
    }
    return await LeaveWord.updateOne({ "_id": id }, {
        $push: {
            "childComment": childLeaveWordObj
        }
    })
}

// 删除一条留言
exports.removeLeaveWord = async (id) => {
    return await LeaveWord.deleteOne({ "_id": id })
}

// 删除一条子留言
exports.removeChildLeaveWord = async (id) => {
    return await LeaveWord.updateOne({ "childComment._id": id }, {
        $pull: {
            // 这里选中的必须是一个数组
            // 这里的$是第几个留言
            "childComment": {
                // 删除的条件
                _id: id
            }
        }
    })
}