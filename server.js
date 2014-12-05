/**
var http = require('http');
var port = 18080;
http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>Hello World1111</p>');
}).listen(port);
*/

/**
 * Module dependencies.
 */
var settings = require("./settings");

var http = require('http');
var path = require('path');

var express = require('express');
var partials = require('express-partials');
var MongoStore = require('connect-mongo')(express);
var flash = require('connect-flash');

var settings = require("./models/db");
var routes = require('./routes');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
// 设置页面文件路径
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(partials());
app.set('layout', "layout");
app.use(express.favicon());
app.use(flash());
app.use(express.logger('dev'));
// 解析请求体，可以从request中获取传递的参数
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser("superTopSecret")); 
// var session = express.session({
//     store: new MongoStore({
//           url: 'mongodb://localhost:27017/weibo', 
//           maxAge: 300000
//     }),
//     secret: 'superTopSecret' 
// });
app.use(express.session());	//使用内存存储Session信息
// 加载路由信息
app.use(routes(app));
// 设置静态文件路径dd
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(18080, function(){
	console.log('Express server listening on port %d in %s mod', 18080, app.get("env"));
});
