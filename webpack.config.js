// GENERAL IMPORTS
const path = require('path');
const _ = require('lodash');

// WEBPACK AND PLUGINS IMPORTS
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const LodashPlugin = require('lodash-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const VerPlugin = require('webpack-ver-plugin');
const webpack = require('webpack');

// SETUP
const filename = 'muv';

// CONFIG
const config = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    library: filename,
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
  },
  plugins: [
    new LodashPlugin(),
  ],
};

// BUILDS
const umd = _.merge({}, config, {
  devtool: 'sourcemap',
  output: {
    filename: `${filename}.js`,
    libraryTarget: 'umd',
  },
  plugins: _.concat(config.plugins, [
    new VerPlugin({
      packageFile: path.join(__dirname, 'package.json'),
      outputFile: path.join('./src/', 'release.json'),
    }),
    new CleanPlugin(['dist']),
  ]),
});

const umdProd = _.merge({}, config, {
  output: {
    filename: `${filename}.min.js`,
    libraryTarget: 'umd',
  },
  plugins: _.concat(config.plugins, [
    new UglifyJsPlugin(),
  ]),
});

// EXPORTS
module.exports = [umd, umdProd];
