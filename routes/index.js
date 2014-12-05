var mongodb = require("../models/db");
var indexRouter = require("./indexRouter");

module.exports = function(app){
	app.get('/', function(req, res) {
		indexRouter.getIndexData(function(err, topicLists){
			res.render('index', { title: '首页',"topicLists":topicLists, user:req.session.user});
		});
	});

	app.get('/logout', function(req, res) {
		delete req.session.user;
		res.redirect("/");
	});
	
	// 注册路由规则
	var routerList = ["user", "topic"];
	for(var i = 0, len = routerList.length; i < len; i++){
		app.set("moduleName", routerList[i]);
		require("./"+routerList[i]+"Router.js").router(app);
		console.log(routerList[i] +"Router is load!");
	}
	
	return app.router;
};

