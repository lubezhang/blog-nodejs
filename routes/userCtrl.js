
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.show = function(req, res){
	res.send("username is " + req.params.username);
};