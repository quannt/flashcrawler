function addRow(sheet, match, amountIncreased)
{
   sheet.addRow(
   	{
   		Date : match.date.format("YYYY-MM-DD"),
   		League: match.league,
		Home: match.homeTeam,
		OpeningHW: match.openingHomeWins,
		OpeningD: match.openingDraw,
		OpeningAW: match.openingAwayWins ,
		OpeningHWR: match.openingHwr,
		OpeningDR: match.openingDr,
		OpeningAWR: match.openingAwr,
		OpeningReturn : match.openingReturnPercentage ,
		ClosingHW: match.closingHomeWins ,
		ClosingD: match.closingDraw,
		ClosingAW: match.closingAwayWins,
		ClosingHWR: match.closingHwr, 
		ClosingDR: match.closingDr ,
		ClosingAWR: match.closingAwr,
		ClosingReturn: match.closingReturnPercentage ,
		Away: match.awayTeam ,
		HT: match.halfTimeScore,
		FT: match.fulleTimeScore,
		Increased:amountIncreased
   	});

}

exports.addRow = addRow;