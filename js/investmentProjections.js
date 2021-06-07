var accounts = [[["",0.0,0.0,0.0,0.0,0.0,0.0]]];

function addInvestment(accountId) {
    accounts[accountId].push(["",0.0,0.0,0.0,0.0,0.0,0.0]);
    displayAccountsInvestments();
}

function displayAccountsInvestments(){
    document.getElementById("accountsWrapper").innerHTML = "";
    for (var i = 0; i < accounts.length; i++) {
        var tempDataRow = "";
        for (var j = 0; j < accounts[i].length; j++){
            tempDataRow += "<tr><td><input id='a" + i + "i" + j + "Ticker' class='tickerInput' onChange='updateInvestmentTicker(" + i + "," + j + ")' value='" + accounts[i][j][0] + "'></input></td><td><input id='a" + i + "i" + j + "Shares' class='sharesInput' onChange='updateInvestmentShares(" + i + "," + j + ")' type='number' value='" + accounts[i][j][1] + "'></input></td><td><input id='a" + i + "i" + j + "Price' class='priceInput' onChange='updateInvestmentPrice(" + i + "," + j + ")' type='number' value='" + parseFloat(accounts[i][j][2].toFixed(2)) + "'></input></td><td id='a" + i + "i" + j + "CurrentTotal' class='center'>$" + parseFloat(accounts[i][j][3]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td><input id='a" + i + "i" + j + "Adjustment' class='adjustmentInput' type='number' value='" + parseFloat(accounts[i][j][4].toFixed(2)) + "' step='.1' onChange='updateInvestmentAdjustment(" + i + "," + j + ")'></input></td><td id='a" + i + "i" + j + "ProjectedPrice' class='center'>$" + parseFloat(accounts[i][j][5]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='a" + i + "i" + j + "ProjectedTotal' class='center'>$" + parseFloat(accounts[i][j][6]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td></tr>";
        }
        document.getElementById("accountsWrapper").innerHTML+= "<div class='card'><div id='account" + i + "Totals'>Account Totals - Current: $0.00 Projected: $0.00</div><table id='account" + i + "'><tr><th>Ticker</th><th>Shares</th><th>Price</th><th>Current Total</th><th>Adjustment (%)</th><th>Projected Price</th><th>Projected Total</th></tr>" + tempDataRow + "</table><button class='mainButton' onClick='addInvestment(" + i + ")'>Add Investment</button></div>";
        updateAccountTotals(i);
    }
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
    accounts.push([["",0.0,0.0,0.0,0.0,0.0,0.0]]);
    displayAccountsInvestments();
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
