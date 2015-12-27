var Excel = require("exceljs");
var writer =require("./writer");
var filename = "./result/result.xlsx";

function processRow(rows){

	var workbook = new Excel.Workbook();
	var sheet = workbook.addWorksheet("NowGoal");

	sheet.columns = [
    { header: "League", key: "League"},
    { header: "Home", key: "Home"},
    { header: "Opening HW", key: "OpeningHW"},
    { header: "Opening D", key: "OpeningD"},
    { header: "Opening AW", key: "OpeningAW"},
    { header: "Opening HWR", key: "OpeningHWR"},
    { header: "Opening DR", key: "OpeningDR"},
    { header: "Opening AWR", key: "OpeningAWR"},
    { header: "Opening Return", key: "OpeningReturn"},
    { header: "Closing HW", key: "ClosingHW"},
    { header: "Closing D", key: "ClosingD"},
    { header: "Closing AW", key: "ClosingAW"},
    { header: "Closing HWR", key: "ClosingHWR"},
    { header: "Closing DR", key: "ClosingDR"},
    { header: "Closing AWR", key: "ClosingAWR"},
    { header: "Closing Return", key: "ClosingReturn"},
    { header: "Away", key: "Away"},
    { header: "HT", key: "HT"},
    { header: "FT", key: "FT"},
    { header: "Increased", key: "Increased"}
	];



	const firstRowArrayLength = 14;
	const secondRowArrayLength = 7;
	var isFirstRow = false;

	// start at 1 to skip the header row
	for (var i = 1; i <= rows.length - 1; i++) 
	{
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

		var league = currentRow[0];
		var homeTeam = currentRow[2];
		var openingHomeWins = currentRow[3];
		var openingDraw = currentRow[4];
		var openingAwayWins = currentRow[5];
		var openingHwr = currentRow[6];
		var openingDr = currentRow[7];
		var openingAwr = currentRow[8];
		var openingReturnPercentage = currentRow[9];
		var awayTeam = currentRow[10];
		var halfTimeScore = currentRow[11];
		var fulleTimeScore = currentRow[12];


		var closingHomeWins = 0;
		var closingDraw = 0;
		var closingAwayWins = 0;
		var closingHwr = "";
		var closingDr = "";
		var closingAwr = "";
		var closingReturnPercentage = "";

		if (nextRow){
			closingHomeWins = nextRow[0];
			closingDraw = nextRow[1];
			closingAwayWins = nextRow[2];
			closingHwr = nextRow[3];
		    closingDr =  nextRow[4];
		    closingAwr =  nextRow[5];
		    closingReturnPercentage = nextRow[6];
		}

		var match = {};
		match.league = league;
		match.homeTeam = homeTeam;
		match.openingHomeWins = openingHomeWins;
		match.openingDraw = openingDraw;
		match.openingAwayWins = openingAwayWins;
		match.openingHwr = openingHwr;
		match.openingDr = openingDr;
		match.openingAwr = openingAwr;
		match.openingReturnPercentage = openingReturnPercentage;
		match.awayTeam = awayTeam;
		match.halfTimeScore = halfTimeScore;
		match.fulleTimeScore = fulleTimeScore;
		match.closingHomeWins = closingHomeWins;
		match.closingDraw = closingDraw;
		match.closingAwayWins = closingAwayWins;
		match.closingHwr = closingHwr;
		match.closingDr = closingDr;
		match.closingAwr = closingAwr;
		match.closingReturnPercentage = closingReturnPercentage;

		var openingValue = openingHomeWins;
		var closingValue = closingHomeWins; 

		if (openingAwayWins < openingHomeWins)
		{
			openingValue = openingAwayWins;
			closingValue = closingAwayWins;
		}

		var amountIncreased = closingValue - openingValue;

		if (openingValue < 1.1)
		{
			if ( amountIncreased >= 0.05 )
			{
				 writer.addRow(sheet, match, amountIncreased);
			} 
		}

		if (openingValue >= 1.1 && openingValue < 1.3)
		{
			if ( amountIncreased >= 0.10 )
			{
				writer.addRow(sheet, match, amountIncreased);
			} 
		}

		if (openingValue >= 1.3 && openingValue < 1.5)
		{
			if ( amountIncreased >= 0.10 )
			{
				 writer.addRow(sheet, match, amountIncreased);
			} 
		}

		if (openingValue >= 1.5 && openingValue < 1.9)
		{
			if ( amountIncreased >= 0.15 )
			{
				writer.addRow(sheet, match, amountIncreased);
			} 
		}

		if (openingValue >= 1.9 && openingValue < 2.7)
		{
			if ( amountIncreased >= 0.15 )
			{
				writer.addRow(sheet, match, amountIncreased);
			} 
		}
	}

	workbook.xlsx.writeFile(filename)
    .then(function() {
        console.log("File exported successfully");
    });
}


exports.processRow = processRow;