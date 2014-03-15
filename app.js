
/**
 * Module dependencies.
 */
var settings = require("./settings");

var http = require('http');
var path = require('path');

var express = require('express');
var partials = require('express-partials');
var MongoStore = require('connect-mongo')(express);
var sessionStore = new MongoStore({
	db : settings.db
}, function() {
	console.log('connect mongodb success...');
});

var settings = require("./models/db");
var routes = require('./routes');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
// 设置页面文件路径
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
app.set('layout', "layout");
app.use(express.favicon());
app.use(express.logger('dev'));
// 解析请求体，可以从request中获取传递的参数
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('likeshan')); 
app.use(express.session({secret : settings.cookieSecret, store: new MongoStore({url: "mongodb://127.0.0.1:27017/weibo" }) }));

// app.use(express.cookieParser('likeshan')); 
// app.use(express.session({ secret: "andylau" }));

// 加载路由信息
app.use(routes(app));
// 设置静态文件路径
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port %d in %s mod', app.get('port'), app.get("env"));
});
