import { defineConfig } from 'umi';
export default defineConfig({
  outputPath: '../dist/public/admin',
  hash: true,
  dva: {
    hmr: true
  },
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
});
