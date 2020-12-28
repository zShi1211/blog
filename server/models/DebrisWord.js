const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// 碎语模型
const debrisWordSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('DebrisWord', debrisWordSchema);