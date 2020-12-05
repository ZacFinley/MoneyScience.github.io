var accounts = [[["",0.0,0.0,0.0,0.0,0.0,0.0]]];

function addInvestment(accountId) {
    document.getElementById("account"+accountId).innerHTML += "<tr><td><input id='a" + accountId + "i" + accounts[accountId].length + "Ticker' class='tickerInput' onChange='updateInvestmentTicker(" + accountId + "," + accounts[accountId].length + ")'></input></td><td><input id='a" + accountId + "i" + accounts[accountId].length + "Shares' class='sharesInput' type='number' onChange='updateInvestmentShares(" + accountId + "," + accounts[accountId].length + ")'></input></td><td><input id='a" + accountId + "i" + accounts[accountId].length + "Price' class='priceInput' type='number' onChange='updateInvestmentPrice(" + accountId + "," + accounts[accountId].length + ")'></input></td><td id='a" + accountId + "i" + accounts[accountId].length + "CurrentTotal' class='center'>$0.00</td><td><input id='a" + accountId + "i" + accounts[accountId].length + "Adjustment' class='adjustmentInput' type='number' value='0' step='.1' onChange='updateInvestmentAdjustment(" + accountId + "," + accounts[accountId].length + ")'></input></td><td id='a" + accountId + "i" + accounts[accountId].length + "ProjectedPrice' class='center'>$0.00</td><td id='a" + accountId + "i" + accounts[accountId].length + "ProjectedTotal' class='center'>$0.00</td></tr>";
    accounts[accountId].push(["",0.0,0.0,0.0,0.0,0.0,0.0]);
}

function updateInvestmentTicker(accountId, investmentId) {
    accounts[accountId][investmentId][0] = document.getElementById("a" + accountId + "i" + investmentId + "Ticker").value;
}

function updateInvestmentShares(accountId, investmentId) {
    accounts[accountId][investmentId][1] = parseFloat(document.getElementById("a" + accountId + "i" + investmentId + "Shares").value);
    updateInvestmentCurrentPrice(accountId, investmentId);
}

function updateInvestmentPrice(accountId, investmentId) {
    accounts[accountId][investmentId][2] = parseFloat(document.getElementById("a" + accountId + "i" + investmentId + "Price").value);
    updateInvestmentCurrentPrice(accountId, investmentId);
}

function updateInvestmentCurrentPrice(accountId, investmentId) {
    accounts[accountId][investmentId][3] = accounts[accountId][investmentId][1] * accounts[accountId][investmentId][2];
    document.getElementById("a" + accountId + "i" + investmentId + "CurrentTotal").innerHTML = ("$" + parseFloat(accounts[accountId][investmentId][3]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    updateInvestmentProjectedPrice(accountId, investmentId);
    updateAccountTotals(accountId);
    updateMasterTotals();
}

function updateInvestmentAdjustment(accountId, investmentId) {
    accounts[accountId][investmentId][4] = parseFloat(document.getElementById("a" + accountId + "i" + investmentId + "Adjustment").value);
    updateInvestmentProjectedPrice(accountId, investmentId);
}

function updateInvestmentProjectedPrice(accountId, investmentId) {
    accounts[accountId][investmentId][5] = accounts[accountId][investmentId][2] * (1 + (accounts[accountId][investmentId][4]/100));
    accounts[accountId][investmentId][6] = accounts[accountId][investmentId][1] * accounts[accountId][investmentId][5];
    document.getElementById("a" + accountId + "i" + investmentId + "ProjectedPrice").innerHTML = ("$" + parseFloat(accounts[accountId][investmentId][5]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    document.getElementById("a" + accountId + "i" + investmentId + "ProjectedTotal").innerHTML = ("$" + parseFloat(accounts[accountId][investmentId][6]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    updateAccountTotals(accountId);
    updateMasterTotals();
}

function updateAccountTotals(accountId) {
    var currentTotal = 0.0;
    var projectedTotal = 0.0;
    for (var i = 0; i < accounts[accountId].length; i++) {
        currentTotal += accounts[accountId][i][3];
        projectedTotal += accounts[accountId][i][6];
    }
    document.getElementById("account"+accountId+"Totals").innerHTML = "Account Totals - Current: $" + parseFloat(currentTotal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "    Projected: $" + parseFloat(projectedTotal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function addAccount() {
    document.getElementById("accountsWrapper").innerHTML+= "<div class='card'><div id='account" + accounts.length + "Totals'>Account Totals - Current: $0.00 Projected: $0.00</div><table id='account" + accounts.length + "'><tr><th>Ticker</th><th>Shares</th><th>Price</th><th>Current Total</th><th>Adjustment (%)</th><th>Projected Price</th><th>Projected Total</th></tr><tr><td><input id='a" + accounts.length + "i0Ticker' class='tickerInput' onChange='updateInvestmentTicker(" + accounts.length + ",0)'></input></td><td><input id='a" + accounts.length + "i0Shares' class='sharesInput' onChange='updateInvestmentShares(" + accounts.length + ",0)' type='number'></input></td><td><input id='a" + accounts.length + "i0Price' class='priceInput' onChange='updateInvestmentPrice(" + accounts.length + ",0)' type='number'></input></td><td id='a" + accounts.length + "i0CurrentTotal' class='center'>$0.00</td><td><input id='a" + accounts.length + "i0Adjustment' class='adjustmentInput' type='number' value='0' step='.1' onChange='updateInvestmentAdjustment(" + accounts.length + ",0)'></input></td><td id='a" + accounts.length + "i0ProjectedPrice' class='center'>$0.00</td><td id='a" + accounts.length + "i0ProjectedTotal' class='center'>$0.00</td></tr></table><button class='mainButton' onClick='addInvestment(" + accounts.length + ")'>Add Investment</button></div>";
    accounts.push([["",0.0,0.0,0.0,0.0,0.0,0.0]]);
}

function updateMasterTotals() {
    var tempCurrent = 0.0;
    var tempProjected = 0.0;
    for (var i = 0; i < accounts.length; i++) {
        for (var j = 0; j < accounts[i].length; j++) {
            tempCurrent += accounts[i][j][3];
            tempProjected += accounts[i][j][6];
        }
    }
    document.getElementById("masterTotals").innerHTML = "Current: $" + parseFloat(tempCurrent).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " Projected: $" + parseFloat(tempProjected).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
