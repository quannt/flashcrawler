function processRow(rows){

	const firstRowArrayLength = 14;
	const secondRowArrayLength = 7;
	var isFirstRow = false;

	// start at 1 to skip the header row
	for (var i = 1; i <= rows.length - 1; i++) {
		var currentRow = rows[i];
		var nextRow = {};

		if (currentRow.length == firstRowArrayLength){
			isFirstRow = true;
			nextRow = rows[i+1];
		}
		else{
			isFirstRow = false;
		}

		if (!isFirstRow){
			continue;
		}

		var openingHomeWins = currentRow[3];
		var openingDraw = currentRow[4];
		var openingAwayWins = currentRow[5];

		console.log("openingHomeWins:" + openingHomeWins);
		console.log("openingDraw:" + openingDraw);
		console.log("openingAwayWins" + openingAwayWins)


		if (nextRow){
			var closingHomeWins = nextRow[0];
			var closingDraw = nextRow[1];
			var closingAwayWins = nextRow[2];

			console.log("closingHomeWins:" + closingHomeWins);
			console.log("closingDraw:" + closingDraw);
			console.log("closingAwayWins" + closingAwayWins)
		}
	}

}


exports.processRow = processRow;