var income = [];
var expenses = [];
var savings = [];
var investments = [];

var incomeTotal = 0.00;
var expenseTotal = 0.00;
var savingsTotal = 0.00;
var investmentsTotal = 0.00;

// income categories
var rentDividend = 0.00;

// expense categories
var taxes = 0.00;

var netIncome = 0.00;

function monthOnChange() {
    document.getElementById("monthWrapper").innerHTML = "<div id='month' onClick='reset()'>" + document.getElementById("monthInput").value + "</div>,&nbsp;";
}

function reset() {
    document.getElementById("monthYearWrapper").innerHTML = "<div id='monthWrapper' class='month wrapper'></div><div id='yearWrapper' class='year'></div>";
    document.getElementById("monthWrapper").innerHTML = "<input id='monthInput' class='month' placeholder='Month' onchange='monthOnChange()'></input><button onclick='removeMonth()'>Remove Month</button>";
    document.getElementById("yearWrapper").classList.remove("month");
    document.getElementById("yearWrapper").innerHTML = "<input id='yearInput' class='year' placeholder='Year' onchange='yearOnChange()'></input>";
}

function yearOnChange() {
    document.getElementById("yearWrapper").innerHTML = "<div id='year' onClick='reset()'>" + document.getElementById("yearInput").value + "</div>";
}

function removeMonth() {
    document.getElementById("monthWrapper").remove();
    document.getElementById("yearWrapper").classList.add("month");
}

function calculateTotals() {
    if (income.length > 0){
        incomeTotal = 0;
        rentDividend = 0.00;
        for(var i = 0; i < income.length; i++){
            if (income[i][0].includes("Rent") || income[i][0].includes("Dividend") || income[i][0].includes("Interest")) {
                rentDividend += income[i][1];
            }
            incomeTotal += income[i][1];
        }
    }
    if (expenses.length > 0){
        expenseTotal = 0;
        taxes = 0.00;
        for(var j = 0; j < expenses.length; j++){
            if (expenses[j][0].includes("Tax")) {
                taxes += expenses[j][1];
            }
            expenseTotal += expenses[j][1];
        }
    }
    if (savings.length > 0){
        savingsTotal = 0;
        for(var j = 0; j < savings.length; j++){
            savingsTotal += savings[j][1];
        }
    }
    if (investments.length > 0){
        investmentsTotal = 0;
        for(var j = 0; j < investments.length; j++){
            investmentsTotal += investments[j][1];
        }
    }
    netIncome = incomeTotal - expenseTotal;
}

function updateIncomeStatement() {
    calculateTotals();
    // Income header
    document.getElementById("incomeStatement").innerHTML = "<tr><td>Income:</td></tr>";
    
    // Income line items
    if (income.length > 0){
        for (var i = 0; i < income.length; i++) {
            document.getElementById("incomeStatement").innerHTML += "<tr><td></td><td>" + income[i][0] + "</td><td>$" + parseFloat(income[i][1]).toFixed(2) + "</td><td></td></tr>";
        }
    }
    
    // Total income
    document.getElementById("incomeStatement").innerHTML += "<tr><td></td><td>Total Income:</td><td></td><td>$" + parseFloat(incomeTotal).toFixed(2) + "</td></tr>";
    
    // Expense header
    document.getElementById("incomeStatement").innerHTML += "<tr><td>Expenses:</td></tr>";
    
    // Expense line items
    if (expenses.length > 0){
        for (var i = 0; i < expenses.length; i++) {
            document.getElementById("incomeStatement").innerHTML += "<tr><td></td><td>" + expenses[i][0] + "</td><td>$" + parseFloat(expenses[i][1]).toFixed(2) + "</td><td></td></tr>";
        }
    }
    
    // Total expenses
    document.getElementById("incomeStatement").innerHTML += "<tr><td></td><td>Total Expenses:</td><td></td><td>$" + parseFloat(expenseTotal).toFixed(2) + "</td></tr>";
    
    // Net Income
    document.getElementById("incomeStatement").innerHTML += "<tr><td class='font20Bold'>Net Income:</td><td></td><td></td><td></td><td class='font20Bold'>$" + parseFloat(netIncome).toFixed(2) + "</td></tr>";
    
    // Savings header
    document.getElementById("savingsStatement").innerHTML = "<tr><td>Savings:</td></tr>";
    
    // Savings line items
    if (savings.length > 0){
        for (var i = 0; i < savings.length; i++) {
            document.getElementById("savingsStatement").innerHTML += "<tr><td></td><td>" + savings[i][0] + "</td><td>$" + parseFloat(savings[i][1]).toFixed(2) + "</td><td></td></tr>";
        }
    }
    // Total savings
    document.getElementById("savingsStatement").innerHTML += "<tr><td></td><td>Total Savings:</td><td></td><td>$" + parseFloat(savingsTotal).toFixed(2) + "</td></tr>";
    
    // Investments header
    document.getElementById("investmentsStatement").innerHTML = "<tr><td>Investments:</td></tr>";
    
    // Investments line items
    if (investments.length > 0){
        for (var i = 0; i < investments.length; i++) {
            document.getElementById("investmentsStatement").innerHTML += "<tr><td></td><td>" + investments[i][0] + "</td><td>$" + parseFloat(investments[i][1]).toFixed(2) + "</td><td></td></tr>";
        }
    }
    // Total Investments
    document.getElementById("investmentsStatement").innerHTML += "<tr><td></td><td>Total Investments:</td><td></td><td>$" + parseFloat(investmentsTotal).toFixed(2) + "</td></tr>";
    
    // Remaining Investments
    if (((netIncome - savingsTotal - investmentsTotal) > 0) || ((netIncome - savingsTotal - investmentsTotal) < 0)) {
        if (document.getElementById("rightWrapper").childElementCount === 4) {
            document.getElementById("rightWrapper").removeChild(document.getElementById("rightWrapper").lastChild);
        }
        document.getElementById("rightWrapper").innerHTML += "<div class='card remainingNetIncome'><table id='investmentsStatement' class='font20'><tr><td>Remaining Net Income:</td><td>$" + parseFloat(netIncome - savingsTotal - investmentsTotal).toFixed(2) + "</td></tr></table></div>";
    }
    else {
        if (document.getElementById("rightWrapper").childElementCount === 4) {
            document.getElementById("rightWrapper").removeChild(document.getElementById("rightWrapper").lastChild);
        }
    }
    updateRatios();
}

function addIncome() {
    // Adding the item
    var incomeLineItem = [];
    incomeLineItem.push(document.getElementById("incomeName").value);
    incomeLineItem.push(parseFloat(document.getElementById("incomeAmount").value));
    income.push(incomeLineItem);
    // Update the statement
    updateIncomeStatement();
    // Reset inputs
    document.getElementById("incomeName").value = "Income Item";
    document.getElementById("incomeAmount").value = 0.00;
}

function addExpense() {
    // Adding the item
    var expenseLineItem = [];
    expenseLineItem.push(document.getElementById("expenseName").value);
    expenseLineItem.push(parseFloat(document.getElementById("expenseAmount").value));
    expenses.push(expenseLineItem);
    // Update the statement
    updateIncomeStatement();
    // Reset inputs
    document.getElementById("expenseName").value = "Expense Item";
    document.getElementById("expenseAmount").value = 0.00;
}

function addSavings() {
    // Adding the item
    var savingsLineItem = [];
    savingsLineItem.push(document.getElementById("savingsName").value);
    savingsLineItem.push(parseFloat(document.getElementById("savingsAmount").value));
    savings.push(savingsLineItem);
    // Update the statement
    updateIncomeStatement();
    // Reset inputs
    document.getElementById("savingsName").value = "Savings Item";
    document.getElementById("savingsAmount").value = 0.00;
}

function addInvestments() {
    // Adding the item
    var investmentsLineItem = [];
    investmentsLineItem.push(document.getElementById("investmentsName").value);
    investmentsLineItem.push(parseFloat(document.getElementById("investmentsAmount").value));
    investments.push(investmentsLineItem);
    // Update the statement
    updateIncomeStatement();
    // Reset inputs
    document.getElementById("investmentsName").value = "Investments Item";
    document.getElementById("investmentsAmount").value = 0.00;
}

function updateRatios() {
    savingsRatio();
    investmentsRatio();
    financialFreedom();
    maximumHousingBudget();
    lifeInsuranceValue();
    emergencyFundMinimum();
    incomePieChartUpdate();
    outflowPieChartUpdate();
}

function savingsRatio() {
    document.getElementById("savingsRatio").innerHTML = ("Savings Rate: " + parseFloat((savingsTotal/incomeTotal)*100).toFixed(2) + "%");
}

function investmentsRatio() {
    document.getElementById("investmentsRatio").innerHTML = ("Investments Rate: " + parseFloat((investmentsTotal/incomeTotal)*100).toFixed(2) + "%");
}

function financialFreedom() {
    if (isNaN((rentDividend)/expenseTotal)){
        document.getElementById("financialFreedom").innerHTML = ("Financial Freedom Completion: " + parseFloat(0.00).toFixed(2) + "%");
    }
    else if (((rentDividend)/expenseTotal) == Number.POSITIVE_INFINITY || ((rentDividend)/expenseTotal) == Number.NEGATIVE_INFINITY) {
        document.getElementById("financialFreedom").innerHTML = ("Financial Freedom Completion: " + parseFloat(100.00).toFixed(2) + "%");
    }
    else {
        document.getElementById("financialFreedom").innerHTML = ("Financial Freedom Completion: " + parseFloat(((rentDividend)/expenseTotal)*100).toFixed(2) + "%");
    }
}

function maximumHousingBudget() {
    document.getElementById("maximumHousingBudget").innerHTML = ("Maximum Monthly Housing Budget: $" + parseFloat((incomeTotal - taxes)/4).toFixed(2));
}

function lifeInsuranceValue() {
    document.getElementById("lifeInsuranceFaceValue").innerHTML = ("Life Insurance Face Value Minimum: $" + parseFloat(incomeTotal*144).toFixed(2));
}

function emergencyFundMinimum() {
    document.getElementById("emergencyFundMinimum").innerHTML = ("Emergency Fund Minimum (3 - 6 months of expenses): $" + parseFloat(expenseTotal*3).toFixed(2) + " - $" + parseFloat(expenseTotal*6).toFixed(2));
}

function incomePieChartUpdate() {
    var colorsArray = ["#800000", "#803A00", "#004D4D", "#006600", "#ffffff"];
    var categoryPercentages = [];
    var dataPoints = [];
    document.getElementById("incomeCategoryBreakdownTable").innerHTML = ("<tr><td></td><td style='width:135px;'>Income Breakdown:</td></tr>");
    var incomePieChartString = "conic-gradient(";
    
    for (var j = 0; j < income.length; j++) {
        categoryPercentages.push(income[j][1]/incomeTotal);
        if (j === 0) {
            dataPoints.push(parseFloat(categoryPercentages[j]*360));
            incomePieChartString += (colorsArray[j%(colorsArray.length-1)] + " 0deg " + dataPoints[j] + "deg");
        }
        else {
            dataPoints.push(parseFloat(categoryPercentages[j]*360) + dataPoints[j-1]);
            incomePieChartString += ("," + colorsArray[j%(colorsArray.length-1)] + " " + dataPoints[j-1] + "deg " + dataPoints[j] + "deg");
        }
        
        document.getElementById("incomeCategoryBreakdownTable").innerHTML += ("<tr><td style='background-color:" + (colorsArray[j%(colorsArray.length-1)]) + ";width:15px;'></td><td style='width:135px;'>" + income[j][0] + "</td><td>" + parseFloat(categoryPercentages[j]*100).toFixed(2) + "%</td></tr>");
    }
    incomePieChartString += (")");
    document.getElementById("incomePieChart").style["background"] = incomePieChartString;

}

function outflowPieChartUpdate() {
    var expensesColorsArray = ["#201100", "#473600", "#6e3b00", "#965000", "#bd6500", "#e47a00", "#0c0700", "#5b3100", "#824600", "#a95b00", "#d07000", "#f88400", "#ffa033"];
    var savingsColorsArray = ["#004D4D", "#007474", "#009b9b", "#00c3c3", "#00eaea"];
    var investmentsColorsArray = ["#003f00", "#006600", "#008d00", "#00b400", "#00dc00"];
    var categoryPercentages = [];
    var dataPoints = [];
    
    document.getElementById("expensesCategoryBreakdownTable").innerHTML = "<tr><td></td><td style='width:137px;'>Expense Breakdown:</td></tr>";
    document.getElementById("savingsCategoryBreakdownTable").innerHTML = "<tr><td></td><td style='width:135px;'>Savings Breakdown:</td></tr>";
    document.getElementById("investmentsCategoryBreakdownTable").innerHTML = "<tr><td></td><td style='width:179px;'>Investments Breakdown:</td></tr>";
    var outFlowPieChartString = "conic-gradient(";
    // Expenses
    for (var i = 0; i < expenses.length; i++){
        categoryPercentages.push(expenses[i][1]/incomeTotal);
        if (i === 0) {
            dataPoints.push(parseFloat(categoryPercentages[i]*360));
            outFlowPieChartString += (expensesColorsArray[i%(expensesColorsArray.length)] + " 0deg " + dataPoints[i] + "deg");
        }
        else {
            dataPoints.push(parseFloat(categoryPercentages[i]*360) + dataPoints[i-1]);
            outFlowPieChartString += ("," + expensesColorsArray[i%(expensesColorsArray.length)] + " " + dataPoints[i-1] + "deg " + dataPoints[i] + "deg");
        }
        document.getElementById("expensesCategoryBreakdownTable").innerHTML += ("<tr><td style='background-color:" + (expensesColorsArray[i%(expensesColorsArray.length)]) + ";width:15px;'></td><td style='width:137px;'>" + expenses[i][0] + "</td><td>" + parseFloat(categoryPercentages[i]*100).toFixed(2) + "%</td></tr>");
    }

    //savings
    for (var j = 0; j < savings.length; j++){
        var jBaseline = j + expenses.length;
        categoryPercentages.push(savings[j][1]/incomeTotal);
        if (jBaseline === 0) {
            dataPoints.push(parseFloat(categoryPercentages[jBaseline]*360));
            outFlowPieChartString += (savingsColorsArray[j%(savingsColorsArray.length)] + " 0deg " + dataPoints[jBaseline] + "deg");
        }
        else {
            dataPoints.push(parseFloat(categoryPercentages[jBaseline]*360) + dataPoints[jBaseline-1]);
            outFlowPieChartString += ("," + savingsColorsArray[j%(savingsColorsArray.length)] + " " + dataPoints[jBaseline-1] + "deg " + dataPoints[jBaseline] + "deg");
        }
        if (parseFloat(categoryPercentages[jBaseline]*100).toFixed(2) !== "0.00") {
            document.getElementById("savingsCategoryBreakdownTable").innerHTML += ("<tr><td style='background-color:" + (savingsColorsArray[j%(savingsColorsArray.length)]) + ";width:15px;'></td><td style='width:135px;'>" + savings[j][0] + "</td><td>" + parseFloat(categoryPercentages[jBaseline]*100).toFixed(2) + "%</td></tr>");
        }
    }
    //investments
    for (var k = 0; k < investments.length; k++){
        var kBaseline = k + expenses.length + savings.length;
        categoryPercentages.push(investments[k][1]/incomeTotal);
        if (kBaseline === 0) {
            dataPoints.push(parseFloat(categoryPercentages[kBaseline]*360));
            outFlowPieChartString += (investmentsColorsArray[k%(investmentsColorsArray.length)] + " 0deg " + dataPoints[kBaseline] + "deg");
        }
        else {
            dataPoints.push(parseFloat(categoryPercentages[kBaseline]*360) + dataPoints[(kBaseline)-1]);
            outFlowPieChartString += ("," + investmentsColorsArray[k%(investmentsColorsArray.length)] + " " + dataPoints[kBaseline-1] + "deg " + dataPoints[kBaseline] + "deg");
        }
        if (parseFloat(categoryPercentages[i + expenses.length]*100).toFixed(2) !== "0.00") {
            document.getElementById("investmentsCategoryBreakdownTable").innerHTML += ("<tr><td style='background-color:" + (investmentsColorsArray[k%(investmentsColorsArray.length)]) + ";width:15px;'></td><td style='width:179px;'>" + investments[k][0] + "</td><td>" + parseFloat(categoryPercentages[kBaseline]*100).toFixed(2) + "%</td></tr>");
        }
    }
    if (expenses.length > 0 || savings.length > 0 || investments.length > 0) {
        outFlowPieChartString += (",#ffffff " + dataPoints[expenses.length + savings.length + investments.length - 1] + "deg 360deg)");
    }
    else {
        outFlowPieChartString += (")");
    }
    document.getElementById("outflowPieChart").style["background"] = outFlowPieChartString;
}
