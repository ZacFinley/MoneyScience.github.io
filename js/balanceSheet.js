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
            liabilitiesTotal += liabilities[i][1];
        }
    }
    calculateNetWorth();
}

function addAsset() {
    // Adding the item
    var assetLineItem = [];
    assetLineItem.push(document.getElementById("assetName").value);
    assetLineItem.push(parseFloat(document.getElementById("assetAmount").value).toFixed(2));
    assets.push(assetLineItem);
    
    // Update the statement
    updateBalanceSheet();
    
    // Reset inputs
    document.getElementById("assetName").value = "Asset Item";
    document.getElementById("assetAmount").value = 0.00;
}

function addLiability() {
    // Adding the item
    var liabilityLineItem = [];
    liabilityLineItem.push(document.getElementById("assetName").value);
    liabilityLineItem.push(parseFloat(document.getElementById("assetAmount").value).toFixed(2));
    liabilities.push(liabilityLineItem);
    
    // Update the statement
    updateBalanceSheet();
    
    // Reset inputs
    document.getElementById("liabilityName").value = "Liability Item";
    document.getElementById("liabilityAmount").value = 0.00;
}

function updateAssets() {
    
}

function updateLiabilites() {
    
}

function updateNetWorth() {
    
}

function updateBalanceSheet() {
    updateAssets();
    updateLiabilites();
    updateNetWorth();
}


