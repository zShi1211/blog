const path = require('path')
console.log(process.env.NODE_ENV)
module.exports = {
  lintOnSave: false,
  outputDir: path.resolve(__dirname, "../dist/public/client"),
  publicPath: process.env.NODE_ENV === 'production' ? '/client' : '/',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:1211',
        changeOrigin: true
      },
      '/upload/': {
        target: 'http://localhost:1211',
        changeOrigin: true
      }
    }
  }
}
