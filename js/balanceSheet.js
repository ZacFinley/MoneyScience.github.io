var assets = [];
var liabilities = [];

var assetTotal = 0.00;
var liabilitiesTotal = 0.00;
var netWorth = 0.00;

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
}

function updateBalanceSheet() {
    updateAssets();
    updateLiabilites();
    updateNetWorth();
}


