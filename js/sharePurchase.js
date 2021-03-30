var funds = [Array(9).fill(0)];
var totalInvested = 0;
var totalCash = 0;

function addFund() {
    funds.push(Array(9).fill(0));
    addCard();
}
function addCard() {
    document.getElementById("accountCardsWrapper").innerHTML += "<div class='card investmentCard'><div class='blockDisplay'><div>Ticker:</div><input id='tickerInput" + (funds.length-1) + "' onchange='updateTickerSharesPrice(" + (funds.length-1) + ")'></input></div><div class='blockDisplay'><div>Shares Owned:</div><input id='sharesOwnedInput" + (funds.length-1) + "' type='Number' min='0' value='0.00' onchange='updateTickerSharesPrice(" + (funds.length-1) + ")'></input></div><div class='blockDisplay'><div>Share Price:</div>$<input id='sharePriceInput" + (funds.length-1) + "' type='Number' min='0' value='0.00' onchange='updateTickerSharesPrice(" + (funds.length-1) + ")'></input></div><div class='blockDisplay'><div id='accountTotalValue" + (funds.length-1) + "'>Total Value: $0.00</div></div><div class='blockDisplay'><div id='accountPercent" + (funds.length-1) + "'>0.00%</div></div><div class='investmentBreakdown'><div class='blockDisplay'><div>To Invest:</div>$<input id='accountToInvest" + (funds.length-1) + "' type='Number' min='0' value='0.00' onChange='updateTickerSharesPrice(" + (funds.length-1) + ")'></input></div><div>-2%: <div class='inline' id='twoPercentShares" + (funds.length-1) + "'>0 </div>@ $<div class='inline' id='twoPercent" + (funds.length-1) + "'>0.00</div></div><div>-5%: <div class='inline' id='fivePercentShares" + (funds.length-1) + "'>0 </div>@ $<div class='inline' id='fivePercent" + (funds.length-1) + "'>0.00</div></div><div>-7%: <div class='inline' id='sevenPercentShares" + (funds.length-1) + "'>0 </div>@ $<div class='inline' id='sevenPercent" + (funds.length-1) + "'>0.00</div></div><div>-10%: <div class='inline' id='tenPercentShares" + (funds.length-1) + "'>0 </div>@ $<div class='inline' id='tenPercent" + (funds.length-1) + "'>0.00</div></div><div class='spacer'></div><div></div></div></div>";
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
    
    
    for (var i = 0; i < funds.length; i++) {
        var percent = (funds[i][3] / (totalInvested + totalCash)) * 100;
        if (isNaN(percent)) {
            percent = 0;
        }
        document.getElementById("accountPercent" + i).innerHTML = percent.toFixed(2) + "%";
    }
    funds[index][5] = funds[index][2] * .98;
    document.getElementById("twoPercent" + index).innerHTML = funds[index][5].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    funds[index][6] = funds[index][2] * .95;
    document.getElementById("fivePercent" + index).innerHTML = funds[index][6].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    funds[index][7] = funds[index][2] * .93;
    document.getElementById("sevenPercent" + index).innerHTML = funds[index][7].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    funds[index][8] = funds[index][2] * .90;
    document.getElementById("tenPercent" + index).innerHTML = funds[index][8].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    updateToInvestValue(index);
    calculateTotalInvestedAmount();
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
        document.getElementById("twoPercentShares" + index).innerHTML = Math.floor(funds[index][4] / funds[index][5]);
    }
    if (funds[index][6] > 0) {
        document.getElementById("fivePercentShares" + index).innerHTML = Math.floor(funds[index][4] / funds[index][6]);
    }
    if (funds[index][7] > 0) {
        document.getElementById("sevenPercentShares" + index).innerHTML = Math.floor(funds[index][4] / funds[index][7]);
    }
    if (funds[index][8] > 0) {
        document.getElementById("tenPercentShares" + index).innerHTML = Math.floor(funds[index][4] / funds[index][8]);
    }
}
