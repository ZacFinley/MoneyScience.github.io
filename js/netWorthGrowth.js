var netWorth = 0.00;
var percentage = 0.00;
var years = 0;
var months = 0;
var monthsSelected = true;

var valuesChart = [];

function updateNetWorth() {
    netWorth = parseFloat(document.getElementById("netWorthInput").value);
    updateAll();
}

function updatePercentage(){
    percentage = document.getElementById("rangeInput").value/10000;
    document.getElementById("percentageOutput").innerHTML = parseFloat(percentage*100).toFixed(2) + "%";
    updateAll();
}

function updateDuration() {
    if (monthsSelected) {
        months = document.getElementById("durationInput").value;
    }
    else {
        years = months = document.getElementById("durationInput").value;
    }
    updateAll();
}

function monthChecked() {
    monthsSelected = true;
    updateDuration();
    updateAll();
}

function yearChecked() {
    monthsSelected = false;
    updateDuration();
    updateAll();
}

function updateAll() {
    if (monthsSelected) {
        calculateMonthlyValues();
        updateMonthlyOutput();
    }
    else {
        calculateYearlyValues();
        updateYearlyOutput();
    }
}

function calculateMonthlyValues() {
    valuesChart = [];
    var valueChartRow = [];
    var time = months;
    var tempNetWorth = netWorth;
    var tempYear = new Date().getYear() + 1900;
    var tempMonth = new Date().getMonth();
    if (tempMonth === 11){
        tempMonth = 0
        tempYear++;
    }
    else {
        tempMonth++;
    }
    for (var i = 0; i < time; i++) {
        valueChartRow = [];
        valueChartRow.push(tempYear);
        valueChartRow.push(tempMonth);
        valueChartRow.push(parseFloat(tempNetWorth).toFixed(2));
        valueChartRow.push(parseFloat(tempNetWorth*percentage).toFixed(2));
        tempNetWorth += (tempNetWorth*percentage);
        valueChartRow.push(parseFloat(tempNetWorth).toFixed(2));
        if (tempMonth === 11) {
            tempMonth = 0;
            tempYear++;
        }
        else {
            tempMonth++;
        }
        valuesChart.push(valueChartRow);
    }
}

function calculateYearlyValues() {
    valuesChart = [];
    var valueChartRow = [];
    var time = years;
    var tempNetWorth = netWorth;
    var tempYear = new Date().getYear() + 1900;
    for (var i = 0; i < time; i++) {
        valueChartRow = [];
        valueChartRow.push(tempYear);
        valueChartRow.push(tempNetWorth);
        valueChartRow.push(parseFloat(tempNetWorth * percentage).toFixed(2));
        tempNetWorth += (tempNetWorth * percentage);
        valueChartRow.push(parseFloat(tempNetWorth).toFixed(2));
        tempYear++;
        valuesChart.push(valueChartRow);
    }
}

function getMonthName(num) {
    const monthNames = ["January", "February", "March",
                        "April", "May", "June",
                        "July", "August", "September",
                        "October", "November", "December"];
    return monthNames[num];
}

function updateMonthlyOutput() {
    document.getElementById("resultCard").innerHTML = "<tr><th>Year</th><th>Month</th><th>Start Net Worth</th><th>Increase</th><th>End Net Worth</th></tr>";
    for (var j = 0; j < valuesChart.length; j++){
        document.getElementById("resultCard").innerHTML += "<tr><td>" + valuesChart[j][0] + "</td><td>" + getMonthName(valuesChart[j][1]) + "</td><td>$" + parseFloat(valuesChart[j][2]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td>$" + parseFloat(valuesChart[j][3]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td>$" + parseFloat(valuesChart[j][4]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td></tr>";
    }
}

function updateYearlyOutput() {
    document.getElementById("resultCard").innerHTML = "<tr><th>Year</th><th>Start Net Worth</th><th>Increase</th><th>End Net Worth</th></tr>";
    for (var j = 0; j < valuesChart.length; j++){
        document.getElementById("resultCard").innerHTML += "<tr><td>" + valuesChart[j][0] + "</td><td>$" + parseFloat(valuesChart[j][1]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td>$" + parseFloat(valuesChart[j][2]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td><td>$" + parseFloat(valuesChart[j][3]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</td></tr>";
    }
}


