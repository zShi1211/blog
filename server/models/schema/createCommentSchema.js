const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// 子评论模块可以抽离
const childComment = require('./createChildCommentSchema')

// 文章评论
const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    nickName: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    childComment: {
        type: [childComment],
        default: []
    },
    time: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

module.exports = commentSchema;