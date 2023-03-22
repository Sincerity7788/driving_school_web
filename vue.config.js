const { defineConfig } = require("@vue/cli-service");
const { VantResolver } = require("unplugin-vue-components/resolvers");
const ComponentsPlugin = require("unplugin-vue-components/webpack");
const path = require("path");

module.exports = defineConfig(() => ({
  pages: {
    index: {
      // page 的入口
      entry: path.join(__dirname, "./src/main.js"),
      // 模板来源
      template: path.join(__dirname, "./public/index.html"),
      // 在 dist/index.html 的输出
      filename: "index.html",
      title: "cc驾考练习",
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },
  publicPath: "./",
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  devServer: {
    proxy: {
      "/api-cc": {
        target: "https://www.mxnzp.com",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api-cc": "/",
        },
      },
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            [
              "postcss-px-to-viewport",
              {
                unitToConvert: "px", // 需要转换的单位，默认为"px"；
                viewportWidth: 750, // 设计稿的视口宽度
                unitPrecision: 5, // 单位转换后保留的小数位数
                propList: ["*"], // 要进行转换的属性列表,*表示匹配所有,!表示不转换
                viewportUnit: "vw", // 转换后的视口单位
                fontViewportUnit: "vw", // 转换后字体使用的视口单位
                selectorBlackList: [], // 不进行转换的css选择器，继续使用原有单位
                minPixelValue: 1, // 设置最小的转换数值
                mediaQuery: false, // 设置媒体查询里的单位是否需要转换单位
                replace: true, // 是否直接更换属性值，而不添加备用属性
                exclude: [/node_modules/], // 忽略某些文件夹下的文件
              },
            ],
          ],
        },
      },
    },
  },
}));
