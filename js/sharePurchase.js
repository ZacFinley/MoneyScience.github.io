var funds = [Array(8).fill(0)];
var totalInvested = 0;
var totalCash = 0;

function addFund() {
    funds.push(Array(8).fill(0));
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
    calculateTotalInvestedAmount();
    var percent = (funds[index][3] / (totalInvested + totalCash)) * 100;
    if (isNaN(percent)) {
        percent = 0;
    }
    document.getElementById("accountPercent" + index).innerHTML = percent.toFixed(2) + "%";
    funds[index][4] = funds[index][2] * .98;
    document.getElementById("twoPercent0").innerHTML = funds[index][4].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    funds[index][5] = funds[index][2] * .95;
    document.getElementById("fivePercent0").innerHTML = funds[index][5].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    funds[index][6] = funds[index][2] * .93;
    document.getElementById("sevenPercent0").innerHTML = funds[index][6].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    funds[index][7] = funds[index][2] * .90;
    document.getElementById("tenPercent0").innerHTML = funds[index][7].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function updateCardOutput(index) {
    document.getElementById("accountTotalValue" + index).innerHTML = "Total Value: $" + funds[index][3].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function calculateTotalInvestedAmount() {
    totalInvested = 0;
    for (var i = 0; i < funds.length; i++) {
        totalInvested += funds[i][3];
    }
    document.getElementById("investedTotal").innerHTML = "Invested Total: $" + totalInvested.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("accountTotal").innerHTML = "Account Total: $" + ((totalInvested + totalCash).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
}
