var path = require('path');
var appDir = __dirname;
var rootDir = path.join(appDir,"/..");
var initialize = require(rootDir+'/common/unit/initialize');
initialize.initDir(appDir,rootDir);

Object.defineProperty(global, "ENV", {
    get: function(){
        return "dev";
    }
});

var express = require('express');
//var path = require('path');
//var favicon = require('serve-favicon');//指定ico
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require(rootDir+'/common/unit/autoRoute');

// var tool1 = require("common");
// console.log(tool1);

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));//日志
app.use(bodyParser.json());//body解析后才能json 
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
//路由
app.use('/', routes.getRouter(path.join(appDir,"routes")));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.send('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;