//include model
var userdetails = require('../models/userDetails');

//get all user list.
exports.getUserList = function(req,res){

	userdetails.find({},function(err,data){

		if(err)
		{
			return res.send({"message" : err,"msgTye" : "E"}).status(500);		
		}
		else
		{
			if(data.length == 0)
			{
				return res.send({message : "No data available!!!",msgtype : "S",Data:data}).status(200);
			}
			else
			{
				return res.send({message : "Data retrive successfully !!!",msgtype : "S",Data:data}).status(200);
			}
		}

	});
}

//update a user record.
exports.updateUser = function(req,res){

	var _userid = req.params.userid;

	var selection = {userid : _userid};
	var projection =Object.assign(req.body,{modifieddate : Date.now()});
	var option = {new : true};

	userdetails.findOneAndUpdate(selection,projection,option,function(err,data){

		if(err)
		{
			return res.send({"message" : err,"msgTye" : "E"}).status(500);	
		}
		else
		{
			console.log("after userdetail updated : "+JSON.stringify(data));
			return res.send({message : "User Updated Successfully!!!",msgTye : "S",Data:data}).status(201);
		}

	});
}

//inactivate the user.
exports.removeUser = function(req,res){

	var _userid = req.params.userid;

	var selection = {userid : _userid};
	var projection = {modifieddate : Date.now(),isdeleted:true};
	var option = {new : true}

	userdetails.findOneAndUpdate(selection,projection,option,function(err,data){

		if(err)
		{
			return res.send({"message" : err,"msgTye" : "E"}).status(500);	
		}
		else
		{
			console.log("after user inactivated : "+JSON.stringify(data));
			return res.send({message : "User inactivated successfully!!!",msgTye : "S",Data:data}).status(201);
		}

	});
}