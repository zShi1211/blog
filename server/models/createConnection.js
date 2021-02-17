const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://127.0.0.1/blog', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
// 建立一个连接
db.on('open', () => {
    console.log('数据库连接了')
})