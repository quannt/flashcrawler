var sleep = function(){
	var sleepTime = getRandomIntInclusive(3000, 5000);
	setTimeout(function(){
		console.log("Sleeping for " + sleepTime + " ms");
	},sleepTime);
};


function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.sleep = sleep;