// meta image https://bggenerator.com/bars_background.php

const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')
const fs = require('fs') // to check if the file exists
const SitemapPlugin = require('sitemap-webpack-plugin').default
const RobotstxtPlugin = require('robotstxt-webpack-plugin')

const BUILD_DIR = path.resolve(__dirname, 'Build')
const APP_DIR = path.resolve(__dirname, 'src/')
const DEVELOPMENT_DIR = path.join(__dirname, 'src')

const SITE_URL = 'https://jade.ahking.me/'
const sitemapPaths = ['/', '/about', '/projects', '/work', '/cv', '/contact']

const robotOptions = {}

module.exports = env => {
  const environment = (env && env.ENVIRONMENT) || process.env.ENVIRONMENT || 'production'
  const basePath = path.join(__dirname, '.env')
  const envPath = `${basePath}.${environment}`
  const finalPath = fs.existsSync(envPath) ? envPath : basePath
  const fileEnv = fs.existsSync(finalPath)
    ? dotenv.config({ path: finalPath }).parsed || {}
    : {}
  const envNames = new Set([...Object.keys(fileEnv), 'ENVIRONMENT', 'REACT_GA_CODE'])

  const envKeys = Array.from(envNames).reduce((prev, name) => {
    const value =
      name === 'ENVIRONMENT'
        ? environment
        : Object.prototype.hasOwnProperty.call(process.env, name)
          ? process.env[name]
          : fileEnv[name]
    prev[`process.env.${name}`] = JSON.stringify(value)
    return prev
  }, {})

  return {
    entry: APP_DIR + '/index.jsx',
    output: {
      path: BUILD_DIR,
      filename: 'bundle.js'
    },
    devServer: {
      static: DEVELOPMENT_DIR,
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
              test: /\.scss$/,
              use: [
                {
                  loader: require.resolve('style-loader')
                },
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1
                  }
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    postcssOptions: {
                      plugins: [
                        require('postcss-flexbugs-fixes'),
                        autoprefixer({
                          overrideBrowserslist: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9'
                          ],
                          flexbox: 'no-2009'
                        })
                      ]
                    }
                  }
                },
                {
                  loader: require.resolve('sass-loader'),
                  options: {
                    implementation: require('sass')
                  }
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
        templateParameters: {
          metaTitle: "Jade's Portfolio",
          metaDescription: "Jade's Portfolio, Resume, and other things.",
          siteUrl: SITE_URL
        }
      }),
      new SitemapPlugin({ base: SITE_URL, paths: sitemapPaths }),
      new RobotstxtPlugin(robotOptions)
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
