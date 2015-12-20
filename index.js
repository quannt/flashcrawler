var Xray = require('x-ray');
var x = Xray();

var url = "http://data.nowgoal.com/1x2/bet007history.htm?id=&company=&matchdate=";
var date = "2015-12-13";
var fileName = date.replace(/-/g,'_') + '.json';

var selector =  "tr";

x(url + date, 'tr', [['td']])(function(err,arr){
	if (err){
		console.log("Error occured for " + date, err);
	}
	console.log(arr);
})
.write(fileName);