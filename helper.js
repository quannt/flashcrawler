var sleep = function(time){
	setTimeout(function(){
		console.log("Sleeping for " + time + " ms");
	},time);
};


exports.sleep = sleep;