var accounts = [[["",0.0,0.0,0.0,0.0,0.0]]];

function addInvestment(accountId) {
    document.getElementById("account"+accountId).innerHTML += "<tr><td><input id='investment" + accounts[accountId].length + "Ticker' class='tickerInput' onChange='updateInvestmentTicker(" + accountId + "," + accounts[accountId].length + ")'></input></td><td><input id='investment" + accounts[accountId].length + "Shares' class='sharesInput' type='number' onChange='updateInvestmentShares(" + accountId + "," + accounts[accountId].length + ")'></input></td><td><input id='investment" + accounts[accountId].length + "Price' class='priceInput' type='number' onChange='updateInvestmentPrice(" + accountId + "," + accounts[accountId].length + ")'></input></td><td id='investment" + accounts[accountId].length + "CurrentTotal' class='center'>$0.00</td><td><input id='investment" + accounts[accountId].length + "Adjustment' class='adjustmentInput' type='number' value='0' step='.1' onChange='updateInvestmentAdjustment(" + accountId + "," + accounts[accountId].length + ")'></input></td><td id='investment" + accounts[accountId].length + "ProjectedTotal' class='center'>$0.00</td></tr>";
    accounts[accountId].push(["",0.0,0.0,0.0,0.0,0.0]);
}

function updateInvestmentTicker(accountId, investmentId) {
    accounts[accountId][investmentId][0] = document.getElementById("investment" + investmentId + "Ticker").value;
}

function updateInvestmentShares(accountId, investmentId) {
    accounts[accountId][investmentId][1] = parseFloat(document.getElementById("investment" + investmentId + "Shares").value);
    updateInvestmentCurrentPrice(accountId, investmentId);
}

function updateInvestmentPrice(accountId, investmentId) {
    accounts[accountId][investmentId][2] = parseFloat(document.getElementById("investment" + investmentId + "Price").value);
    updateInvestmentCurrentPrice(accountId, investmentId);
}

function updateInvestmentCurrentPrice(accountId, investmentId) {
    accounts[accountId][investmentId][3] = accounts[accountId][investmentId][1] * accounts[accountId][investmentId][2];
    document.getElementById("investment" + investmentId + "CurrentTotal").innerHTML = ("$" + parseFloat(accounts[accountId][investmentId][3]).toFixed(2));
    updateInvestmentProjectedPrice(accountId, investmentId);
    updateAccountTotals(accountId);
}

function updateInvestmentAdjustment(accountId, investmentId) {
    accounts[accountId][investmentId][4] = parseFloat(document.getElementById("investment" + investmentId + "Adjustment").value);
    updateInvestmentProjectedPrice(accountId, investmentId);
}

function updateInvestmentProjectedPrice(accountId, investmentId) {
    accounts[accountId][investmentId][5] = accounts[accountId][investmentId][1] * (accounts[accountId][investmentId][2] * (1 + (accounts[accountId][investmentId][4]/100)));
    document.getElementById("investment" + investmentId + "ProjectedTotal").innerHTML = ("$" + parseFloat(accounts[accountId][investmentId][5]).toFixed(2));
    updateAccountTotals(accountId);
}

function updateAccountTotals(accountId) {
    var currentTotal = 0.0;
    var projectedTotal = 0.0;
    for (var i = 0; i < accounts[accountId].length; i++) {
        currentTotal += accounts[accountId][i][3];
        projectedTotal += accounts[accountId][i][5];
    }
    document.getElementById("account"+accountId+"Totals").innerHTML = "Account Totals - Current: $" + parseFloat(currentTotal).toFixed(2) + "    Projected: $" + parseFloat(projectedTotal).toFixed(2);
}
