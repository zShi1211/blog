const mongoose = require('mongoose')
const { Schema } = require('mongoose')

// 管理员模型
const adminSchema = new Schema({
    loginId: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15
    },
    loginPwd: {
        type: String,
        required: true,
    },
    nickName: {
        type: String,
        default: "nickName",
        minlength: 2,
        maxlength: 10
    },
    avatar: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Admin', adminSchema)