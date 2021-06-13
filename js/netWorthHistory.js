// .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
var showPredictions = true;
var masterAccountBalances = showPredictions ? [
                             ['Month','Prediction ($)','Prediction (%)','Net Worth','New Account'],
                             ['Start',0,0,0,0],
                             ['Jan',0,0,0,0],
                             ['Feb',0,0,0,0],
                             ['Mar',0,0,0,0],
                             ['Apr',0,0,0,0],
                             ['May',0,0,0,0],
                             ['Jun',0,0,0,0],
                             ['Jul',0,0,0,0],
                             ['Aug',0,0,0,0],
                             ['Sep',0,0,0,0],
                             ['Oct',0,0,0,0],
                             ['Nov',0,0,0,0],
                             ['Dec',0,0,0,0]
                            ] :
                            [
                             ['Month','Net Worth','New Account'],
                             ['Start',0,0],
                             ['Jan',0,0],
                             ['Feb',0,0],
                             ['Mar',0,0],
                             ['Apr',0,0],
                             ['May',0,0],
                             ['Jun',0,0],
                             ['Jul',0,0],
                             ['Aug',0,0],
                             ['Sep',0,0],
                             ['Oct',0,0],
                             ['Nov',0,0],
                             ['Dec',0,0]
                             ];

window.addEventListener('load', reprintTable);

function drawChart() {
    var data = google.visualization.arrayToDataTable(masterAccountBalances);
    
    var options = {
    title: 'Net Worth History',
    curveType: 'none',
    legend: { position: 'right' }
    };
    
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    
    chart.draw(data, options);
}

function calculateAccountBalances() {
    if (masterAccountBalances[0].length > 2) {
        for (var i = 1; i < masterAccountBalances.length; i++) {
            var tempNetWorth = 0;
            for (var j = showPredictions ? 4 : 2; j < masterAccountBalances[i].length; j++) {
                tempNetWorth += masterAccountBalances[i][j];
            }
            masterAccountBalances[i][showPredictions ? 3 : 1] = tempNetWorth;
        }
    }
}

function addAccount(){
    masterAccountBalances[0].push('New Account');
    for (var i = 1; i < masterAccountBalances.length; i++) {
        masterAccountBalances[i].push(0);
    }
    reprintTable();
}

function reprintTable(){
    calculateAccountBalances();
    updatePreciction();
    // Header
    document.getElementById("inputTable").innerHTML = "<tr><td>Account Name</td><td>Start</td><td>Jan</td><td>Feb</td><td>Mar</td><td>Apr</td><td>May</td><td>Jun</td><td>Jul</td><td>Aug</td><td>Sep</td><td>Oct</td><td>Nov</td><td>Dec</td></tr>";
    
    // Each Row
    for (var j = showPredictions ? 4 : 2; j < masterAccountBalances[0].length; j++) {
        var innerHTMLString = "<td><input id='R"+(j-1)+"C0' value='" + masterAccountBalances[0][j] + "' onChange='updateCell(0,"+j+",R"+(j-1)+"C0)'></input></td>"
        for (var i = 1; i < 14; i++) {
            var tempString = "<td>$<input id='R"+(j-1)+"C"+i+"' type='number' value='" + parseFloat(masterAccountBalances[i][j]).toFixed(2) + "' onChange='updateCell("+i+","+j+",R"+(j-1)+"C"+i+")'></input></td>";
            innerHTMLString += tempString;
        }
        document.getElementById("inputTable").innerHTML += ("<tr>" + innerHTMLString + "</tr>");
    }
    
    // Net Worth Row
    document.getElementById("inputTable").innerHTML += updateNetWorthRow();
    
    // Net Worth Growth Row Dollar
    document.getElementById("inputTable").innerHTML += updateNetWorthGrowthRowDollar();
    
    // Net Worth Growth Row Percent
    document.getElementById("inputTable").innerHTML += updateNetWorthGrowthRowPercent();
    updateMasterNetWorthSection();
    drawChart();
}

function updateNetWorthRow() {
    var monthlyNetWorths = [];
    for (var i = 1; i < 14; i++) {
        if (!isNaN(masterAccountBalances[i][showPredictions ? 3 : 1]) && isFinite(masterAccountBalances[i][showPredictions ? 3 : 1])) {
            monthlyNetWorths.push(masterAccountBalances[i][showPredictions ? 3 : 1]);
        }
        else {
            monthlyNetWorths.push(0);
        }
    }
    return "<tr><td>Net Worth</td><td id='startNetWorth'>$" + parseFloat(monthlyNetWorths[0]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='janNetWorth'>$" + parseFloat(monthlyNetWorths[1]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='febNetWorth'>$" + parseFloat(monthlyNetWorths[2]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='marNetWorth'>$" + parseFloat(monthlyNetWorths[3]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='aprNetWorth'>$" + parseFloat(monthlyNetWorths[4]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='mayNetWorth'>$" + parseFloat(monthlyNetWorths[5]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='junNetWorth'>$" + parseFloat(monthlyNetWorths[6]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='julNetWorth'>$" + parseFloat(monthlyNetWorths[7]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='augNetWorth'>$" + parseFloat(monthlyNetWorths[8]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='sepNetWorth'>$" + parseFloat(monthlyNetWorths[9]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='octNetWorth'>$" + parseFloat(monthlyNetWorths[10]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='novNetWorth'>$" + parseFloat(monthlyNetWorths[11]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='decNetWorth'>$" + parseFloat(monthlyNetWorths[12]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td></tr>";
}

function updateNetWorthGrowthRowDollar() {
    var monthlyNetWorthGrowths = [];
    for (var i = 2; i < 14; i++) {
        var temp = (masterAccountBalances[i][showPredictions ? 3 : 1]-masterAccountBalances[i-1][showPredictions ? 3 : 1]);
        if (!isNaN(temp) && isFinite(temp)) {
            monthlyNetWorthGrowths.push(temp);
        }
        else {
            monthlyNetWorthGrowths.push(0);
        }
    }
    return "<tr><td>Growth ($)</td><td id='startNetWorthGrowthDollar'></td><td id='janNetWorthGrowthDollar'>$" + parseFloat(monthlyNetWorthGrowths[0]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='febNetWorthGrowthDollar'>$" + parseFloat(monthlyNetWorthGrowths[1]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='marNetWorthGrowthDollar'>$" + parseFloat(monthlyNetWorthGrowths[2]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='aprNetWorthGrowthDollar'>$" + parseFloat(monthlyNetWorthGrowths[3]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='mayNetWorthGrowthDollar'>$" + parseFloat(monthlyNetWorthGrowths[4]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='junNetWorthGrowthDollar'>$" + parseFloat(monthlyNetWorthGrowths[5]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='julNetWorthGrowthDollar'>$" + parseFloat(monthlyNetWorthGrowths[6]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='augNetWorthGrowthDollar'>$" + parseFloat(monthlyNetWorthGrowths[7]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='sepNetWorthGrowthDollar'>$" + parseFloat(monthlyNetWorthGrowths[8]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='octNetWorthGrowthDollar'>$" + parseFloat(monthlyNetWorthGrowths[9]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='novNetWorthGrowthDollar'>$" + parseFloat(monthlyNetWorthGrowths[10]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='decNetWorthGrowthDollar'>$" + parseFloat(monthlyNetWorthGrowths[11]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td></tr>";
}

function updateNetWorthGrowthRowPercent() {
    var monthlyNetWorthGrowths = [];
    for (var i = 2; i < 14; i++) {
        var temp = (masterAccountBalances[i][showPredictions ? 3 : 1]-masterAccountBalances[i-1][showPredictions ? 3 : 1])/masterAccountBalances[i-1][showPredictions ? 3 : 1]*100;
        if (!isNaN(temp) && isFinite(temp)) {
            monthlyNetWorthGrowths.push(temp);
        }
        else {
            monthlyNetWorthGrowths.push(0);
        }
    }
    return "<tr><td>Growth (%)</td><td id='startNetWorthGrowthPercent'></td><td id='janNetWorthGrowthPercent'>" + parseFloat(monthlyNetWorthGrowths[0]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td><td id='febNetWorthGrowthPercent'>" + parseFloat(monthlyNetWorthGrowths[1]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td><td id='marNetWorthGrowthPercent'>" + parseFloat(monthlyNetWorthGrowths[2]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td><td id='aprNetWorthGrowthPercent'>" + parseFloat(monthlyNetWorthGrowths[3]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td><td id='mayNetWorthGrowthPercent'>" + parseFloat(monthlyNetWorthGrowths[4]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td><td id='junNetWorthGrowthPercent'>" + parseFloat(monthlyNetWorthGrowths[5]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td><td id='julNetWorthGrowthPercent'>" + parseFloat(monthlyNetWorthGrowths[6]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td><td id='augNetWorthGrowthPercent'>" + parseFloat(monthlyNetWorthGrowths[7]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td><td id='sepNetWorthGrowthPercent'>" + parseFloat(monthlyNetWorthGrowths[8]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td><td id='octNetWorthGrowthPercent'>" + parseFloat(monthlyNetWorthGrowths[9]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td><td id='novNetWorthGrowthPercent'>" + parseFloat(monthlyNetWorthGrowths[10]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td><td id='decNetWorthGrowthPercent'>" + parseFloat(monthlyNetWorthGrowths[11]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td></tr>";
}

function updateMasterNetWorthSection() {
    var totalGrowthDollars = parseFloat(masterAccountBalances[13][showPredictions ? 3 : 1]-masterAccountBalances[1][showPredictions ? 3 : 1]);
    var totalGrowthPercent = parseFloat((masterAccountBalances[13][showPredictions ? 3 : 1]-masterAccountBalances[1][showPredictions ? 3 : 1])/masterAccountBalances[1][showPredictions ? 3 : 1]*100);
    var averageMonthlyGrowthDollar = parseFloat((masterAccountBalances[13][showPredictions ? 3 : 1]-masterAccountBalances[1][showPredictions ? 3 : 1])/12);
    var averageMonthlyGrowthPercent = parseFloat((masterAccountBalances[13][showPredictions ? 3 : 1]-masterAccountBalances[1][showPredictions ? 3 : 1])/masterAccountBalances[1][showPredictions ? 3 : 1]*100/12);
    document.getElementById("totalGrowthDollars").innerHTML = (!isNaN(totalGrowthDollars) && isFinite(totalGrowthDollars)) ? ("$" + totalGrowthDollars.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : ("$0.00");
    document.getElementById("totalGrowthPercent").innerHTML = (!isNaN(totalGrowthPercent) && isFinite(totalGrowthPercent)) ? (totalGrowthPercent.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%") : ("0.00%");
    document.getElementById("averageMonthlyGrowthDollar").innerHTML = (!isNaN(averageMonthlyGrowthDollar) && isFinite(averageMonthlyGrowthDollar)) ? ("$" + averageMonthlyGrowthDollar.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : ("$0.00");
    document.getElementById("averageMonthlyGrowthPercent").innerHTML = (!isNaN(averageMonthlyGrowthPercent) && isFinite(averageMonthlyGrowthPercent)) ? (averageMonthlyGrowthPercent.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%") : ("0.00%");
}

function updateCell(row,column,id) {
    if (row === 0) {
        masterAccountBalances[row][column] = (id).value;
    }
    else {
        masterAccountBalances[row][column] = parseFloat(id.value);
    }
    reprintTable();
}

function updatePreciction() {
    if (showPredictions){
        var netWorthGrowthDollars = 0;
        var netWorthGrowthPercent = 0;
        var count = 0;
        var lastNetWorthIndexWithValue = 1;
        for (var i = 2; i < masterAccountBalances.length; i++) {
            if (masterAccountBalances[i][3] !== 0) {
                lastNetWorthIndexWithValue = i;
            }
        }
        for (var k = 2; k <= lastNetWorthIndexWithValue; k++) {
            netWorthGrowthDollars += masterAccountBalances[k][3] - masterAccountBalances[k-1][3];
            netWorthGrowthPercent += (masterAccountBalances[k][3] - masterAccountBalances[k-1][3])/masterAccountBalances[k-1][3];
            count++;
        }
        var amountToAddPerMonthDollars = netWorthGrowthDollars/count;
        var amountToAddPerMonthPercent = parseFloat(netWorthGrowthPercent/count);
        for (var j = 1; j < masterAccountBalances.length; j++) {
            if (j <= lastNetWorthIndexWithValue) {
                masterAccountBalances[j][1] = masterAccountBalances[j][3];
                masterAccountBalances[j][2] = masterAccountBalances[j][3];
            }
            else if (j != 1) {
                masterAccountBalances[j][1] = masterAccountBalances[j-1][1] + amountToAddPerMonthDollars;
                masterAccountBalances[j][2] = parseFloat((masterAccountBalances[j-1][2] * (1+amountToAddPerMonthPercent)).toFixed(2));
            }
        }

    }
}
