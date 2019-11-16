const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Autoprefixer = require('autoprefixer');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';
const publicDir = isProd ? 'https://hahahayabanan.github.io/FSD-4th-task/' : '/';

const plugins = [
  Autoprefixer,

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
    },
  }),
  new MiniCssExtractPlugin({
    filename: './css/[name].[hash].css',
  }),
  new HtmlWebpackPlugin({
    template: './test-page/index.pug',
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      tslint: {
        emitErrors: true,
        failOnHint: true,
      },
    },
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }),
  new CopyWebpackPlugin([
    { from: '../node_modules/jquery/dist/jquery.js', to: './lib/jquery.js' },
  ]),
];

const config = {
  devtool: isProd ? 'hidden-source-map' : 'source-map',
  context: path.resolve('./src'),
  entry: {
    app: './index.ts',
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].bundle.js',
    publicPath: publicDir,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: [/\/node_modules\//],
        use: ['awesome-typescript-loader', 'source-map-loader'],
      },

      !isProd
        ? {
          test: /\.(js|ts)$/,
          loader: 'istanbul-instrumenter-loader',
          exclude: [/\/node_modules\//],
          query: {
            esModules: true,
          },
        }
        : null,
      { test: /\.html$/, loader: 'html-loader' },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [path.join(__dirname, 'src')],
            },
          },
        ],
      },
      {
        test: /\.(svg|png|ico|xml|json)$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'favicons/',
          },
        }],
      },
      {
        loader: 'webpack-px-to-rem',
        query: {
          // 1rem=npx default 10
          basePx: 16,
          min: 1,
          floatWidth: 3,
        },
      },
    ].filter(Boolean),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins,
  devServer: {
    contentBase: path.join(__dirname, 'dist/'),
    compress: true,
    port: 3000,
    hot: true,
  },
};

module.exports = config;
