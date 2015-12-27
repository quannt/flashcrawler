
var Xray = require('x-ray');
var reader = require('./reader');
var moment = require('moment');
var Batch = require('batch')
  , batch = new Batch;


var x = Xray();

var url = "http://data.nowgoal.com/1x2/bet007history.htm?id=&company=&matchdate=";


var startDate= moment("2015-12-24");
var endDate = moment("2015-12-28");
var usingDate = moment("2015-12-25");

var fileName = "./data/" + endDate.format("YYYY_MM_DD") + '.json';

var nowGoalWorkbook = reader.createNowGoalOutputTemplate();

var rowProcessedCallback = function(err,arr){
	if (err){
		console.log("Error occured for " + usingDate.format("YYYY-MM-DD"), err);
	}
	nowGoalWorkbook = reader.processRow(nowGoalWorkbook, arr);
};


while(usingDate.isBetween(startDate, endDate)){
	console.log("adding " + usingDate.format("YYYY-MM-DD") + " to the q");
	batch.push( x(url + usingDate.format("YYYY-MM-DD"), 'tr', [['td']])(rowProcessedCallback) );
	usingDate.add(1,'days');
}



batch.concurrency(1);

batch.end(function(err){
	if (err){
		console.log(err);
	}
	console.log("batch is finished");
	reader.saveNowGoalOutput(nowGoalWorkbook);
});



