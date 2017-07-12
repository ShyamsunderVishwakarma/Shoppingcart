//include mongoose library
var mongoose = require('mongoose');

//instantiate Schema
var Schema = mongoose.Schema;

//include mongoose field auto increament library
var autoIncrement = require('mongoose-auto-increment');

//initialize autoincrement 
autoIncrement.initialize(mongoose.connection);

//Schema Definition
var userDetailsSchema = new Schema({
	userid : {type : Number,unique : true},
	firstname : {
					type : String ,
					required : [true,'FirstName is Madatory'],
					match:[/^[A-Za-z]+$/,'Invalid firstname']
				},
	lastname : 	{
					type : String,
					match:[/^[ A-Za-z]+$/,'Invalid lastname']
				},
	mobileno : 	{
					type : String,
					required :true,
					match:[/^[789]\d{9}$/,'Invalid mobileno']
				},
	addressline1 : {type : String },
	emailid : 	{
					type : String,
					required : true,
					unique:true,
					match:[/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Invalid email address']
				},
	password :{type : String,required : true},
	salt : {type  :String ,required : true},
	accounttype : {
						type : String,
						required : true,
						enum :['admin','supplier','customer']
				   },
	createddate : {type : Date, default: Date.now},
	modifiedby : {type : String,default:null},
	modifieddate : {type : Date,default:null},
	isdeleted : {type : Boolean,default : false},

});

//assign field to autoincrement
userDetailsSchema.plugin(autoIncrement.plugin, {
    model: 'userdetails',
    field: 'userid',
    startAt: 1001,
    incrementBy: 1
});

//create model
var userdetails = mongoose.model('userdetails',userDetailsSchema);

//export model
module.exports = userdetails;