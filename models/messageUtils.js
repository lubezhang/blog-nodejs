function createMsg(status, msg, data){
	return{
		status:status,
		message:msg || "",
		data:data || {}
	}
};

exports.success = function(res, message){
	return res.jsonp(createMsg(true,message,{}));
}

exports.failure = function(res, message){
	return res.jsonp(createMsg(false,message,{}));
}