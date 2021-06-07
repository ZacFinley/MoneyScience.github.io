var funds = [Array(9).fill(0)];
funds[0][0] = "";
var totalInvested = 0;
var totalCash = 0;

var percentArray = [["halfPercentShares", "halfPercent", "0.5",.995],
                 ["onePercentShares", "onePercent", "1",.99],
                 ["twoPercentShares", "twoPercent", "2",.98],
                 ["threePercentShares", "threePercent", "3",.97]];

function addFund() {
    funds.push(Array(9).fill(0));
    funds[funds.length-1][0] = "";
    showCards();
}
function showCards() {
    document.getElementById("accountCardsWrapper").innerHTML = "";
    for (var i = 0; i < funds.length; i++) {
        document.getElementById("accountCardsWrapper").innerHTML += "<div class='card investmentCard'><div class='blockDisplay'><div>Ticker:</div><input id='tickerInput" + i + "' onchange='updateTickerSharesPrice(" + i + ")' value='" + funds[i][0] + "'></input></div><div class='blockDisplay'><div>Shares Owned:</div><input id='sharesOwnedInput" + i + "' type='Number' min='0' value='" + funds[i][1] + "' onchange='updateTickerSharesPrice(" + i + ")'></input></div><div class='blockDisplay'><div>Share Price:</div>$<input id='sharePriceInput" + i + "' type='Number' min='0' value='" + parseFloat(funds[i][2].toFixed(2)) + "' onchange='updateTickerSharesPrice(" + i + ")'></input></div><div class='blockDisplay'><div id='accountTotalValue" + i + "'>Total Value: $" + parseFloat(funds[i][3]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</div></div><div class='blockDisplay'><div id='accountPercent" + i + "'>0.00%</div></div><div class='investmentBreakdown'><div class='blockDisplay'><div>To Invest:</div>$<input id='accountToInvest" + i + "' type='Number' min='0' value='" + parseFloat(funds[i][4].toFixed(2)) + "' onChange='updateTickerSharesPrice(" + i + ")'></input></div><div>-" + percentArray[0][2] + "%: <div class='inline' id='" + percentArray[0][0] + i + "'>0 </div>@ $<div class='inline' id='" + percentArray[0][1] + i + "'>" + parseFloat(funds[i][5]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</div></div><div>-" + percentArray[1][2] + "%: <div class='inline' id='" + percentArray[1][0] + i + "'>0 </div>@ $<div class='inline' id='" + percentArray[1][1] + i + "'>" + parseFloat(funds[i][6]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</div></div><div>-" + percentArray[2][2] + "%: <div class='inline' id='" + percentArray[2][0] + i + "'>0 </div>@ $<div class='inline' id='" + percentArray[2][1] + i + "'>" + parseFloat(funds[i][7]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</div></div><div>-" + percentArray[3][2] + "%: <div class='inline' id='" + percentArray[3][0] + i + "'>0 </div>@ $<div class='inline' id='" + percentArray[3][1] + i + "'>" + parseFloat(funds[i][8]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</div></div><div class='spacer'></div><div></div></div></div>";
    }
    for (var j = 0; j < funds.length; j++) {
        updateTickerSharesPrice(j);
    }
}

function updateTickerSharesPrice(index) {
    funds[index][0] = document.getElementById("tickerInput" + index).value;
    funds[index][1] = parseFloat(document.getElementById("sharesOwnedInput" + index).value);
    if (isNaN(funds[index][1])) {
        funds[index][1] = 0;
    }
    funds[index][2] = parseFloat(document.getElementById("sharePriceInput" + index).value);
    if (isNaN(funds[index][2])) {
        funds[index][2] = 0;
    }
    funds[index][3] = funds[index][1] * funds[index][2];
    updateCardOutput(index);
    
    
    funds[index][5] = funds[index][2] * percentArray[0][3];
    document.getElementById(percentArray[0][1] + index).innerHTML = funds[index][5].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    funds[index][6] = funds[index][2] * percentArray[1][3];
    document.getElementById(percentArray[1][1] + index).innerHTML = funds[index][6].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    funds[index][7] = funds[index][2] * percentArray[2][3];
    document.getElementById(percentArray[2][1] + index).innerHTML = funds[index][7].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    funds[index][8] = funds[index][2] * percentArray[3][3];
    document.getElementById(percentArray[3][1] + index).innerHTML = funds[index][8].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    updateToInvestValue(index);
    calculateTotalInvestedAmount();
    
    for (var i = 0; i < funds.length; i++) {
        var percent = (funds[i][3] / (totalInvested + totalCash)) * 100;
        if (isNaN(percent)) {
            percent = 0;
        }
        document.getElementById("accountPercent" + i).innerHTML = percent.toFixed(2) + "%";
    }
}

function updateCardOutput(index) {
    document.getElementById("accountTotalValue" + index).innerHTML = "Total Value: $" + funds[index][3].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function calculateTotalInvestedAmount() {
    totalInvested = 0;
    totalCash = 0;
    for (var i = 0; i < funds.length; i++) {
        totalInvested += funds[i][3];
        totalCash += funds[i][4];
    }
    document.getElementById("cashTotal").innerHTML = "Cash Total: $" + totalCash.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("investedTotal").innerHTML = "Invested Total: $" + totalInvested.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("accountTotal").innerHTML = "Account Total: $" + ((totalInvested + totalCash).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
}

function updateToInvestValue(index) {
    funds[index][4] = parseFloat(document.getElementById("accountToInvest" + index).value);
    if (funds[index][5] > 0) {
        document.getElementById(percentArray[0][0] + index).innerHTML = Math.floor(funds[index][4] / funds[index][5]);
    }
    if (funds[index][6] > 0) {
        document.getElementById(percentArray[1][0] + index).innerHTML = Math.floor(funds[index][4] / funds[index][6]);
    }
    if (funds[index][7] > 0) {
        document.getElementById(percentArray[2][0] + index).innerHTML = Math.floor(funds[index][4] / funds[index][7]);
    }
    if (funds[index][8] > 0) {
        document.getElementById(percentArray[3][0] + index).innerHTML = Math.floor(funds[index][4] / funds[index][8]);
    }
}
