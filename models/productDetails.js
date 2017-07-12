//include mongoose library
var mongoose = require('mongoose');

//instantiate Schema
var Schema = mongoose.Schema;

//include mongoose field auto increament library
var autoIncrement = require('mongoose-auto-increment');

//initialize autoincrement
autoIncrement.initialize(mongoose.connection);

//Schema Definition
var productDetailsSchema = new Schema({

	productid :{type:Number,unique : true},
	supplierid : {type : String,required : true},
	productname : {
						type : String,
						required : true,
						match :[/^[A-Za-z0-9]+$/,'Invalid productname']
					},
	price : {type : Number,required :true},
	quantity : {type : Number, required : true},
	createdby : { type : String,default : null},
	createddate :{type : Date,default : Date.now},
	modifiedby :{type : String,default : null},
	modifieddate :{type: Date,default : null},
	isactive : {type : Boolean,default : true}
});

//assign field to autoincrement
productDetailsSchema.plugin(autoIncrement.plugin, {
    model: 'productdetails',
    field: 'productid',
    startAt: 2001,
    incrementBy: 1
});

//create model
var productdetails = mongoose.model('productdetails',productDetailsSchema);

//export model
module.exports = productdetails;