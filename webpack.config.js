/* webpack.config.js */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin')


const assetsPluginInstance = new AssetsPlugin();
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './app/index.html',
  filename: 'index.html',
  inject: 'body'
});

const config = {
    entry: './app/index.js',
    output: {
        path: path.resolve('public'),
        filename: 'bundle-[hash].js',
    },
    module: {
        rules: [
          {test: /\.(js|jsx)$/, use: 'babel-loader'},
          // {test: /\.css$/, loader: "style-loader!css-loader"},
          {test: /\.scss$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })},
          {test: /\.(eot|ttf|wav|mp3|mp4|webm|png)$/, loader: 'file-loader'},
          {test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'url-loader?limit=100000'},
        ]
    },
    plugins: [
      assetsPluginInstance,
      HtmlWebpackPluginConfig,
      new ExtractTextPlugin("styles-[hash].css")
    ]
}

module.exports = config;
