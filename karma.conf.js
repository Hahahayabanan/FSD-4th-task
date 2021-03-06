const webpackConf = require('./webpack.config.js');

module.exports = (config) => {
  config.set({
    basePath: '',
    plugins: ['@metahub/karma-jasmine-jquery', 'karma-*'],
    frameworks: ['jasmine', 'jasmine-jquery'],
    files: [
      { pattern: './tests-coverage/unit/spec-bundle.js', watched: false },
      './node_modules/jquery/dist/jquery.js',
    ],
    preprocessors: { './tests-coverage/unit/spec-bundle.js': ['webpack', 'sourcemap'] },
    karmaTypescriptConfig: {
      compilerOptions: {
        noImplicitAny: true,
        noImplicitReturns: true,
        noImplicitThis: true,
        allowSyntheticDefaultImports: true,
        lib: ['DOM', 'ES5', 'ScriptHost', 'ES2015.Core', 'ES2015.Iterable']
      }
    },
    webpack: {
      module: webpackConf.module,
      resolve: webpackConf.resolve
    },
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },
    reporters: ['spec', 'coverage-istanbul'],
    specReporter: {
      maxLogLines: 5, // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false, // do not print information about failed tests
      suppressPassed: false, // do not print information about passed tests
      suppressSkipped: true, // do not print information about skipped tests
      showSpecTiming: true // print the time elapsed for each spec
    },
    coverageIstanbulReporter: {
      reports: ['html', 'text-summary'],
      dir: './tests-coverage', // coverage results needs to be saved under coverage/
      fixWebpackSourcePaths: true,
      query: {
        esModules: true
      }
    },
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  });
};
