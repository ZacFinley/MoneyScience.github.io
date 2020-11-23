google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
var accounts = [];
var accountBalances = [];
var masterAccountBalances = [];
var years = 1;

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
    accounts.push(account);
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
        for (var j = 0; j < years; j++) {
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
        for (var j = 0; j < years; j++) {
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
        for (var j = 0; j < years; j++) {
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
}

function getTotalChartArray() {
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

function makeListOfAccounts() {
    document.getElementById("accountList").innerHTML = '';
    for (var i = 0; i < accounts.length; i++) {
        document.getElementById("accountList").innerHTML += '<div class="card">' + accounts[i][0] + accounts[i][1] + accounts[i][2] + accounts[i][3] + accounts[i][4] + '</div>';
    }
}
