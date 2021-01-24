import { defineConfig } from 'umi';
import CompressionWebpackPlugin from 'compression-webpack-plugin'

export default defineConfig({
  outputPath: '../dist/public/admin',
  favicon: process.env.NODE_ENV === 'production' ? '/admin/favicon.ico' : "/favicon.ico",
  publicPath: process.env.NODE_ENV === 'production' ? '/admin/' : '/',
  hash: true,
  dva: {
    hmr: true
  },
  base: process.env.NODE_ENV === 'production' ? '/admin' : '/',
  antd: {
    dark: false,
  },
  alias: {
    '@': '/src',
  },
  proxy: {
    '/api': {
      'target': 'http://localhost:1211',
      'changeOrigin': true,
    },
    '/upload': {
      'target': 'http://localhost:1211',
      'changeOrigin': true,
    },
  },
  chainWebpack: memo => {
    if (process.env.NODE_ENV === 'production') {  // 生产模式开启
      // gzip
      memo.plugin('compression-webpack-plugin').use(
        new CompressionWebpackPlugin({
          filename: "[path].gz",
          algorithm: "gzip",
          test: /\.(js|css|json|txt|html|ico|svg)$/i,
          minRatio: 0.8,
        })
      );
    }
  }
});
