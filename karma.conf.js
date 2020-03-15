var webpackConfig = require('@vue/cli-service/webpack.config.js')

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    // 这里设置了就不用代码里面再引入 sinon-chai
    // frameworks: ['mocha', 'sinon-chai',

    files: ['tests/**/*.spec.js'],

    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    autoWatch: true,
    browsers: ['ChromeHeadless']
  })
}
