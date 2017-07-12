//included userDetails model
var userdetails = require('../models/userDetails');

//included jsonwebtoken library
var jwt =require('jsonwebtoken');

//included configuration file
var config = require('../configurations/config');

//include passwordvalidation utility file
var passwordUtility = require('../utility/passwordValidation.js');

//include check type for validating value
var check = require('check-types');

//include email validator library
var emailCheck = require("email-validator");

//use to register new user
exports.registration = function(req,res){

	var hashData = passwordUtility.getSaltHashPassword(req.body.password);

	var rawresult1 = req.body;
	var  rawresult2 = {
		salt : hashData.salt,
		password : hashData.passwordHash,
	}

	var finalData = Object.assign(rawresult1,rawresult2);

	var userDetails = new userdetails(finalData);

	userDetails.save(function(err,data){

		if(err)
		{
			console.log("Save function call : "+err);
			return res.send({"message" : err.errors,"msgTye" : "E"}).status(500);
		}
		else
		{
			return res.send({message : "User Created Successfully!!!",msgTye : "S"}).status(201);
		}

	});
}

//use to login user
exports.login = function(req,res){

	var _emailid = req.body.emailid;
	var _password = req.body.password;

	if(!(emailCheck.validate(_emailid)))
	{
		return res.send({meassage:"invalid emailid",msgtype:"E"}).status(400);
	}
	if(check.null(_password) || check.undefined(_password) ||check.emptyString(_password))
	{
		return res.send({meassage:"Invalid password!!!",msgtype:"E"}).status(400);
	}


	userdetails.findOne({
		emailid : req.body.emailid},function(err,data){

		if(err) throw err;

		if(!data)
		{
			return res.send({message:"such user does not exists!",msgtype:"E"}).status(401);
		}
		else
		{
			if(passwordUtility.validatePassword(_password,data.salt,data.password))
			{

				var token = jwt.sign(data,config.tokenconfig.secret,{expiresIn: '1h'});

				return res.send({message:"Login Succesfull!",msgtype:"S",tokenkey:token}).status(200);
			}	
			else
			{
				return res.send({message:"such user does not exists!",msgtype:"E"}).status(401);
			}
		}	

	})

}