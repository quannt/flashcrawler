var Xray = require('x-ray');
var reader = require('./reader');
var moment = require('moment');

var x = Xray();

var url = "http://data.nowgoal.com/1x2/bet007history.htm?id=&company=&matchdate=";
var date = moment("2015-12-13");
var fileName = "./data/" + date.format("YYYY_MM_DD") + '.json';


x(url + date.format("YYYY-MM-DD"), 'tr', [['td']])(function(err,arr){
	if (err){
		console.log("Error occured for " + date.format("YYYY-MM-DD"), err);
	}
	reader.processRow(arr, date);
});