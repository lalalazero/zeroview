const path = require("path");
const example = process.env.EXAMPLE_ENV;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  publicPath: example === "true" ? "/zeroview/" : "/",
  runtimeCompiler: true, // 使用包含运行时+编译器的vue构建版本,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "./src/style.scss")]
    }
  },
  configureWebpack: {
    // 这样写没用，所以要改成 webpack 构建
    // entry: {
    //   app: example === 'true' ? './src/example.js' : './src/index.js' ,
    //   vendor: ['vue']
    // },
    plugins: [
      new BundleAnalyzerPlugin({
        // default config
        // analyzerMode: 'server',
        // analyzerHost: '127.0.0.1',
        // analyzerPort: 8888
      })
    ]
  },
  chainWebpack: config => {
    config.module
      .rule("markdown")
      .test(/\.md$/)
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        return Object.assign({}, options, {
          compilerOptions: {
            preserveWhitespace: false
          }
        });
      })
      .end();

    config.module
      .rule("markdown")
      .test(/\.md$/)
      .use(require.resolve("./md-loader.js"))
      .loader(require.resolve("./md-loader.js"))
      .end();
  }
};
