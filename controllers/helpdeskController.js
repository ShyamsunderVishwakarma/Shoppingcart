//include model
var userdetails = require('../models/userDetails');
var helpdesk = require('../models/helpdeskDetails');

//get all open ticket list
exports.getAllTickets = function(req,res){

	helpdesk.find({},function(err,data){

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

//update ticket
exports.updateTicket = function(req,res){

	var _ticketid = req.params.ticketid;

	var selection = {ticketid : _ticketid};
	var projection = Object.assign(req.body,{modifieddate : Date.now()});
	var option = {new : true};

	helpdesk.findOneAndUpdate(selection,projection,option,function(err,data){

		if(err)
		{
			return res.send({"message" : err,"msgTye" : "E"}).status(500);	
		}
		else
		{
			console.log("After Ticket updated : "+JSON.stringify(data));
			return res.send({message : "Ticket Updated Successfully!!!",msgTye : "S",Data:data}).status(201);
		}

	});
}