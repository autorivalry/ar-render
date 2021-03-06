

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var helperRepeat = require('handlebars-helper-repeat');

var routes = require('./routes/index'),
  users = require('./routes/user'),
  matchups = require('./routes/matchup');

var app = express();

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// view engine setup
var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        repeat: helperRepeat,
        is: function (v1, operator, v2, options) {

          switch (operator) {
            case '==':
              return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
              return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
              return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
              return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
              return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
              return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
              return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
              return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
              return options.inverse(this);
          }
        }
    },
    defaultLayout: 'main',
    partialsDir: ['views/partials/']
});

app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/v1/matchups', matchups);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
