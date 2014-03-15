var mongodb = require("./db");

function User(user){
	this.username = user.username;
	this.password = user.password;
}

User.prototype.save = function save(callback){
	var user = {
		username:this.username,
		password:this.password
	};
	mongodb.insert("user",user, function(err, user){
		callback(err, user);
	});
};

User.query = function(user, callback){
	delete user.password;
	mongodb.queryOne("user",user, function(err, user){
		callback(err, user);
	});
};

module.exports = User;

