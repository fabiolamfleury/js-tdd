const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const nodeENV = process.env.NODE_ENV || 'production';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: { warnings: false },
        outuput: { comments: false, beautify: false },
        sourceMap: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeENV) },
    }),
  ],
};
