//include model
var userdetails = require('../models/userDetails');
var productdetails = require('../models/productDetails');

//add product list.
exports.addProduct = function(req,res){

	var finalData = req.body;

	var productDetails = new productdetails(finalData);

	productDetails.save(function(err,data){

		if(err)
		{
			console.log("Save function call : "+err);
			return res.send({"message" : err.errors,"msgTye" : "E"}).status(500);
		}
		else
		{
			return res.send({message : "Product Created Successfully!!!",msgTye : "S"}).status(201);
		}

	});

}

//remove a product.
exports.removeProduct = function(req,res){

	var _productid = req.params.productid;

	var selection = {productid : _productid};
	var projection ={modifieddate : Date.now(),isactive:false};
	var option = {new : true}

	productdetails.findOneAndUpdate(selection,projection,option,function(err,data){

		if(err)
		{
			return res.send({"message" : err,"msgTye" : "E"}).status(500);	
		}
		else
		{
			console.log("after product inactivated : "+JSON.stringify(data));
			return res.send({message : "Product Inactivated!!!",msgTye : "S",Data:data}).status(201);
		}

	})

}

//update a product.
exports.updateProduct = function(req,res){

	var _productid = req.params.productid;

	var selection = {productid : _productid};
	var projection =Object.assign(req.body,{modifieddate : Date.now()});
	console.log("Updated Product : " + JSON.stringify(projection));
	var option = {new : true};

	productdetails.findOneAndUpdate(selection,projection,option,function(err,data){

		if(err)
		{
			return res.send({"message" : err,"msgTye" : "E"}).status(500);	
		}
		else
		{
			console.log("after product updated : "+JSON.stringify(data));
			return res.send({message : "Product Updated Successfully!!!",msgTye : "S",Data:data}).status(201);
		}

	});
}

//get all products list
exports.getAllProducts = function(req,res){

	productdetails.find({},function(err,data){

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