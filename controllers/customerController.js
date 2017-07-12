//include model
var salesdetails = require('../models/salesDetails');
var helpdesk = require('../models/helpdeskDetails');

//add Item to cart
exports.addItem = function(req,res){

}

//create ticket and assign to helpdesk
exports.raiseTicket = function(req,res){

	console.log("Raise Ticket");
	var finalData = req.body;

	var helpDesk = new helpdesk(finalData);

	helpDesk.save(function(err,data){

		if(err)
		{
			console.log("Save function call : "+err);
			return res.send({"message" : err.errors,"msgTye" : "E"}).status(500);
		}
		else
		{
			return res.send({message : "Ticket Created Successfully!!!",msgTye : "S",Data:data}).status(201);
		}

	});
}