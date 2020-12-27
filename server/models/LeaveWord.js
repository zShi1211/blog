const mongoose = require('mongoose')
const CommentSchema = require('./schema/createCommentSchema')

// 留言模型
const leavaWordSchema = CommentSchema

module.exports = mongoose.model('LeaveWord', leavaWordSchema)