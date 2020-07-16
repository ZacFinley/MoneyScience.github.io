var assets = [];
var liabilities = [];

var assetTotal = 0.00;
var liabilitiesTotal = 0.00;

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
    
    if (assets.length > 0) {
        for (var i = 0; i < assets.length; i++) {
            document.getElementById("assetsTable").innerHTML += "<tr><td></td><td>" + assets[i][0] + "</td><td>$" + parseFloat(assets[i][1]).toFixed(2) + "</td><td></td></tr>";
        }
    }
    
    document.getElementById("assetsTable").innerHTML += "<tr><td></td><td>Total Assets:</td><td></td><td>$" + parseFloat(assetTotal).toFixed(2) + "</td></tr>";
}

function updateLiabilites() {
    document.getElementById("liabilitiesTable").innerHTML = "<tr><td>Liabilities:</td></tr>";
    
    if (liabilities.length > 0) {
        for (var i = 0; i < liabilities.length; i++) {
            document.getElementById("liabilitiesTable").innerHTML += "<tr><td></td><td>" + liabilities[i][0] + "</td><td>$" + parseFloat(liabilities[i][1]).toFixed(2) + "</td><td></td></tr>";
        }
    }
    
    document.getElementById("liabilitiesTable").innerHTML += "<tr><td></td><td>Total Liabilities:</td><td></td><td>$" + parseFloat(liabilitiesTotal).toFixed(2) + "</td></tr>";
}

function updateNetWorth() {
    document.getElementById("netWorth").innerHTML = "Net Worth: $" + parseFloat(netWorth).toFixed(2);
    document.getElementById("currentNetWorth").innerHTML = "Current Net Worth: $" + parseFloat(netWorth).toFixed(2);
    updateNetWorthChange();
    updateBenchmarkNetWorth();
    updateDebtAssetRatio();
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
    document.getElementById("debtAssetRatio").innerHTML = "Debt/Asset Ratio: " + parseFloat((liabilitiesTotal / assetTotal) * 100).toFixed(2) + "%";
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
    document.getElementById("retirementGoalResults").innerHTML = "which means I have " + (retirementAge - age) + " year(s) to earn $" + parseFloat(retirementAmount - netWorth).toFixed(2) + " which is an average of $" + (parseFloat((retirementAmount - netWorth)/(retirementAge - age)).toFixed(2)) + " per year. (using net worth instead of retirement category change when categories are created).";
}

function updateFutureValue() {
    var interest = document.getElementById("futureValueInterestInput").value/100;
    document.getElementById("futureValueResult").innerHTML = "$" + parseFloat(1 * Math.pow((1+interest),(retirementAge-age))).toFixed(2);
}

