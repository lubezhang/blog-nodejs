var settings = require("../settings");
// var mongodb = require('mongodb');
// var Db = require("mongodb").Db;
// var connection = require("mongodb").Connection;
// var mongodbServer = require("mongodb").Server;

// module.exports = new Db(settings.db, new mongodbServer(settings.host,connection.DEFAULT_PORT,{}));
var mongodb = require('mongodb');
var server = new mongodb.Server(settings.host,settings.port,{auto_reconnect:true});
var mongodb = new mongodb.Db(settings.db,server,{safe:true});

// db.open(function(err,db){
// 	if(!err){
// 		console.log("mongodb connect success");
// 		module.exports = db;
// 	} else {
// 		console.log("mongodb connect error: %s", err);
// 	}
// });

var MongodbUtils = function (){
	function connectDb(callback){
		
	};

	function connectCollection(tableName, callback){
		mongodb.open(function(err, db){
			if(err){
				return callback(err);
			}

			db.collection(tableName, function(err,collection){
				if(err){
					mongodb.close();
					return callback(err);
				}
				callback(err,collection);
			});
		});
	};

	/**
	 * 查询指定表名中符合条件的一条记录
	 * @param  {string}   tableName 表名
	 * @param  {json对象}   model     存放查询条件的实体对象
	 * @param  {Function} callback  查询完成后的回调函数
	 * @return {[type]}             [description]
	 */
	function queryOne(tableName, model, callback){
		connectCollection(tableName, function(err,collection){
			collection.findOne(model, function(err, model){
				mongodb.close();
				callback(err, model);
			});
		});
	};

	/**
	 * [insert description]
	 * @param  {[type]}   tableName [description]
	 * @param  {[type]}   model     [description]
	 * @param  {Function} callback  [description]
	 * @return {[type]}             [description]
	 */
	function insert(tableName, model, callback){
		connectCollection(tableName, function(err,collection){
			collection.insert(model, {safe:true}, function(err, model){
				mongodb.close();
				callback(err, model);
			});
		});
	};

	return{
		insert:insert,
		queryOne:queryOne
	}
}


var mongodbUtils = new MongodbUtils();

exports.insert = mongodbUtils.insert;
exports.queryOne = mongodbUtils.queryOne;