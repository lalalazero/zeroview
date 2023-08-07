const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: "./example/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
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
        test: /\.md$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              compilerOptions: {
                preserveWhitespace: false,
              },
            },
          },
          require.resolve("./md-loader.js"),
        ],
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
          "css-loader", // 把 CSS 转成 CommonJS
          // "postcss-loader", // TODO 暂时好像没用到
          {
            loader: "sass-loader", // 把 Scss 转成 CSS
            options: {
              implementation: require("sass"),
              // sass-loader version < 8 要用 data 属性，而不是 additionalData 属性，参见 https://vue-loader.vuejs.org/guide/pre-processors.html#sharing-global-variables
              data: '@import "~/src/style.scss";',
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
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: "example.html",
      template: "example/index.htm",
    }),
  ],
};
