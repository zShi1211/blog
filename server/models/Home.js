const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 首页信息模型
const homeSchema = new Schema({
    bgImg: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    //Internet Content Provider 备案号
    icp: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Home', homeSchema)