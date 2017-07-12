//include mongoose library
var mongoose = require('mongoose');

//instantiate Schema
var Schema = mongoose.Schema;

//include mongoose field auto increament library
var autoIncrement = require('mongoose-auto-increment');

//initialize autoincrement
autoIncrement.initialize(mongoose.connection);

//Schema Definition
var helpdeskSchema = new Schema({
	ticketid : {type : Number,unique : true},
	title : {
				type : String,
				required : true,
				match : [/^[A-Za-z0-9. ]*$/,'Invalid Title']
			},
	description : {
						type : String,
						required : true,
						match :[/^[A-Za-z0-9. ]*$/,'Invalid Description']
				  },
	createdby : {type : String},
	createddate : {type : Date, default : Date.now},
	modifiedby : {type : String,default : null},
	modifieddate :{type : Date, default : null},
	iscompleted : {type : Boolean,default : false}
});

//assign field to autoincrement
helpdeskSchema.plugin(autoIncrement.plugin, {
    model: 'helpdesk',
    field: 'ticketid',
    startAt: 3001,
    incrementBy: 1
});

//create model
var helpdesk = mongoose.model('helpdesk',helpdeskSchema);

//export model
module.exports = helpdesk;