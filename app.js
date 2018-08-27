var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');

mongoose.connect(config.database);
// mongoose.connect(config.test_database);

var restaurant = require('./routes/restaurant');
var users = require('./routes/users');
var guest = require('./routes/guest')
var server = require('./routes/server')
var return_guest = require('./routes/return_guest')

var admin_auth = require('./routes/admin/auth')
var admin_user = require('./routes/admin/user')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(passport.initialize());

app.use(function(req, res, next) {
  req.getUrl = req.protocol + "://" + req.get('host' ) + "/"
  return next();
});


app.use('/restaurant', restaurant);
app.use('/user', users);
app.use('/guest', guest);
app.use('/server', server);
app.use('/return_guest', return_guest);

// admin page apis
app.use('/admin/auth', admin_auth);
app.use('/admin/user', admin_user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  console.log(err)
  return res.json({err:err})
  // res.render('error');
});

module.exports = app;
