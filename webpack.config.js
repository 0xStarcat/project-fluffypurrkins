var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'src/Client/build');
var APP_DIR = path.resolve(__dirname, 'src/Client/');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/ ,
        include : APP_DIR,
        loader : 'babel-loader',
        exclude: /node_modules/
      },
      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      }
    ]
  },
  plugins: [
        new ExtractTextPlugin(
              {
                filename: BUILD_DIR +'/style.css',
                allChunks: true
              }
            )
    ]
};

module.exports = config;
