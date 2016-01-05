
var Xray = require('x-ray');
var reader = require('./reader');
var moment = require('moment');
var helper = require("./helper");
var Batch = require('batch')
  , batch = new Batch;


var x = Xray();

var url = "http://data.nowgoal.com/1x2/bet007history.htm?id=&company=&matchdate=";


var startDate= moment("2014-11-24");
var endDate = moment("2015-12-26");
var usingDate = moment("2014-11-25");


var fileName = "./data/" + endDate.format("YYYY_MM_DD") + '.json';

var nowGoalWorkbook = reader.createNowGoalOutputTemplate();

var rowProcessedCallback = function(err,arr){
	if (err){
		console.log("Error occured for " + usingDate.format("YYYY-MM-DD"), err);
	}
	nowGoalWorkbook = reader.processRow(nowGoalWorkbook, arr);
};


while(usingDate.isBetween(startDate, endDate)){
	console.log("Adding " + usingDate.format("YYYY/MM/DD") + " to the q");
	helper.sleep(2000);
	x(url + usingDate.format("YYYY-MM-DD"), 'tr', [['td']])(rowProcessedCallback) ;
	usingDate.add(1,'days');
};




