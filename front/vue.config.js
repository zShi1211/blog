const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')


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
      // 图片代理
      '/upload/': {
        target: 'http://localhost:1211',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: "[path].gz",
        algorithm: "gzip",
        test: /\.(js|css|json|txt|html|ico|svg)$/i,
        minRatio: 0.8,
      })
    ]
  }
}
