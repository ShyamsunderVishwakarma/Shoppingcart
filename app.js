var express = require('express');
var app = express();

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var bodyParser = require('body-parser');


var config = require('./configurations/config');
var route = require('./routes/commonRoute');

//connect to db
mongoose.Promise = global.Promise;
var connection = mongoose.connect(config.mongoconfig.database);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use('/',route);


//start server
var server = app.listen('8080',function(){
	console.log("server started at port 8080");
});
