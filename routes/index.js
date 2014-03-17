module.exports = function(app){
	app.get('/', function(req, res) {
		res.render('index', { title: '首页' });
	});
	// app.get(/^\/\w+\S*$/i, function(req, res, next) {
	// 	var ctrl;
	// 	try{
	// 		ctrl = require("./"+req.path.split("/")[1]+".js");
	// 		console.log("ctrl="+ctrl);
	// 		if(ctrl){
	// 			ctrl.router(app);
	// 		}			
	// 	} catch(e){
	// 		next();
	// 	}
	// });
	
	
	// 注册路由规则
	var routerList = ["user"];
	for(var i = 0, len = routerList.length; i < len; i++){
		app.set("moduleName", routerList[i]);
		require("./"+routerList[i]+".js").router(app);
	}
	
	return app.router;
};

