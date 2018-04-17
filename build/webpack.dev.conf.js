'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const simulatedData = require('../simulatedData.json')
const userDB = require('../userDB.json')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    before(app) {
      app.use(bodyParser.urlencoded({
        extended: false
      }));
      app.get('/api/newsList', (req, res) => {
        res.json(simulatedData.newsList);
      });
      app.get('/api/categories', (req, res) => {
        res.json(simulatedData.categories);
      });
      app.get('/api/boardList', (req, res) => {
        res.json(simulatedData.boardList);
      });
      app.get('/api/carouselPics', (req, res) => {
        res.json(simulatedData.carouselPics);
      });
      // bodyParser.json(),
      app.post('/login', cookieParser(), (req, res) => {
        let username, password;
        let success = false;
        if (req.cookies.loginStatus) {
          username = req.cookies.loginStatus.username;
          password = req.cookies.loginStatus.password;
        } else if (req.body) {
          username = req.body.username;
          password = req.body.password;
        }
        if (username && password) {
          userDB.forEach(user => {
            if (user.username == username &&
              user.password == password) {
              success = true;
            }
          });
          if (success) {
            res.cookie('loginStatus', {
              username,
              password
            })
            res.status(200);
            return res.json({
              success: true,
              username
            });
          } else {
            res.status(401);
            return res.json({
              success: false,
              username: ''
            });
          }
        } else
          return res.end();
      });
      app.get('/logout', (req, res) => {
        res.clearCookie('loginStatus');
        res.status(200);
        return res.json({
          success: true,
          username: ''
        });
      })
    },
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [{
        from: /.*/,
        to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
      }, ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true
    } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: config.dev.assetsSubDirectory,
      ignore: ['.*']
    }])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors ?
          utils.createNotifierCallback() : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
