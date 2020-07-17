var assets = [];
var liabilities = [];

var assetTotal = 0.00;
var liabilitiesTotal = 0.00;

var retirementTotal = 0.00;
var individualInvestmentsTotal = 0.00;

var netWorth = 0.00;
var previousNetWorth = 0.00;

var age = 0;
var preTaxIncome = 0.00;

var retirementAge = 0;
var retirementAmount = 0.00;

function calculateNetWorth() {
    netWorth = assetTotal - liabilitiesTotal;
}

function calculateTotals() {
    if (assets.length > 0) {
        assetTotal = 0.0;
        for (var i = 0; i < assets.length; i++) {
            assetTotal += assets[i][1];
        }
    }
    if (liabilities.length > 0) {
        liabilitiesTotal = 0.0;
        for (var j = 0; j < liabilities.length; j++) {
            liabilitiesTotal += liabilities[j][1];
        }
    }
    calculateNetWorth();
}

function addAsset() {
    // Adding the item
    var assetLineItem = [];
    assetLineItem.push(document.getElementById("assetName").value);
    assetLineItem.push(parseFloat(document.getElementById("assetAmount").value));
    var elem = document.getElementById("assetCategory");
    var value = elem.options[elem.selectedIndex].value;
    assetLineItem.push(value);
    assets.push(assetLineItem);
    calculateTotals();
    // Update the statement
    updateBalanceSheet();
    
    // Reset inputs
    document.getElementById("assetName").value = "Asset Item";
    document.getElementById("assetAmount").value = 0.00;
}

function addLiability() {
    // Adding the item
    var liabilityLineItem = [];
    liabilityLineItem.push(document.getElementById("liabilityName").value);
    liabilityLineItem.push(parseFloat(document.getElementById("liabilityAmount").value));
    var elem = document.getElementById("liabilityCategory");
    var value = elem.options[elem.selectedIndex].value;
    liabilityLineItem.push(value);
    liabilities.push(liabilityLineItem);
    calculateTotals();
    // Update the statement
    updateBalanceSheet();
    
    // Reset inputs
    document.getElementById("liabilityName").value = "Liability Item";
    document.getElementById("liabilityAmount").value = 0.00;
}

function updateAssets() {
    document.getElementById("assetsTable").innerHTML = "<tr><td>Assets:</td></tr>";
    var cashList = "";
    var realEstateList = "";
    var retirementList = "";
    var individualInvestingList = "";
    retirementTotal = 0.00;
    individualInvestmentsTotal = 0.00;
    if (assets.length > 0) {
        for (var i = 0; i < assets.length; i++) {
            if (assets[i][2] === "Cash/Cash Equivalent") {
                cashList += "<tr><td>Cash/Cash Equivalent</td><td>" + assets[i][0] + "</td><td>$" + parseFloat(assets[i][1]).toFixed(2) + "</td><td></td></tr>";
            }
            else if (assets[i][2] === "Real Estate") {
                realEstateList += "<tr><td>Real Estate</td><td>" + assets[i][0] + "</td><td>$" + parseFloat(assets[i][1]).toFixed(2) + "</td><td></td></tr>";
            }
            else if (assets[i][2] === "Retirement") {
                retirementList += "<tr><td>Retirement</td><td>" + assets[i][0] + "</td><td>$" + parseFloat(assets[i][1]).toFixed(2) + "</td><td></td></tr>";
                retirementTotal += assets[i][1];
                updateRetireToday();
            }
            else if (assets[i][2] === "Individual Investing") {
                individualInvestingList += "<tr><td>Individual Investing</td><td>" + assets[i][0] + "</td><td>$" + parseFloat(assets[i][1]).toFixed(2) + "</td><td></td></tr>";
                individualInvestmentsTotal += assets[i][1];
            }

        }
    }
    document.getElementById("assetsTable").innerHTML += (cashList + realEstateList + retirementList + individualInvestingList);
    document.getElementById("assetsTable").innerHTML += "<tr><td></td><td>Total Assets:</td><td></td><td>$" + parseFloat(assetTotal).toFixed(2) + "</td></tr>";
    updateInvestAssetRatio();
}

function updateLiabilites() {
    document.getElementById("liabilitiesTable").innerHTML = "<tr><td>Liabilities:</td></tr>";

    var mortgageList = "";
    var carList = "";
    var creditCardList = "";
    var personalLoanList = "";
    var studentLoanList = "";
    if (liabilities.length > 0) {
        for (var i = 0; i < liabilities.length; i++) {
            if (liabilities[i][2] === "Mortgage") {
                mortgageList += "<tr><td>Mortgage</td><td>" + liabilities[i][0] + "</td><td>$" + parseFloat(liabilities[i][1]).toFixed(2) + "</td><td></td></tr>";
            }
            else if (liabilities[i][2] === "Car") {
                carList += "<tr><td>Car</td><td>" + liabilities[i][0] + "</td><td>$" + parseFloat(liabilities[i][1]).toFixed(2) + "</td><td></td></tr>";
            }
            else if (liabilities[i][2] === "Credit Cards") {
                creditCardList += "<tr><td>Credit Cards</td><td>" + liabilities[i][0] + "</td><td>$" + parseFloat(liabilities[i][1]).toFixed(2) + "</td><td></td></tr>";
            }
            else if (liabilities[i][2] === "Personal Loans") {
                studentLoanList += "<tr><td>Personal Loans</td><td>" + liabilities[i][0] + "</td><td>$" + parseFloat(liabilities[i][1]).toFixed(2) + "</td><td></td></tr>";
            }
            else if (liabilities[i][2] === "Student Loans") {
                studentLoanList += "<tr><td>Student Loans</td><td>" + liabilities[i][0] + "</td><td>$" + parseFloat(liabilities[i][1]).toFixed(2) + "</td><td></td></tr>";
            }
            
        }
    }
    
    document.getElementById("liabilitiesTable").innerHTML += (mortgageList + carList + creditCardList + personalLoanList + studentLoanList);
    
    document.getElementById("liabilitiesTable").innerHTML += "<tr><td></td><td>Total Liabilities:</td><td></td><td>$" + parseFloat(liabilitiesTotal).toFixed(2) + "</td></tr>";
}

function updateNetWorth() {
    document.getElementById("netWorth").innerHTML = "Net Worth: $" + parseFloat(netWorth).toFixed(2);
    document.getElementById("currentNetWorth").innerHTML = "Current Net Worth: $" + parseFloat(netWorth).toFixed(2);
    updateNetWorthChange();
    updateBenchmarkNetWorth();
    updateDebtAssetRatio();
    updateRetirementGoalResults();
}

function updateBalanceSheet() {
    updateAssets();
    updateLiabilites();
    updateNetWorth();
}

function updatePreviousNetWorth() {
    previousNetWorth = parseFloat(document.getElementById("previousNetWorthInput").value);
    updateNetWorthChange();
}

function updateNetWorthChange() {
    var netWorthChange = netWorth - previousNetWorth;
    var increasedDecreased = "did not change.";
    var increaseDecrease = "";
    var netWorthChangePercent = (Math.abs(netWorthChange)/previousNetWorth)*100;
    if (netWorthChange > 0) {
        increasedDecreased = "increased";
        increaseDecrease = "increase";
    }
    else if (netWorthChange < 0) {
        increasedDecreased = "decreased";
        increaseDecrease = "decrease";
    }
    else {
        document.getElementById("netWorthChange").innerHTML = "Your net worth " + increasedDecreased;
    }
    document.getElementById("netWorthChange").innerHTML = "Your net worth " + increasedDecreased + " by $" + parseFloat(netWorthChange).toFixed(2) + " which is an " + increaseDecrease + " of " + parseFloat(netWorthChangePercent).toFixed(2) + "%";
}

function updateAge() {
    age = document.getElementById("ageInput").value;
    updateBenchmarkNetWorth();
    updateRetirementGoalResults();
    updateFutureValue();
}

function updatePreTaxIncome() {
    preTaxIncome = document.getElementById("preTaxIncomeInput").value;
    updateBenchmarkNetWorth();
}

function updateBenchmarkNetWorth() {
    var benchmarkNetWorth = parseFloat((age * preTaxIncome)/10).toFixed(2);
    document.getElementById("benchmarkNetWorth").innerHTML = "Benchmark Net Worth: $" + benchmarkNetWorth;
    
    if (netWorth < (benchmarkNetWorth/2)) {
        document.getElementById("benchmarkNetWorth").innerHTML += ". Under accumulators of wealth (UAWs) are those whose real net worth is less than one-half of their expected net worth."
    }
    else if (netWorth <= benchmarkNetWorth) {
        document.getElementById("benchmarkNetWorth").innerHTML += ". Average accumulators of wealth (AAW) are on par with their expected net worth."
    }
    else {
        document.getElementById("benchmarkNetWorth").innerHTML += ". Prodigious accumulators of wealth (PAWs) have a net worth twice their expected level."
    }
}

function updateDebtAssetRatio() {
    document.getElementById("debtAssetRatio").innerHTML = "Debt/Assets: " + parseFloat((liabilitiesTotal / assetTotal) * 100).toFixed(2) + "%";
}

function updateInvestAssetRatio() {
    document.getElementById("investedOfAssets").innerHTML = "Invested/Assets: " + parseFloat(((retirementTotal + individualInvestmentsTotal) / assetTotal) * 100).toFixed(2) + "%";
}

function updateRetirementAge() {
    retirementAge = document.getElementById("retirementAgeInput").value;
    updateRetirementGoalResults();
    updateFutureValue();
}

function updateRetirementAmount() {
    retirementAmount = document.getElementById("retirementAmountInput").value;
    updateRetirementGoalResults();
}

function updateRetirementGoalResults() {
    document.getElementById("retirementGoalResults").innerHTML = "which means I have " + (retirementAge - age) + " year(s) to earn $" + parseFloat(retirementAmount - retirementTotal).toFixed(2) + " which is an average of $" + (parseFloat((retirementAmount - retirementTotal)/(retirementAge - age)).toFixed(2)) + " per year.";
}

function updateFutureValue() {
    var interest = document.getElementById("futureValueInterestInput").value/100;
    document.getElementById("futureValueResult").innerHTML = "$" + parseFloat(1 * Math.pow((1+interest),(retirementAge-age))).toFixed(2);
}

function updateRetireToday() {
    var fivePercentAnnual = retirementTotal*.05;
    document.getElementById("retireToday").innerHTML = "If I were to retire today I could withdraw $" + (parseFloat(fivePercentAnnual/12).toFixed(2)) + " from my retirement accounts which is 5% of the account a month or $" + (parseFloat(fivePercentAnnual).toFixed(2)) + " a year.";
}
