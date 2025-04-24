const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("uploadButton");

//global variables
commonSecurityMap = new Map();
accountMonthDividendPerShareArray = [0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
accountMonthDividendTotalArray = [0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
monthNameArray = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function resetAccountMonthDividendTotalArray(){
    accountMonthDividendPerShareArray = [0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
    accountMonthDividendTotalArray = [0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
}

function numberWithCommas(number) {
    return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(number);
}

function parseCommonSecurityList(dataSecObjList) {
    for (let listObj of dataSecObjList) {
        commonSecurityMap.set(listObj.securityTicker, listObj)
        delete commonSecurityMap.get(listObj.securityTicker).securityTicker;
    }
}

function parseAccount(dataAcctObjList) {
    getTotalAccountValue(dataAcctObjList);
    result = "";
    for (let listObj of dataAcctObjList) {
        if (listObj.accountType === 'SECURITIES') {
            resetAccountMonthDividendTotalArray();
            result += "<div class='card'>";
            result += "<div class='accountName'>Account Name: " + listObj.accountName + "</div>";
            result += parseSecurity(listObj.securities, listObj.accountBalance);
            result += "<br>";
            result += "<div class='cashBalance'>Account Cash Balance: " + numberWithCommas(listObj.accountCashBalance) + "</div>";
            result += ("<div class='totalBalance'>Account Balance: " + numberWithCommas(listObj.accountBalance) + "</div>");
            result += "<br>";
            result += createDividendCard(accountMonthDividendPerShareArray, accountMonthDividendTotalArray);
            result += "<br>";
            result += getAvailableOrderScenarios(listObj);
            result += "</div>";
        }
    }
    return result;
}

function parseSecurity(dataSecuritiesObjList, acctBalance) {
    let result = "";
    for (let listObj of dataSecuritiesObjList) {
        result += "<div class='card'>";
        result += "Security Name: " + getSecurityName(listObj) + "<br>";
        result += "Security " + listObj.securityIdentifierType + ": " + listObj.securityIdentifier + "<br>";
        result += "Security Price: " + numberWithCommas(getSecurityPrice(listObj)) + "<br>";
        result += "Security Shares: " + getSecurityShares(listObj) + "<br>";
        result += "Security Total Cost: " + numberWithCommas(listObj.securityTotalCost) + "<br>";
        result += "Security Total Value: " + numberWithCommas(listObj.securityTotalValue) + "<br>";
        result += "Security Goal Percentage: " + (listObj.securityGoalPercentage * 100) + "%<br>";
        listObj["securityActualPercentage"] = (listObj.securityTotalValue / acctBalance);
        result += "Security Actual Percentage: " + (listObj.securityActualPercentage * 100).toFixed(4) + "%<br>";
        if (listObj.securityType === 'ETF' || listObj.securityType === 'COMPANY') {
            result += calculateDividendInfo(listObj.securityShares, commonSecurityMap.get(listObj.securityIdentifier).securityDividendSchedule);
            result += createSecurityBuySellIndicator(listObj.securityTotalCost, commonSecurityMap.get(listObj.securityIdentifier).securityPrice, listObj.securityShares, listObj.securityGoalPercentage, listObj.securityActualPercentage, acctBalance);
        }
        result += "</div>";
    }
    return result;
}

function getSecurityName(securityObj) {
    if (securityObj.securityIdentifierType === 'TICKER') {
        return commonSecurityMap.get(securityObj.securityIdentifier).securityName;
    } else {
        return securityObj.securityIdentifierType + " - " + securityObj.securityIdentifier;
    }
}

function getSecurityPrice(securityObj) {
    if (securityObj.securityType === 'ETF' || securityObj.securityType === 'COMPANY') {
        return commonSecurityMap.get(securityObj.securityIdentifier).securityPrice;
    } else if (securityObj.securityType === 'T-BILL'){
        return securityObj.securityMaturityValue;
    } else {
        return 'N/A'
    }
}

function getSecurityShares(securityObj) {
    if (securityObj.securityType === 'ETF' || securityObj.securityType === 'COMPANY') {
        return securityObj.securityShares;
    } else {
        return 'N/A'
    }
}

function calculateDividendInfo(shareQty, dividendSchedule) {
    let dividendPerShareArray = [0,0,0,0,0,0,0,0,0,0,0,0];
    let dividendTotalArray = [0,0,0,0,0,0,0,0,0,0,0,0];
    // Data Row Total Month Dividend per Share
    // Data Row Total Month Dividend
    for (let j = 0; j < dividendSchedule.length; j++) {
        dividendPerShareArray[j] += dividendSchedule[j];
        accountMonthDividendPerShareArray[j] += dividendSchedule[j];
        let monthDividendTotal = shareQty * dividendSchedule[j];
        dividendTotalArray[j] += monthDividendTotal;
        accountMonthDividendTotalArray[j] += monthDividendTotal;
    }
    return createDividendCard(dividendPerShareArray, dividendTotalArray);
}


function createDividendCard(dividendPerShareArray, dividendTotalArray) {
    let annualDividendTotal = 0.00;
    let result = "<div class='card' style='background-color: deepskyblue; color: white; border-radius: 25px;'>";
    // Header Row
    result += "<table>";
    result += "<tr>";
    for (month of monthNameArray){
        result += "<th>" + month + "</th>";
    }
    result += "</tr>";
    
    // Data Row Total Month Dividend per Share
    result += "<tr><td>Per Share</td>";
    for (divPerShare of dividendPerShareArray) {
        result += "<td>" + numberWithCommas(divPerShare) + "</td>";
    }
    result += "</tr>";
    
    // Data Row Total Month Dividend
    result += "<tr><td>Total Div</td>";
    for (divTotal of dividendTotalArray) {
        result += "<td>" + numberWithCommas(divTotal) + "</td>";
        annualDividendTotal += divTotal;
    }
    result += "</tr>";
    result += "</table>";
    
    result += "<div style='text-align: center;'>"
    result += "Average Monthly Dividend: " + numberWithCommas(annualDividendTotal/12) + "<br>";
    result += "Total Annual Dividend: " + numberWithCommas(annualDividendTotal) + "<br>";
    // Make this a chart
    result += "Dividend Tax @ 24%: " + numberWithCommas(annualDividendTotal*.24) + "<br>";
    result += "Dividend Tax @ 15%: " + numberWithCommas(annualDividendTotal*.15) + "<br>";
    result += "</div>";
    result += "</div>";
    return result;
}

function createSecurityBuySellIndicator(totalCost, currentPricePerShare, shareQty, goalPercentage, actualPercentage, acctBalance) {
    let costPerShare = totalCost / shareQty;
    let priceDifference = currentPricePerShare-costPerShare;
    let shouldBuy = (costPerShare > currentPricePerShare) && (goalPercentage > actualPercentage);
    let totalValue = currentPricePerShare * shareQty;
    let amountToReachGoal = (acctBalance * goalPercentage) - totalValue;
    let sharePrice = costPerShare > currentPricePerShare ? currentPricePerShare : costPerShare;
    let result = "<div class='card' " + (shouldBuy ? "style='background-color: lawngreen;'" : "style='background-color: red; color: white;'") + ">";
    result += "<div style='text-align: center;'>"
    result += "Cost per Share: " + numberWithCommas(costPerShare) + "<br>";
    result += "Current Price per Share: " + numberWithCommas(currentPricePerShare) + "<br>";
    result += "The Current Price per Share has " + (costPerShare < currentPricePerShare ? "INCREASED" : "DECREASED") + " by " + numberWithCommas(Math.abs(priceDifference)) + " or " + (Math.abs(priceDifference)/costPerShare*100).toFixed(2) + "% from the Average Cost.<br>";
    result += "<br>";
    result += "Goal Percentage is " + (goalPercentage > actualPercentage ? "higher" : "lower") + " than the Actual Percentage.<br>";
    result += "<br>";
    result += shouldBuy ? "BUY" : "HOLD";
    result += "<br>";
    if (amountToReachGoal > 0) {
        result += "Amount to reach goal: " + numberWithCommas(amountToReachGoal) + "<br>";
        result += "You should buy " + (amountToReachGoal/sharePrice).toFixed(2) + " shares at " + numberWithCommas(sharePrice) + "<br>";
        result += "<br>";
        result += "You could buy " + (amountToReachGoal/costPerShare).toFixed(2) + " shares at " + numberWithCommas(costPerShare) + " (Avg Cost per Share).<br>";
        result += "You could buy " + (amountToReachGoal/currentPricePerShare).toFixed(2) + " shares at " + numberWithCommas(currentPricePerShare) + " (Current Price per Share).<br>";
    }
    result += "</div>";
    result += "</div>";
    return result;
}

function getTotalAccountValue(dataAcctObjList) {
    for (let acctListObj of dataAcctObjList) {
        acctBalance = acctListObj.accountCashBalance;
        if (acctListObj.accountType == 'SECURITIES') {
            for (let listObj of acctListObj.securities) {
                listObj["securityTotalValue"] = getTotalSecurityValue(listObj);
                acctBalance += listObj.securityTotalValue;
            }
        }
        acctListObj["accountBalance"] = acctBalance;
    }
}

function getTotalSecurityValue(securityObj) {
    if (securityObj.securityType === 'ETF' || securityObj.securityType === 'COMPANY') {
        return getSecurityPrice(securityObj) * securityObj.securityShares;
    } else if (securityObj.securityType === 'T-BILL') {
        return securityObj.securityMaturityValue;
    } else {
        return 0
    }
}

function getAvailableOrderScenarios(dataAcctObj) {
    let result = "";
    // Scenario 1 - Cash in account can purchase shares that will balance to goal percentages
    result += getScenario1(dataAcctObj);
    // Scenario 2 - Cash does not cover a complete balance to goal percentages. Shows all combos.
    result += getScenario2(dataAcctObj);
    // Scenario 3 - Only show orders for securities that are selling below average cost basis per share
    result += getScenario3(dataAcctObj);
    return result;
}

function getScenario1(dataAcctObj) {
    // Scenario 1 - Cash in account can purchase shares that will balance to goal percentages
    let showScenario1 = false;
    let cashNeededToReachGoal = 0;
    let tBillAmount = 0;
    for (let listObj of dataAcctObj.securities) {
        if (listObj.securityType === 'T-BILL') {
            tBillAmount += listObj.securityMaturityValue;
        }
        if (listObj.securityGoalPercentage > listObj.securityActualPercentage){
            let differenceInPercentage = listObj.securityGoalPercentage - listObj.securityActualPercentage;
            cashNeededToReachGoal += (dataAcctObj.accountBalance * differenceInPercentage);
        }
    }
    
    let result = "<div class='card orderScenario'>";
    result += "Cash on Hand: " + numberWithCommas(dataAcctObj.accountCashBalance) + "<br>";
    if (dataAcctObj.accountCashBalance >= cashNeededToReachGoal) {
        showScenario1 = true;
        result += "These calculations are assuming only cash on hand is being used.<br>";
    }
    else if ((dataAcctObj.accountCashBalance + tBillAmount) >= parseFloat(cashNeededToReachGoal.toFixed(2))) {
        showScenario1 = true;
        result += "T-Bill Maturity Value: " + numberWithCommas(tBillAmount) + "<br>";
        result += "These calculations are assuming all T-Bills have matured.<br>";
    }
    result += getSecuritiesOrdersToReachGoals(dataAcctObj);
    result += "Cash Needed to Reach Goal(s): " + numberWithCommas(cashNeededToReachGoal) + "<br>";
    result += "</div>";
    return showScenario1 ? result : '';
}

function getSecuritiesOrdersToReachGoals(dataAcctObj) {
    let result = "<table class='orderScenario'>";
    result += getOrdersTableHeaderRow();
    for (let listObj of dataAcctObj.securities) {
        if ((listObj.securityType === 'COMPANY' || listObj.securityType === 'ETF') && listObj.securityGoalPercentage > listObj.securityActualPercentage){
            let differenceInPercentage = listObj.securityGoalPercentage - listObj.securityActualPercentage;
            let securityAmountToReachGoal = (dataAcctObj.accountBalance * differenceInPercentage);
            result += getOrdersTableDataRow(listObj, securityAmountToReachGoal, getSecurityPrice(listObj));
        }
    }
    result += "</table>";
    return result;
}

function getOrdersTableHeaderRow() {
    let result = "<tr>";
    result += "<th>Identifier</th>";
    result += "<th>Amount to Reach Goal</th>";
    result += "<th>Shares @ Current Price</th>";
    result += "<th>Current Price</th>";
    result += "<th>Shares @ Price (-2%)</th>";
    result += "<th>Price Reduced by 2%</th>";
    result += "<th>Shares @ Price (-5%)</th>";
    result += "<th>Price Reduced (5%)</th>";
    result += "<th>Shares @ Price (-10%)</th>";
    result += "<th>Price Reduced (10%)</th>";
    result += "</tr>";
    return result;
}

function getOrdersTableDataRow(securityObj, securityAmountToReachGoal, currentPrice) {
    let result = "<tr>";
    result += "<td>" + securityObj.securityIdentifier + "</td>";
    result += "<td>" + numberWithCommas(securityAmountToReachGoal) + "</td>";
    let sharesAtCurrentPrice = (securityAmountToReachGoal / getSecurityPrice(securityObj)).toFixed(4);
    result += "<td>" + sharesAtCurrentPrice + "</td>";
    result += "<td>" + numberWithCommas(currentPrice) + "</td>";
    let priceAt2PercentReduced = (currentPrice * .98);
    let sharesAtReducedPrice2Percent = (securityAmountToReachGoal / priceAt2PercentReduced).toFixed(4);
    result += "<td>" + sharesAtReducedPrice2Percent + "</td>";
    result += "<td>" + numberWithCommas(priceAt2PercentReduced) + "</td>";
    let priceAt5PercentReduced = (currentPrice * .95);
    let sharesAtReducedPrice5Percent = (securityAmountToReachGoal / priceAt5PercentReduced).toFixed(4);
    result += "<td>" + sharesAtReducedPrice5Percent + "</td>";
    result += "<td>" + numberWithCommas(priceAt5PercentReduced) + "</td>";
    let priceAt10PercentReduced = (currentPrice * .90);
    let sharesAtReducedPrice10Percent = (securityAmountToReachGoal / priceAt10PercentReduced).toFixed(4);
    result += "<td>" + sharesAtReducedPrice10Percent + "</td>";
    result += "<td>" + numberWithCommas(priceAt10PercentReduced) + "</td>";
    result += "</tr>";
    return result;
}

function getScenario2(dataAcctObj) {
    // Scenario 2 - Each security below goal at the maximum amount with cash on hand
    let showScenario2 = false;
    let tBillAmount = 0;
    for (let listObj of dataAcctObj.securities) {
        if (listObj.securityType === 'T-BILL') {
            tBillAmount += listObj.securityMaturityValue;
        }
        if ((listObj.securityType === 'ETF' || listObj.securityType === 'COMPANY') && listObj.securityIdentifierType === 'TICKER' && commonSecurityMap.get(listObj.securityIdentifier).securityPrice <= dataAcctObj.accountCashBalance){
            showScenario2 = true;
        }
    }
    
    let result = "<div class='card orderScenario'>";
    result += "Cash on Hand: " + numberWithCommas(dataAcctObj.accountCashBalance) + "<br>";
    result += "T-Bill Maturity Value: " + numberWithCommas(tBillAmount) + "<br>";
    result += "The below calculations are assuming only one security is being bought at a time at the maximum amount available in <u>cash</u>.<br>";
    result += getSecuritiesOrdersToReachIndividualGoals(dataAcctObj, 0) + "<br>";
    result += "The below calculations are assuming only one security is being bought at a time at the maximum amount available in <u>cash + maturity value of T-Bills</u>.<br>";
    result += getSecuritiesOrdersToReachIndividualGoals(dataAcctObj,tBillAmount);
    result += "</div>";
    return showScenario2 ? result : '';
}

function getSecuritiesOrdersToReachIndividualGoals(dataAcctObj, tBillMaturityValueTotal) {
    let result = "<table class='orderScenario'>";
    result += getOrdersMaxedOutTableHeaderRow();
    for (let listObj of dataAcctObj.securities) {
        if ((listObj.securityType === 'ETF' || listObj.securityType === 'COMPANY') && listObj.securityIdentifierType === 'TICKER'){
            let sharesToBuy = dataAcctObj.accountCashBalance / commonSecurityMap.get(listObj.securityIdentifier).securityPrice;
            result += getOrdersMaxedOutTableDataRow(listObj, (dataAcctObj.accountCashBalance + tBillMaturityValueTotal), getSecurityPrice(listObj));
        }
    }
    result += "</table>";
    return result;
}

function getOrdersMaxedOutTableHeaderRow() {
    let result = "<tr>";
    result += "<th>Identifier</th>";
    result += "<th>Shares @ Current Price</th>";
    result += "<th>Current Price</th>";
    result += "<th>Shares @ Price (-2%)</th>";
    result += "<th>Price Reduced by 2%</th>";
    result += "<th>Shares @ Price (-5%)</th>";
    result += "<th>Price Reduced (5%)</th>";
    result += "<th>Shares @ Price (-10%)</th>";
    result += "<th>Price Reduced (10%)</th>";
    result += "</tr>";
    return result;
}

function getOrdersMaxedOutTableDataRow(securityObj, accountCashBalance, currentPrice) {
    let result = "<tr>";
    result += "<td>" + securityObj.securityIdentifier + "</td>";
    let sharesAtCurrentPrice = (accountCashBalance / getSecurityPrice(securityObj)).toFixed(4);
    result += "<td>" + sharesAtCurrentPrice + "</td>";
    result += "<td>" + numberWithCommas(currentPrice) + "</td>";
    let priceAt2PercentReduced = (currentPrice * .98);
    let sharesAtReducedPrice2Percent = (accountCashBalance / priceAt2PercentReduced).toFixed(4);
    result += "<td>" + sharesAtReducedPrice2Percent + "</td>";
    result += "<td>" + numberWithCommas(priceAt2PercentReduced) + "</td>";
    let priceAt5PercentReduced = (currentPrice * .95);
    let sharesAtReducedPrice5Percent = (accountCashBalance / priceAt5PercentReduced).toFixed(4);
    result += "<td>" + sharesAtReducedPrice5Percent + "</td>";
    result += "<td>" + numberWithCommas(priceAt5PercentReduced) + "</td>";
    let priceAt10PercentReduced = (currentPrice * .90);
    let sharesAtReducedPrice10Percent = (accountCashBalance / priceAt10PercentReduced).toFixed(4);
    result += "<td>" + sharesAtReducedPrice10Percent + "</td>";
    result += "<td>" + numberWithCommas(priceAt10PercentReduced) + "</td>";
    result += "</tr>";
    return result;
}

function getScenario3(dataAcctObj) {
    // Scenario 3 - Only show orders for securities that are selling below average cost basis per share
    let showScenario3 = false;
    let tBillAmount = 0;
    let cashOnlyCanPurchase = false;
    let cashAndTBillCanPurchse = false;
    for (let listObj of dataAcctObj.securities) {
        if (listObj.securityType === 'T-BILL') {
            tBillAmount += listObj.securityMaturityValue;
        }
        if ((listObj.securityType === 'ETF' || listObj.securityType === 'COMPANY') && listObj.securityIdentifierType === 'TICKER' && commonSecurityMap.get(listObj.securityIdentifier).securityPrice < (listObj.securityTotalCost / listObj.securityShares)){
            showScenario3 = true;
        }
    }
    
    for (let listObj of dataAcctObj.securities) {
        if ((listObj.securityType === 'ETF' || listObj.securityType === 'COMPANY') && listObj.securityIdentifierType === 'TICKER' && commonSecurityMap.get(listObj.securityIdentifier).securityPrice < (listObj.securityTotalCost / listObj.securityShares)){
            let differenceInPercentage = listObj.securityGoalPercentage - listObj.securityActualPercentage;
            let securityAmountToReachGoal = (dataAcctObj.accountBalance * differenceInPercentage);
            if (securityAmountToReachGoal < dataAcctObj.accountCashBalance) {
                cashOnlyCanPurchase = true;
            }
            if (securityAmountToReachGoal < (dataAcctObj.accountCashBalance + tBillAmount)) {
                cashAndTBillCanPurchse = true;
            }
        }
    }

    
    let result = "<div class='card orderScenario'>";
    result += "Cash on Hand: " + numberWithCommas(dataAcctObj.accountCashBalance) + "<br>";
    result += "T-Bill Maturity Value: " + numberWithCommas(tBillAmount) + "<br>";
    if (showScenario3) {
        result += "The below calculations are showing securities currently with a market price below the average cost basis using only <u>cash</u> on hand.<br>";
        result += getSecuritiesOrdersBelowAverageToReachGoals(dataAcctObj, false) + "<br>";
    }
    
    if (cashOnlyCanPurchase) {
        result += "The below calculations are showing securities currently with a market price below the average cost basis using only <u>cash</u> to get to goal.<br>";
        result += getSecuritiesOrdersBelowAverageToReachGoals(dataAcctObj, true) + "<br>";
    }
    
    else if (cashAndTBillCanPurchse) {
        result += "The below calculations are showing securities currently with a market price below the average cost basis using <u>cash + maturity value of T-Bills</u>.<br>";
        result += getSecuritiesOrdersBelowAverageToReachGoals(dataAcctObj, true);
    }
    result += "</div>";
    return showScenario3 ? result : '';
}

function getSecuritiesOrdersBelowAverageToReachGoals(dataAcctObj, willReachGoal) {
    let result = "<table class='orderScenario'>";
    result += getOrdersBelowAverageCostBasisTableHeaderRow();
    for (let listObj of dataAcctObj.securities) {
        if ((listObj.securityType === 'COMPANY' || listObj.securityType === 'ETF') && (listObj.securityGoalPercentage > listObj.securityActualPercentage) && (commonSecurityMap.get(listObj.securityIdentifier).securityPrice < (listObj.securityTotalCost / listObj.securityShares))){
            let differenceInPercentage = listObj.securityGoalPercentage - listObj.securityActualPercentage;
            let securityAmountToReachGoal = (dataAcctObj.accountBalance * differenceInPercentage);
            result += getOrdersBelowAverageCostBasisTableDataRow(listObj, (willReachGoal ? securityAmountToReachGoal : dataAcctObj.accountCashBalance), getSecurityPrice(listObj));
        }
    }
    result += "</table>";
    return result;
}
            
function getOrdersBelowAverageCostBasisTableHeaderRow() {
    let result = "<tr>";
    result += "<th>Identifier</th>";
    result += "<th>Amount to Reach Goal</th>";
    result += "<th>Shares @ Current Price</th>";
    result += "<th>Current Price</th>";
    result += "<th>Average Cost Basis / Share</th>";
    result += "<th>Shares @ Price (-2%)</th>";
    result += "<th>Price Reduced by 2%</th>";
    result += "<th>Shares @ Price (-5%)</th>";
    result += "<th>Price Reduced (5%)</th>";
    result += "<th>Shares @ Price (-10%)</th>";
    result += "<th>Price Reduced (10%)</th>";
    result += "</tr>";
    return result;
}

function getOrdersBelowAverageCostBasisTableDataRow(securityObj, securityAmountToReachGoal, currentPrice) {
    let result = "<tr>";
    result += "<td>" + securityObj.securityIdentifier + "</td>";
    result += "<td>" + numberWithCommas(securityAmountToReachGoal) + "</td>";
    let sharesAtCurrentPrice = (securityAmountToReachGoal / getSecurityPrice(securityObj)).toFixed(4);
    result += "<td>" + sharesAtCurrentPrice + "</td>";
    result += "<td>" + numberWithCommas(currentPrice) + "</td>";
    let avgCostPerShare = securityObj.securityTotalCost / securityObj.securityShares;
    result += "<td>" + numberWithCommas(avgCostPerShare) + "</td>";
    let priceAt2PercentReduced = (currentPrice * .98);
    let sharesAtReducedPrice2Percent = (securityAmountToReachGoal / priceAt2PercentReduced).toFixed(4);
    result += "<td>" + sharesAtReducedPrice2Percent + "</td>";
    result += "<td>" + numberWithCommas(priceAt2PercentReduced) + "</td>";
    let priceAt5PercentReduced = (currentPrice * .95);
    let sharesAtReducedPrice5Percent = (securityAmountToReachGoal / priceAt5PercentReduced).toFixed(4);
    result += "<td>" + sharesAtReducedPrice5Percent + "</td>";
    result += "<td>" + numberWithCommas(priceAt5PercentReduced) + "</td>";
    let priceAt10PercentReduced = (currentPrice * .90);
    let sharesAtReducedPrice10Percent = (securityAmountToReachGoal / priceAt10PercentReduced).toFixed(4);
    result += "<td>" + sharesAtReducedPrice10Percent + "</td>";
    result += "<td>" + numberWithCommas(priceAt10PercentReduced) + "</td>";
    result += "</tr>";
    return result;
}


uploadButton.addEventListener("click", () => {
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        // Process the JSON data here
        const commonSecurityMap = parseCommonSecurityList(jsonData.securities);
        document.getElementById("result").innerHTML = parseAccount(jsonData.accounts);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };

    reader.readAsText(file);
  }
});

