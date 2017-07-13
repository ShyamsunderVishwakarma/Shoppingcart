//include model
var salesdetails = require('../models/salesDetails');
var helpdesk = require('../models/helpdeskDetails');
var productdetails = require('../models/productDetails');

//add Item to cart
exports.addItem = function(req,res){

	var finalData = req.body;

	var salesDetails = new salesdetails(finalData);

	//on Save Call
	salesDetails.save(function(err,data){
		
		if(err)
		{
			return res.send({"message" : err,"msgType" : "E"}).status(500);
		}
		else
		{
			res.send({message : "Item added Successfully!!!",msgType : "S",Data:data}).status(201);
			StockCheck(data);
		}

	});
}

function StockCheck(finaldata)
{
	if(finaldata.items.length != 0)
	{	
		for (var i = 0; i < finaldata.items.length; i++) {
				
			var _productid = finaldata.items[i].productid;
			var _quantity = finaldata.items[i].quantity;
			getStockQuantity(_productid,_quantity);	
		}
	}
	return;
}

function getStockQuantity(_productid,_quantity)
{
	productdetails.findOne({productid : _productid},function(err,data){
		
		console.log("In FindOne : " + data)
		if(err)
		{	
			console.log("findone Err :" + err);
			return {"message" : err,"msgType" : "E"};
		}
		else
		{
			var availableQuantity = data.quantity;
			updateStock(_productid,_quantity,availableQuantity);
			return;
		}
	});	
}

function updateStock(_productid,_quantity,availableQuantity)
{
	var updateQuantity = availableQuantity - _quantity;

	//findOneAndUpdate for productit
	var selection = {productid : _productid};
	var projection ={quantity : updateQuantity,modifieddate : Date.now()};
	var option = {new : true}

	productdetails.findOneAndUpdate(selection,projection,option,function(err,data){
	
		if(err)
		{
			return {"message" : err,"msgType" : "E"};	
		}
		else
		
			return {message : "Product stock updated!!!",msgType : "S",Data:data};
		}
	});
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
			return res.send({"message" : err.errors,"msgType" : "E"}).status(500);
		}
		else
		{
			return res.send({message : "Ticket Created Successfully!!!",msgType : "S",Data:data}).status(201);
		}

	});
}