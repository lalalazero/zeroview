const path = require('path')
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'vue2-components.js',
    clean: true,
    library: 'vue2Components',
    libraryTarget: 'umd',
    globalObject: 'this', // 如果输出是 umd，global 全局设置成 this
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
            // TODO 这个是给 vue-class-component 用的
            // plugins: [
            //   ["@babel/plugin-proposal-decorators", { version: "legacy" }]
            // ]
          },
        },
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader, // 搞成单独的 CSS 文件
          // "vue-style-loader", // 把 CSS 通过 <style> 标签输出到 html 页面
          "css-loader",  // 把 CSS 转成 CommonJS
          // "postcss-loader", // TODO 暂时好像没用到
          {
            loader: "sass-loader", // 把 Scss 转成 CSS
            options: {
              implementation: require("sass"),
              data: '@import "~@/style.scss";',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve("src"),
    },
    extensions: [".js", ".vue"],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
  ]
}
