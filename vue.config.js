const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080, // Порт для клієнтської частини
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // Порт для серверної частини
        changeOrigin: true
      }
    }
  }
});