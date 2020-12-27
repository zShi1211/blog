const mongoose = require('mongoose');
const { index } = require('./schema/createCommentSchema');
const Schema = mongoose.Schema;
const CommentSchema = require('./schema/createCommentSchema')

// 文章模型
const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    content: {
        type: String,
        required: true
    },
    read: {
        type: Number,
        default: 0
    },
    like: {
        type: Number,
        default: 0
    },
    picture: {
        type: String,
        required: true
    },
    words: {
        type: Number,
        default: 0
    },
    contentHtml: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now,
    },
    comment: {
        type: [CommentSchema],
        default: []
    }
})

module.exports = mongoose.model('Article', articleSchema);