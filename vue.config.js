const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭eslint校验
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/': {
        ws: false,
        //目标地址
        target: 'http://localhost:8082',
        //发送请求头host设置为目标地址
        changeOrigin: true
      }
    }
  }
})


/*module.exports = {
  devServer: {
    host:'localhost',
    port:8080,
    proxy: {
      '/': {
        ws:false,
        //目标地址
        target: 'http://localhost:8082',
        //发送请求头host设置为目标地址
        changeOrigin: true
      }
    }
  }
};*/





