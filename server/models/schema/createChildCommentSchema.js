const { Schema } = require('mongoose')


module.exports = new Schema({
    to: {
        type: String,
        default: null
    },
    from: {
        type: {
            nickName: { type: String, required: true },
            avatar: { type: String, required: true }
        },
        required: true
    },
    content: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
})