//import modules
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var multer = require('multer');
var fs = require('fs');
// var mysql = require('mysql');
var app = express();
var path = require('path')
var history = require('connect-history-api-fallback')
const simulatedData = require('./simulatedData.json')
const userDB = require('./userDB.json')

//set the mysql configuration
// var connection = mysql.createConnection({
//   host: 'localhost',
//   port: '3306',
//   user: 'root',
//   password: 'root',
//   database: 'express_demo'
// });
// connection.connect();
app.use(history());
//serve the static resource
app.use(express.static('dist'));

//use cookie parser to set cookie
// app.use(cookieParser());
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
  }
});
app.get('/logout', (req, res) => {
  res.clearCookie('loginStatus');
  res.status(200);
  return res.json({
    success: true,
    username: ''
  });
});

var server = app.listen(3000, () => {
  var hostname = server.address().address;
  var port = server.address().port;
  console.log(`Server listening on ${hostname}:${port}...`);
});
