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
