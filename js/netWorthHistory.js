// .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
var masterAccountBalances = [
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
            for (var j = 2; j < masterAccountBalances[i].length; j++) {
                tempNetWorth += masterAccountBalances[i][j];
            }
            masterAccountBalances[i][1] = tempNetWorth;
        }
    }
}

//function getTotalChartArray() {
//    calculateAccountBalances();
//    return masterAccountBalances;
//}

function addAccount(){
    masterAccountBalances[0].push('New Account');
    for (var i = 1; i < masterAccountBalances.length; i++) {
        masterAccountBalances[i].push(0);
    }
    reprintTable();
}

function reprintTable(){
    calculateAccountBalances();
    // Header
    document.getElementById("inputTable").innerHTML = "<tr><td>Account Name</td><td>Start</td><td>Jan</td><td>Feb</td><td>Mar</td><td>Apr</td><td>May</td><td>Jun</td><td>Jul</td><td>Aug</td><td>Sep</td><td>Oct</td><td>Nov</td><td>Dec</td></tr>";
    
    // Each Row
    for (var j = 2; j < masterAccountBalances[0].length; j++) {
        var innerHTMLString = "<td><input id='R"+(j-1)+"C0' value='" + masterAccountBalances[0][j] + "' onChange='updateCell(0,"+j+",R"+(j-1)+"C0)'></input></td>"
        for (var i = 1; i < 14; i++) {
            var tempString = "<td>$<input id='R"+(j-1)+"C"+i+"' type='number' value='" + parseFloat(masterAccountBalances[i][j]).toFixed(2) + "' onChange='updateCell("+i+","+j+",R"+(j-1)+"C"+i+")'></input></td>";
            innerHTMLString += tempString;
        }
        document.getElementById("inputTable").innerHTML += ("<tr>" + innerHTMLString + "</tr>");
    }
    
    // Net Worth Row
    document.getElementById("inputTable").innerHTML += updateNetWorthRow();
    
    // Net Worth Growth Row
    document.getElementById("inputTable").innerHTML += updateNetWorthGrowthRow();
    drawChart();
}

function updateNetWorthRow() {
    return "<tr><td>Net Worth</td><td id='startNetWorth'>$" + parseFloat(masterAccountBalances[1][1]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='janNetWorth'>$" + parseFloat(masterAccountBalances[2][1]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='febNetWorth'>$" + parseFloat(masterAccountBalances[3][1]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='marNetWorth'>$" + parseFloat(masterAccountBalances[4][1]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='aprNetWorth'>$" + parseFloat(masterAccountBalances[5][1]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='mayNetWorth'>$" + parseFloat(masterAccountBalances[6][1]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='junNetWorth'>$" + parseFloat(masterAccountBalances[7][1]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='julNetWorth'>$" + parseFloat(masterAccountBalances[8][1]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='augNetWorth'>$" + parseFloat(masterAccountBalances[9][1]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='sepNetWorth'>$" + parseFloat(masterAccountBalances[10][1]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='octNetWorth'>$" + parseFloat(masterAccountBalances[11][1]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='novNetWorth'>$" + parseFloat(masterAccountBalances[12][1]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td id='decNetWorth'>$" + parseFloat(masterAccountBalances[13][1]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td></tr>";
}

function updateNetWorthGrowthRow() {
    return "<tr><td>Growth</td><td id='startNetWorthGrowth'></td><td id='janNetWorthGrowth'>" + parseFloat((masterAccountBalances[2][1]-masterAccountBalances[1][1])/masterAccountBalances[1][1]*100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td><td id='febNetWorthGrowth'>" + parseFloat((masterAccountBalances[3][1]-masterAccountBalances[2][1])/masterAccountBalances[2][1]*100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td><td id='marNetWorthGrowth'>" + parseFloat((masterAccountBalances[4][1]-masterAccountBalances[3][1])/masterAccountBalances[3][1]*100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td><td id='aprNetWorthGrowth'>" + parseFloat((masterAccountBalances[5][1]-masterAccountBalances[4][1])/masterAccountBalances[4][1]*100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td><td id='mayNetWorthGrowth'>" + parseFloat((masterAccountBalances[6][1]-masterAccountBalances[5][1])/masterAccountBalances[5][1]*100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td><td id='junNetWorthGrowth'>" + parseFloat((masterAccountBalances[7][1]-masterAccountBalances[6][1])/masterAccountBalances[6][1]*100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td><td id='julNetWorthGrowth'>" + parseFloat((masterAccountBalances[8][1]-masterAccountBalances[7][1])/masterAccountBalances[7][1]*100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td><td id='augNetWorthGrowth'>" + parseFloat((masterAccountBalances[9][1]-masterAccountBalances[8][1])/masterAccountBalances[8][1]*100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td><td id='sepNetWorthGrowth'>" + parseFloat((masterAccountBalances[10][1]-masterAccountBalances[9][1])/masterAccountBalances[9][1]*100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td><td id='octNetWorthGrowth'>" + parseFloat((masterAccountBalances[11][1]-masterAccountBalances[10][1])/masterAccountBalances[10][1]*100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td><td id='novNetWorthGrowth'>" + parseFloat((masterAccountBalances[12][1]-masterAccountBalances[11][1])/masterAccountBalances[11][1]*100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td><td id='decNetWorthGrowth'>" + parseFloat((masterAccountBalances[13][1]-masterAccountBalances[12][1])/masterAccountBalances[12][1]*100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%</td></tr>";
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
