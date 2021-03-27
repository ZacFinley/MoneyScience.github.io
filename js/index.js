// .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
var accounts = [];
var accountBalances = [];
var masterAccountBalances = [];
var years = 1;

var hasContributionValue = false;
var hasMatchValue = false;

function drawChart() {
    var data = google.visualization.arrayToDataTable(getTotalChartArray());
    
    var options = {
    title: 'Total Net Worth Growth',
    curveType: 'function',
    legend: { position: 'right' }
    };
    
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    
    chart.draw(data, options);
}

function updateYears() {
    years = parseFloat(document.getElementById("yearsGrowthInput").value);
    calculateAccountBalances();
}

function addAccountInfo() {
    var account = [
                   document.getElementById("accountNameInput").value,
                   parseFloat(document.getElementById("currentBalanceInput").value),
                   parseFloat(document.getElementById("annualInterestBalanceInput").value/100),
                   parseFloat(document.getElementById("monthlyContributionInput").value * 12),
                   parseFloat(document.getElementById("employerMatchInput").value * 12)
                   ];
    if (account[3] > 0) {
        hasContributionValue = true;
    }
    if (account[4] > 0) {
        hasMatchValue = true;
    }
    accounts.push(account);
    calculateAccountBalances();
}

function removeAccountInfo(accountIndex) {
    accounts.splice(accountIndex,1);
    calculateAccountBalances();
}

function calculateAccountBalances() {
    accountBalances = [];
    masterAccountBalances = [];
    calculateInterestOnly();
    calculateInterestContrib();
    calculateInterestContribMatch();
    calculateMasterBalances();
    drawChart();
    makeListOfAccounts();
}

function calculateInterestOnly() {
    var balances = [];
    for (var i = 0; i < accounts.length; i++){
        accountBalances.push([]);
        balances = [];
        for (var j = 0; j <= years; j++) {
            if (j === 0) {
                balances.push(accounts[i][1]);
            }
            else {
                balances.push((balances[j-1] * (1+accounts[i][2])));
            }
        }
        accountBalances[i].push(balances);
    }
}

function calculateInterestContrib() {
    var balances = [];
    for (var i = 0; i < accounts.length; i++){
        balances = [];
        for (var j = 0; j <= years; j++) {
            if (j === 0) {
                balances.push(accounts[i][1]);
            }
            else {
                balances.push((balances[j-1] * (1+accounts[i][2])) + accounts[i][3]);
            }
        }
        accountBalances[i].push(balances);
    }
}

function calculateInterestContribMatch() {
    var balances = [];
    for (var i = 0; i < accounts.length; i++){
        balances = [];
        for (var j = 0; j <= years; j++) {
            if (j === 0) {
                balances.push(accounts[i][1]);
            }
            else {
                balances.push((balances[j-1] * (1+accounts[i][2])) + accounts[i][3] + accounts[i][4]);
            }
        }
        accountBalances[i].push(balances);
    }
}

function calculateMasterBalances() {
    if (accountBalances.length === 1) {
        masterAccountBalances = accountBalances[0];
    }
    else {
        masterAccountBalances = accountBalances[0];
        for (var i = 1; i < accountBalances.length; i++) {
            for (var j = 0; j < accountBalances[i].length; j++){
                for (var k = 0; k < accountBalances[i][j].length; k++) {
                    masterAccountBalances[j][k] += accountBalances[i][j][k];
                }
            }
        }
    }
    if (accountBalances.length === 0){
        masterAccountBalances = [];
    }
    if (masterAccountBalances.length > 1) {
        document.getElementById("interestOnly").innerHTML = "$" + (masterAccountBalances[0][masterAccountBalances[0].length-1].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        document.getElementById("interestContribution").innerHTML = "$" + (masterAccountBalances[1][masterAccountBalances[0].length-1].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        document.getElementById("interestContributionMatch").innerHTML = "$" + (masterAccountBalances[2][masterAccountBalances[0].length-1].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    }
}

function getTotalChartArray() {
    if (hasMatchValue && hasContributionValue) {
        var chart = [
                     ['Year','Interest Only','Interest + Contribution','Interest + Contrib. + Match']
                     ];
        if (accountBalances.length > 0){
            for (var i = 0; i < masterAccountBalances[0].length; i++) {
                chart.push (['',masterAccountBalances[0][i],masterAccountBalances[1][i],masterAccountBalances[2][i]]);
            }
        }
        else {
            chart.push(['',0,0,0]);
        }
        return chart;
    }
    else if (!hasMatchValue && hasContributionValue) {
        var chart = [
                     ['Year','Interest Only','Interest + Contribution']
                     ];
        if (accountBalances.length > 0){
            for (var i = 0; i < masterAccountBalances[0].length; i++) {
                chart.push (['',masterAccountBalances[0][i],masterAccountBalances[1][i]]);
            }
        }
        else {
            chart.push(['',0,0]);
        }
        return chart;
        
    }
    else if (hasMatchValue && !hasContributionValue) {
        var chart = [
                     ['Year','Interest Only','Interest + Contrib. + Match']
                     ];
        if (accountBalances.length > 0){
            for (var i = 0; i < masterAccountBalances[0].length; i++) {
                chart.push (['',masterAccountBalances[0][i],masterAccountBalances[2][i]]);
            }
        }
        else {
            chart.push(['',0,0]);
        }
        return chart;
    }
    else {
        var chart = [
                     ['Year','Interest Only']
                     ];
        if (accountBalances.length > 0){
            for (var i = 0; i < masterAccountBalances[0].length; i++) {
                chart.push (['',masterAccountBalances[0][i]]);
            }
        }
        else {
            chart.push(['',0]);
        }
        return chart;
    }
    
}

function makeListOfAccounts() {
    document.getElementById("accountList").innerHTML = '';
    for (var i = 0; i < accounts.length; i++) {
        var accountNameDisplay = '<div class="listElement">Account Name<input id="accountName' + i + '" onChange="cardUpdate('+i+',0)" value="' + accounts[i][0] + '"></input></div>';
        var currentBalanceDisplay = '<div class="listElement">Starting Balance ($)<input id="accountBalance' + i + '" onChange="cardUpdate('+i+',1)" value=' + parseFloat(accounts[i][1].toFixed(2)) + ' type="number"></input></div>';
        var annualInterestDisplay = '<div class="listElement">Annual Interest (%)<input id="accountInterest' + i + '" onChange="cardUpdate('+i+',2)" value=' + parseFloat(accounts[i][2] * 100) + ' type="number"></input></div>';
        var monthlyContributionDisplay = '<div class="listElement">Monthly Contribution ($)<input id="accountContribution' + i + '" onChange="cardUpdate('+i+',3)" value=' + (parseFloat(accounts[i][3] / 12).toFixed(2)) + ' type="number"></input></div>';
        var employerMatchDisplay = '<div class="listElement">Monthly Match ($)<input id="accountEmpMatch' + i + '" onChange="cardUpdate('+i+',4)" value=' + (parseFloat(accounts[i][4] / 12).toFixed(2)) + ' type="number"></input></div>';
        var deleteAccountBtn = '<button class="deleteButton" onclick="removeAccountInfo(' + i + ')">X</button>';
        document.getElementById("accountList").innerHTML += '<div class="card listOfAccounts">' + accountNameDisplay + currentBalanceDisplay + annualInterestDisplay + monthlyContributionDisplay + employerMatchDisplay + deleteAccountBtn + '</div>';
    }
}

function cardUpdate(listNumber, fieldNumber) {
    // fieldNumber 0 = accountName 1 = accountBalance 2 = accountInterest 3 = accountContribution 4 = accountEmpMatch
    switch (fieldNumber) {
        case 0:
            accounts[listNumber][fieldNumber] = document.getElementById("accountName" + listNumber).value;
            break;
        case 1:
            accounts[listNumber][fieldNumber] = parseFloat(document.getElementById("accountBalance" + listNumber).value);
            break;
        case 2:
            accounts[listNumber][fieldNumber] = parseFloat(document.getElementById("accountInterest" + listNumber).value)/100;
            break;
        case 3:
            accounts[listNumber][fieldNumber] = parseFloat(document.getElementById("accountContribution" + listNumber).value)*12;
            break;
        case 4:
            accounts[listNumber][fieldNumber] = parseFloat(document.getElementById("accountEmpMatch" + listNumber).value)*12;
            break;
        default:
            console.log("error in card update");
    }
    calculateAccountBalances();
}
