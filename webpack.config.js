const path = require('path')
const isDev = process.env.NODE_ENV === "development";
module.exports = {
    mode: isDev ? "development" : "production",
    entry: {
        main: path.resolve(__dirname, './server')
    },
    output: {
        filename: 'server.js'
    },
    target: 'node',
}
// 使用了nodemon监听就不能在这里配置开启监听
