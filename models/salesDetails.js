//include mongoose library
var mongoose = require('mongoose');

//instantiate Schema
var Schema = mongoose.Schema;

//include mongoose field auto increament library
var autoIncrement = require('mongoose-auto-increment');

//initialize autoincrement
autoIncrement.initialize(mongoose.connection);

//Schema Definition
var salesDetailsSchema = new Schema({
	transactionid : {type : Number,unique : true},
	userid : {type : String, required : true},
	items :[
			{
				productid : {type : String, requried  :true},
				quantity : {type : Number, requried : true,min : 1},
				price : {type : Number, required : true},
			}
		   ],
	createdby : {type : String, required : true},
	createddate : {type : Date,default : Date.now}
});

// Check for Zero or Empty item
salesDetailsSchema.path('items').validate(function(items){

	if(!items)
	{
		return false;
	}
	else if(items.length === 0)
	{
		return false;
	}

	return true;
},'Atleast one item requried to add to cart!!!')


//assign field to autoincrement
salesDetailsSchema.plugin(autoIncrement.plugin, {
    model: 'salesdetails',
    field: 'transactionid',
    startAt: 4001,
    incrementBy: 1
});

//create model
var salesdetails = mongoose.model('salesdetails',salesDetailsSchema);

//export model
module.exports = salesdetails;