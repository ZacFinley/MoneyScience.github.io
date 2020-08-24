var income = [];
var expenses = [];
var savings = [];
var investments = [];

var incomeTotal = 0.00;
var expenseTotal = 0.00;
var savingsTotal = 0.00;
var investmentsTotal = 0.00;

// income categories
var salaryCategory = 0.00;
var sideCategory = 0.00;
var dividedCategory = 0.00;
var rentalCategory = 0.00;

// expense categories
var federalTaxCategory = 0.00;
var stateTaxCategory = 0.00;
var medicareTaxCategory = 0.00;
var socialSecurityTaxCategory = 0.00;
var transportationCategory = 0.00;
var rentMortgageCategory = 0.00;
var foodCategory = 0.00;
var utilitiesCategory = 0.00;
var insuranceCategory = 0.00;
var technologyCategory = 0.00;
var entertainmentCategory = 0.00;
var houseMaintenanceCategory = 0.00;
var petsCategory = 0.00;

var netIncome = 0.00;

function calculateTotals() {
    if (income.length > 0){
        incomeTotal = 0;
        salaryCategory = 0.00;
        sideCategory = 0.00;
        dividedCategory = 0.00;
        rentalCategory = 0.00;
        for(var i = 0; i < income.length; i++){
            switch (income[i][1]) {
                case "Salary": salaryCategory += income[i][2];
                    break;
                case "Side": sideCategory += income[i][2];
                    break;
                case "Dividend": dividedCategory += income[i][2];
                    break;
                case "Rental": rentalCategory += income[i][2];
                    break;
            }
            incomeTotal += income[i][2];
        }
    }
    if (expenses.length > 0){
        expenseTotal = 0;
        federalTaxCategory = 0.00;
        stateTaxCategory = 0.00;
        medicareTaxCategory = 0.00;
        socialSecurityTaxCategory = 0.00;
        transportationCategory = 0.00;
        rentMortgageCategory = 0.00;
        foodCategory = 0.00;
        utilitiesCategory = 0.00;
        insuranceCategory = 0.00;
        technologyCategory = 0.00;
        entertainmentCategory = 0.00;
        houseMaintenanceCategory = 0.00;
        petsCategory = 0.00;
        for(var j = 0; j < expenses.length; j++){
            switch (expenses[j][1]) {
                case "Federal Tax": federalTaxCategory += expenses[j][2];
                    break;
                case "State Tax": stateTaxCategory += expenses[j][2];
                    break;
                case "Medicare Tax": medicareTaxCategory += expenses[j][2];
                    break;
                case "Social Security Tax": socialSecurityTaxCategory += expenses[j][2];
                    break;
                case "Transportation": transportationCategory += expenses[j][2];
                    break;
                case "Rent/Mortgage": rentMortgageCategory += expenses[j][2];
                    break;
                case "Food": foodCategory += expenses[j][2];
                    break;
                case "Utilities": utilitiesCategory += expenses[j][2];
                    break;
                case "Insurance": insuranceCategory += expenses[j][2];
                    break;
                case "Technology": technologyCategory += expenses[j][2];
                    break;
                case "Entertainment": entertainmentCategory += expenses[j][2];
                    break;
                case "House Maintenance": houseMaintenanceCategory += expenses[j][2];
                    break;
                case "Pets": petsCategory += expenses[j][2];
                    break;
            }
            expenseTotal += expenses[j][2];
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
            document.getElementById("incomeStatement").innerHTML += "<tr><td></td><td>" + income[i][0] + "</td><td>" + income[i][1] + "</td><td>$" + parseFloat(income[i][2]).toFixed(2) + "</td><td></td></tr>";
        }
    }
    
    // Total income
    document.getElementById("incomeStatement").innerHTML += "<tr><td></td><td>Total Income:</td><td></td><td>$" + parseFloat(incomeTotal).toFixed(2) + "</td></tr>";
    
    // Expense header
    document.getElementById("incomeStatement").innerHTML += "<tr><td>Expenses:</td></tr>";
    
    // Expense line items
    if (expenses.length > 0){
        for (var i = 0; i < expenses.length; i++) {
            document.getElementById("incomeStatement").innerHTML += "<tr><td></td><td>" + expenses[i][0] + "</td><td>" + expenses[i][1] + "</td><td>$" + parseFloat(expenses[i][2]).toFixed(2) + "</td><td></td></tr>";
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
    incomeLineItem.push(document.getElementById("incomeCategory").value);
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
    expenseLineItem.push(document.getElementById("expenseCategory").value);
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
    if (isNaN((dividedCategory+rentalCategory)/expenseTotal)){
        document.getElementById("financialFreedom").innerHTML = ("Financial Freedom Completion: " + parseFloat(0.00).toFixed(2) + "%");
    }
    else if (((dividedCategory+rentalCategory)/expenseTotal) == Number.POSITIVE_INFINITY || ((dividedCategory+rentalCategory)/expenseTotal) == Number.NEGATIVE_INFINITY) {
        document.getElementById("financialFreedom").innerHTML = ("Financial Freedom Completion: " + parseFloat(100.00).toFixed(2) + "%");
    }
    else {
        document.getElementById("financialFreedom").innerHTML = ("Financial Freedom Completion: " + parseFloat(((dividedCategory+rentalCategory)/expenseTotal)*100).toFixed(2) + "%");
    }
}

function maximumHousingBudget() {
    document.getElementById("maximumHousingBudget").innerHTML = ("Maximum Monthly Housing Budget: $" + parseFloat((incomeTotal - federalTaxCategory - stateTaxCategory - medicareTaxCategory - socialSecurityTaxCategory)/4).toFixed(2));
}

function lifeInsuranceValue() {
    document.getElementById("lifeInsuranceFaceValue").innerHTML = ("Life Insurance Face Value Minimum: $" + parseFloat(incomeTotal*144).toFixed(2));
}

function emergencyFundMinimum() {
    document.getElementById("emergencyFundMinimum").innerHTML = ("Emergency Fund Minimum (3 - 6 months of expenses): $" + parseFloat(expenseTotal*3).toFixed(2) + " - $" + parseFloat(expenseTotal*6).toFixed(2));
}

function incomePieChartUpdate() {
    var categoryPercentages = [(salaryCategory/incomeTotal)];
    categoryPercentages.push(sideCategory/incomeTotal);
    categoryPercentages.push(dividedCategory/incomeTotal);
    categoryPercentages.push(rentalCategory/incomeTotal);
    
    var dataPoints = [parseFloat(categoryPercentages[0]*360)];
    dataPoints.push(parseFloat(categoryPercentages[1]*360) + dataPoints[0]);
    dataPoints.push(parseFloat(categoryPercentages[2]*360) + dataPoints[1]);
    dataPoints.push(parseFloat(categoryPercentages[3]*360) + dataPoints[2]);
    
    document.getElementById("salaryCategoryBreakdown").innerHTML = (parseFloat(categoryPercentages[0]*100).toFixed(2) + "%");
    document.getElementById("sideCategoryBreakdown").innerHTML = (parseFloat(categoryPercentages[1]*100).toFixed(2) + "%");
    document.getElementById("dividendCategoryBreakdown").innerHTML = (parseFloat(categoryPercentages[2]*100).toFixed(2) + "%");
    document.getElementById("rentalCategoryBreakdown").innerHTML = (parseFloat(categoryPercentages[3]*100).toFixed(2) + "%");
    document.getElementById("otherCategoryBreakdown").innerHTML = (parseFloat((1 - categoryPercentages[0] - categoryPercentages[1] - categoryPercentages[2] - categoryPercentages[3])*100).toFixed(2) + "%");
    
    document.getElementById("incomePieChart").style["background"] = "conic-gradient(#800000 " + dataPoints[0] + "deg,#803A00 " + dataPoints[0] + "deg " + dataPoints[1] + "deg,#004D4D " + dataPoints[1] + "deg " + dataPoints[2] + "deg,#006600 " + dataPoints[2] + "deg " + dataPoints[3] + "deg,#ffffff " + dataPoints[3] + "deg 360deg)";
}

function outflowPieChartUpdate() {
    var categoryPercentages = [(federalTaxCategory/incomeTotal)];
    categoryPercentages.push(stateTaxCategory/incomeTotal);
    categoryPercentages.push(medicareTaxCategory/incomeTotal);
    categoryPercentages.push(socialSecurityTaxCategory/incomeTotal);
    categoryPercentages.push(transportationCategory/incomeTotal);
    categoryPercentages.push(rentMortgageCategory/incomeTotal);
    categoryPercentages.push(foodCategory/incomeTotal);
    categoryPercentages.push(utilitiesCategory/incomeTotal);
    categoryPercentages.push(insuranceCategory/incomeTotal);
    categoryPercentages.push(technologyCategory/incomeTotal);
    categoryPercentages.push(entertainmentCategory/incomeTotal);
    categoryPercentages.push(houseMaintenanceCategory/incomeTotal);
    categoryPercentages.push(petsCategory/incomeTotal);
    //savings
    categoryPercentages.push(savingsTotal/incomeTotal);
    //investments
    categoryPercentages.push(investmentsTotal/incomeTotal);
    
    var dataPoints = [parseFloat(categoryPercentages[0]*360)];
    dataPoints.push(parseFloat(categoryPercentages[1]*360) + dataPoints[0]);
    dataPoints.push(parseFloat(categoryPercentages[2]*360) + dataPoints[1]);
    dataPoints.push(parseFloat(categoryPercentages[3]*360) + dataPoints[2]);
    dataPoints.push(parseFloat(categoryPercentages[4]*360) + dataPoints[3]);
    dataPoints.push(parseFloat(categoryPercentages[5]*360) + dataPoints[4]);
    dataPoints.push(parseFloat(categoryPercentages[6]*360) + dataPoints[5]);
    dataPoints.push(parseFloat(categoryPercentages[7]*360) + dataPoints[6]);
    dataPoints.push(parseFloat(categoryPercentages[8]*360) + dataPoints[7]);
    dataPoints.push(parseFloat(categoryPercentages[9]*360) + dataPoints[8]);
    dataPoints.push(parseFloat(categoryPercentages[10]*360) + dataPoints[9]);
    dataPoints.push(parseFloat(categoryPercentages[11]*360) + dataPoints[10]);
    dataPoints.push(parseFloat(categoryPercentages[12]*360) + dataPoints[11]);
    dataPoints.push(parseFloat(categoryPercentages[13]*360) + dataPoints[12]);
    dataPoints.push(parseFloat(categoryPercentages[14]*360) + dataPoints[13]);
    
    document.getElementById("fedTaxCategoryBreakdown").innerHTML = (parseFloat(categoryPercentages[0]*100).toFixed(2) + "%");
    document.getElementById("stateTaxCategoryBreakdown").innerHTML = (parseFloat(categoryPercentages[1]*100).toFixed(2) + "%");
    document.getElementById("medTaxCategoryBreakdown").innerHTML = (parseFloat(categoryPercentages[2]*100).toFixed(2) + "%");
    document.getElementById("ssTaxCategoryBreakdown").innerHTML = (parseFloat(categoryPercentages[3]*100).toFixed(2) + "%");
    document.getElementById("transportationCategoryBreakdown").innerHTML = (parseFloat(categoryPercentages[4]*100).toFixed(2) + "%");
    document.getElementById("rentMortgageCategoryBreakdown").innerHTML = (parseFloat(categoryPercentages[5]*100).toFixed(2) + "%");
    document.getElementById("foodCategoryBreakdown").innerHTML = (parseFloat(categoryPercentages[6]*100).toFixed(2) + "%");
    document.getElementById("utilitiesCategoryBreakdown").innerHTML = (parseFloat(categoryPercentages[7]*100).toFixed(2) + "%");
    document.getElementById("insuranceCategoryBreakdown").innerHTML = (parseFloat(categoryPercentages[8]*100).toFixed(2) + "%");
    document.getElementById("technologyCategoryBreakdown").innerHTML = (parseFloat(categoryPercentages[9]*100).toFixed(2) + "%");
    document.getElementById("entertainmentCategoryBreakdown").innerHTML = (parseFloat(categoryPercentages[10]*100).toFixed(2) + "%");
    document.getElementById("houseMaintCategoryBreakdown").innerHTML = (parseFloat(categoryPercentages[11]*100).toFixed(2) + "%");
    document.getElementById("petCategoryBreakdown").innerHTML = (parseFloat(categoryPercentages[12]*100).toFixed(2) + "%");
    document.getElementById("savingsCategoryBreakdown").innerHTML = (parseFloat(categoryPercentages[13]*100).toFixed(2) + "%");
    document.getElementById("investmentsCategoryBreakdown").innerHTML = (parseFloat(categoryPercentages[14]*100).toFixed(2) + "%");
    
    document.getElementById("outflowPieChart").style["background"] = "conic-gradient(#201100 " + dataPoints[0] + "deg," +
    "#473600 " + dataPoints[0] + "deg " + dataPoints[1] + "deg," +
    "#6e3b00 " + dataPoints[1] + "deg " + dataPoints[2] + "deg," +
    "#965000 " + dataPoints[2] + "deg " + dataPoints[3] + "deg," +
    "#bd6500 " + dataPoints[3] + "deg " + dataPoints[4] + "deg," +
    "#e47a00 " + dataPoints[4] + "deg " + dataPoints[5] + "deg," +
    "#0c0700 " + dataPoints[5] + "deg " + dataPoints[6] + "deg," +
    "#5b3100 " + dataPoints[6] + "deg " + dataPoints[7] + "deg," +
    "#824600 " + dataPoints[7] + "deg " + dataPoints[8] + "deg," +
    "#a95b00 " + dataPoints[8] + "deg " + dataPoints[9] + "deg," +
    "#d07000 " + dataPoints[9] + "deg " + dataPoints[10] + "deg," +
    "#f88400 " + dataPoints[10] + "deg " + dataPoints[11] + "deg," +
    "#ffa033 " + dataPoints[11] + "deg " + dataPoints[12] + "deg," +
    "#004D4D " + dataPoints[12] + "deg " + dataPoints[13] + "deg," +
    "#006600 " + dataPoints[13] + "deg " + dataPoints[14] + "deg," +
    "#ffffff " + dataPoints[14] + "deg 360deg)";
}
