var mongodb = require("../models/db");
var User = require("../models/User.js");
var messageUtils = require("../models/messageUtils.js");

exports.router = function(app){
	var moduleName = "/"+app.get("moduleName");

	app.get(moduleName+'/reg', function(req, res) {
		res.render('reg', { title: '注册' });
	});

	app.get(moduleName+'/login', function(req, res) {
		res.render('login', { title: '登录' });
	});

	// 保存注册信息
	app.post(moduleName+'/reg', function(req,res){
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
};