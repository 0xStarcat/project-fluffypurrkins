var webpack = require('webpack')
var path = require('path')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var BUILD_DIR = path.resolve(__dirname, 'Build')
var APP_DIR = path.resolve(__dirname, 'src/')
var DEVELOPMENT_DIR = path.join(__dirname, 'src/Build')
module.exports = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: DEVELOPMENT_DIR,
    compress: true,
    port: 8080,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx|mjs)$/,
            include: APP_DIR,
            loader: require.resolve('babel-loader'),
            options: {
              compact: true,
              presets: ['react', 'stage-2']
            }
          },
          {
            test: /\.scss$/,
            use: [
              {
                loader: require.resolve('style-loader')
              },
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  minimize: true
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9' // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009'
                    })
                  ]
                }
              },
              {
                loader: require.resolve('sass-loader')
              }
            ]
          }
        ]
      }
    ]
  },
  plugins: [],
  resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      React: path.resolve(__dirname, './node_modules/react')
    }
  }
}
