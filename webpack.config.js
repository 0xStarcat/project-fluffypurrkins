const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')
const fs = require('fs') // to check if the file exists

const BUILD_DIR = path.resolve(__dirname, 'Build')
const APP_DIR = path.resolve(__dirname, 'src/')
const DEVELOPMENT_DIR = path.join(__dirname, 'src')
module.exports = env => {
  const currentPath = path.join(__dirname)

  // Create the fallback path (the production .env)
  const basePath = currentPath + '/.env'

  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = basePath + '.' + env.ENVIRONMENT

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed

  // reduce it to a nice object, the same as before (but with the variables from the file)
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next])
    return prev
  }, {})

  return {
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
              test: /\.(png|jpe?g|gif|pdf)$/i,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    esModule: false
                  }
                }
              ]
            },
            {
              test: /.ejs$/,
              loader: 'ejs-loader',
              options: {
                variable: 'data',
                interpolate: '\\{\\{(.+?)\\}\\}',
                evaluate: '\\[\\[(.+?)\\]\\]'
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
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.ejs'),
        filename: 'index.html',
        head: {
          imagePath: path.resolve(__dirname, 'src', 'images', 'selfie.jpg')
        }
      }),
      new webpack.ProvidePlugin({
        _: 'underscore'
      })
    ],
    resolve: {
      fallback: {
        path: require.resolve('path-browserify') // cannot resolve 'path' in postcss
      },
      alias: {
        react: path.resolve(__dirname, './node_modules/react'),
        React: path.resolve(__dirname, './node_modules/react'),
        '@images': path.resolve(__dirname, './src/images'),
        '@home': path.resolve(__dirname, './src/Home'),
        '@utilities': path.resolve(__dirname, './src/utilities')
      }
    }
  }
}
