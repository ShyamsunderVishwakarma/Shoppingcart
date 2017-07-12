//included jsonwebtoken library
var jwt =require('jsonwebtoken');

//included configuration file
var config = require('../configurations/config');

//middleware to verfiy the token
var authenticateToken = function(req,res,next)
{
	var token = req.body.token || req.headers['token-key'];

	if(token)
	{
		jwt.verify(token,config.tokenconfig.secret,function(err,decodedToken){

			if(err)
			{
				res.send({message : "invalid token !!!",msgtype : "E"}).status(401);
			}
			else
			{
				console.log("token matched!!!");
				next();
			}

		});
	}
	else
	{
		res.send({message : "invalid user!!!",msgtype : "E"}).status(401);
	}

}

module.exports = authenticateToken;