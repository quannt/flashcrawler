
var Xray = require('x-ray');
var reader = require('./reader');
var moment = require('moment');
var helper = require("./helper");
var Excel = require("exceljs");


var x = Xray();

var url = "http://data.nowgoal.com/1x2/bet007history.htm?id=&company=&matchdate=";


var startDate= moment("2014-12-31");
var endDate = moment("2016-01-01");
var usingDate = moment("2015-01-01");


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
	helper.sleep();
	x(url + usingDate.format("YYYY-MM-DD"), 'tr', [['td']])(rowProcessedCallback) ;
	usingDate.add(1,'days');
	};







