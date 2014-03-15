var mongodb = require("../models/db");
var User = require("../models/User.js");
var messageUtils = require("../models/messageUtils.js");

//路由规则列表
module.exports = function(app){
	app.get('/', function(req, res) {
		res.render('index', { title: '首页' });
	});

	// app.post('/post', routes.post);
	// app.get("/u/:user", routes.user);
	
	// 跳转到注册页面
	app.get('/reg', function(req, res) {
		res.render('reg', { title: '注册' });
	});
	// 保存注册信息
	app.post('/reg', function(req,res){
		var newUser = new User({
			username:req.body.username || "",
			password:req.body.password || ""
		});
		User.query(newUser, function(err, user){
			if(user){
				messageUtils.failure(res, "邮件地址已经存在！");
			} else {
				newUser.save(function(err){
					if(err){
						messageUtils.failure(res, "新建用户失败！");
					} else {
						messageUtils.success(res, "新建用户成功！");
					}
				});
			}
		});
	});
	app.get('/login', function(req, res) {
		res.render('login', { title: '登陆' });
	});
	// app.post('/login', routes.doLogin);
	// app.get('/logout', routes.logout);

	return app.router;
};