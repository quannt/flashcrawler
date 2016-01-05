var reader = require('./reader');

var finished = 0;
var goal = 365;

function increaseCounter(){
	finished++;
}

function setGoal(newGoal){
	goal = newGoal;
}

function save(nowGoalWorkbook){
	console.log("Finished " + finished + " out of " + goal);
	if (finished == goal)
	{
		reader.saveNowGoalOutput(nowGoalWorkbook);
	}
}


exports.save = save;
exports.increaseCounter = increaseCounter;
exports.setGoal = setGoal;