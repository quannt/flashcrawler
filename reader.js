var Excel = require("exceljs");
var writer =require("./writer");
var filename = "./result/result.xlsx";


function createNowGoalOutputTemplate(){
	var workbook = new Excel.Workbook();
	var rule1Sheet = workbook.addWorksheet("NowGoalRule1");
	var rule2Sheet = workbook.addWorksheet("NowGoalRule2");
	var rule3Sheet = workbook.addWorksheet("NowGoalRule3");
	var rule4Sheet = workbook.addWorksheet("NowGoalRule4");
	var rule5Sheet = workbook.addWorksheet("NowGoalRule5");
	var rule6Sheet = workbook.addWorksheet("NowGoalRule6");

	var headerColumns = [
	{ header: "Date", key: "Date"},
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

	rule1Sheet.columns = headerColumns;
	rule2Sheet.columns = headerColumns;
	rule3Sheet.columns = headerColumns;
	rule4Sheet.columns = headerColumns;
	rule5Sheet.columns = headerColumns;
	rule6Sheet.columns = headerColumns;

	return workbook;
};

function saveNowGoalOutput(workbook){
	workbook.xlsx.writeFile(filename)
    .then(function() {
        console.log("File exported successfully");
    });
}

function processRow(workbook, rows, date){

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
		var matchDate = cleanDate(currentRow[1]);
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
		match.date = matchDate;
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
				var worksheet = workbook.getWorksheet("NowGoalRule1");
				writer.addRow(worksheet , match, amountIncreased);
			} 
		}

		if (openingValue >= 1.1 && openingValue < 1.3)
		{
			if ( amountIncreased >= 0.10 )
			{
				var worksheet = workbook.getWorksheet("NowGoalRule2");
				writer.addRow(worksheet , match, amountIncreased);
			} 
		}

		if (openingValue >= 1.3 && openingValue < 1.4)
		{
			if ( amountIncreased >= 0.10 )
			{
				var worksheet = workbook.getWorksheet("NowGoalRule3");
				writer.addRow(worksheet , match, amountIncreased);
			} 
		}

		if (openingValue >= 1.4 && openingValue < 1.5)
		{
			if ( amountIncreased >= 0.10 )
			{
				var worksheet = workbook.getWorksheet("NowGoalRule4");
				writer.addRow(worksheet , match, amountIncreased);
			} 
		}

		if (openingValue >= 1.5 && openingValue < 1.9)
		{
			if ( amountIncreased >= 0.15 )
			{
				var worksheet = workbook.getWorksheet("NowGoalRule5");
				writer.addRow(worksheet , match, amountIncreased);
			} 
		}

		if (openingValue >= 1.9 && openingValue < 2.7)
		{
			if ( amountIncreased >= 0.15 )
			{
				var worksheet = workbook.getWorksheet("NowGoalRule6");
				writer.addRow(worksheet , match, amountIncreased);
			} 
		}
	}

	return workbook;
};

function cleanDate(date){
	var newDate = date.replace("showtime(","").replace(")", "").replace("-1", "");

	var newDateArray = newDate.split(',');
	var newCleanDate = newDate;

	if (newDateArray.length === 6){
		newCleanDate = newDateArray[2] + "-" + newDateArray[1] + "-" + newDateArray[0];
	}

	return newCleanDate;
};


exports.processRow = processRow;
exports.createNowGoalOutputTemplate = createNowGoalOutputTemplate;
exports.saveNowGoalOutput = saveNowGoalOutput;