var taxAmount = 0.0;
var taxTierAmount = [0.0,0.0,0.0,0.0,0.0,0.0,0.0];
const taxBreakpoints = [[9875, 40125, 85525, 163300, 207350, 518400],
                        [19750, 80250, 171050, 326600, 414700, 622050],
                        [14100, 53700, 85500, 163300, 207350, 518400]];
const taxTierPercentages = [.1, .12, .22, .24, .32, .35, .37];
const standardDeduction = [12400, 24800, 18650];
var incomeTierAmount = [0.0,0.0,0.0,0.0,0.0,0.0,0.0];
var preDeductionIncome = 0.0;
var preTaxIncome = 0.0;
var filingStatus = 0;

function updatePreDeductionIncome() {
    preDeductionIncome = (document.getElementById("preDeductionInput").value);
    updateStandardDeduction();
    taxBracketCalculation();
}

function updateFilingStatus(status) {
    filingStatus = status;
    updateStandardDeduction();
    taxBracketCalculation();
}

function updateStandardDeduction() {
    if (preDeductionIncome >= standardDeduction[filingStatus]) {
        preTaxIncome = preDeductionIncome - standardDeduction[filingStatus];
    }
    document.getElementById("standardDeduction").innerHTML = "- Standard Duduction of $" + parseFloat(standardDeduction[filingStatus]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " = $" + parseFloat(preTaxIncome).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function taxBracketCalculation() {
    taxAmount = 0.0;
    taxTierAmount = [0.0,0.0,0.0,0.0,0.0,0.0,0.0];
    incomeTierAmount = [0.0,0.0,0.0,0.0,0.0,0.0,0.0];
    
    if (preTaxIncome <= taxBreakpoints[filingStatus][0]) {
        // 10%
        taxTierAmount[0] = preTaxIncome * taxTierPercentages[0];
        incomeTierAmount[0] = preTaxIncome;
    }
    else if (preTaxIncome <= taxBreakpoints[filingStatus][1]) {
        // 12%
        taxTierAmount[0] = taxBreakpoints[filingStatus][0] * taxTierPercentages[0];
        taxTierAmount[1] = ((preTaxIncome - taxBreakpoints[filingStatus][0]) * taxTierPercentages[1]);
        
        incomeTierAmount[0] = taxBreakpoints[filingStatus][0];
        incomeTierAmount[1] = preTaxIncome - taxBreakpoints[filingStatus][0];
    }
    else if (preTaxIncome <= taxBreakpoints[filingStatus][2]) {
        // 22%
        taxTierAmount[0] = taxBreakpoints[filingStatus][0] * taxTierPercentages[0];
        taxTierAmount[1] = ((taxBreakpoints[filingStatus][1] - taxBreakpoints[filingStatus][0]) * taxTierPercentages[1]);
        taxTierAmount[2] = ((preTaxIncome - taxBreakpoints[filingStatus][1]) * taxTierPercentages[2]);
        
        incomeTierAmount[0] = taxBreakpoints[filingStatus][0];
        incomeTierAmount[1] = taxBreakpoints[filingStatus][1] - taxBreakpoints[filingStatus][0];
        incomeTierAmount[2] = preTaxIncome - taxBreakpoints[filingStatus][1];
    }
    else if (preTaxIncome <= taxBreakpoints[filingStatus][3]) {
        // 24%
        taxTierAmount[0] = taxBreakpoints[filingStatus][0] * taxTierPercentages[0];
        taxTierAmount[1] = ((taxBreakpoints[filingStatus][1] - taxBreakpoints[filingStatus][0]) * taxTierPercentages[1]);
        taxTierAmount[2] = ((taxBreakpoints[filingStatus][2] - taxBreakpoints[filingStatus][1]) * taxTierPercentages[2]);
        taxTierAmount[3] = ((preTaxIncome - taxBreakpoints[filingStatus][2]) * taxTierPercentages[3]);
        
        incomeTierAmount[0] = taxBreakpoints[filingStatus][0];
        incomeTierAmount[1] = taxBreakpoints[filingStatus][1] - taxBreakpoints[filingStatus][0];
        incomeTierAmount[2] = taxBreakpoints[filingStatus][2] - taxBreakpoints[filingStatus][1];
        incomeTierAmount[3] = preTaxIncome - taxBreakpoints[filingStatus][2];
    }
    else if (preTaxIncome <= taxBreakpoints[filingStatus][4]) {
        // 32%
        taxTierAmount[0] = taxBreakpoints[filingStatus][0] * taxTierPercentages[0];
        taxTierAmount[1] = ((taxBreakpoints[filingStatus][1] - taxBreakpoints[filingStatus][0]) * taxTierPercentages[1]);
        taxTierAmount[2] = ((taxBreakpoints[filingStatus][2] - taxBreakpoints[filingStatus][1]) * taxTierPercentages[2]);
        taxTierAmount[3] = ((taxBreakpoints[filingStatus][3] - taxBreakpoints[filingStatus][2]) * taxTierPercentages[3]);
        taxTierAmount[4] = ((preTaxIncome - taxBreakpoints[filingStatus][3]) * taxTierPercentages[4]);
        
        incomeTierAmount[0] = taxBreakpoints[filingStatus][0];
        incomeTierAmount[1] = taxBreakpoints[filingStatus][1] - taxBreakpoints[filingStatus][0];
        incomeTierAmount[2] = taxBreakpoints[filingStatus][2] - taxBreakpoints[filingStatus][1];
        incomeTierAmount[3] = taxBreakpoints[filingStatus][3] - taxBreakpoints[filingStatus][2];
        incomeTierAmount[4] = preTaxIncome - taxBreakpoints[filingStatus][3];
    }
    else if (preTaxIncome <= taxBreakpoints[filingStatus][4]) {
        // 35%
        taxTierAmount[0] = taxBreakpoints[filingStatus][0] * taxTierPercentages[0];
        taxTierAmount[1] = ((taxBreakpoints[filingStatus][1] - taxBreakpoints[filingStatus][0]) * taxTierPercentages[1]);
        taxTierAmount[2] = ((taxBreakpoints[filingStatus][2] - taxBreakpoints[filingStatus][1]) * taxTierPercentages[2]);
        taxTierAmount[3] = ((taxBreakpoints[filingStatus][3] - taxBreakpoints[filingStatus][2]) * taxTierPercentages[3]);
        taxTierAmount[4] = ((taxBreakpoints[filingStatus][4] - taxBreakpoints[filingStatus][3]) * taxTierPercentages[4]);
        taxTierAmount[5] = ((preTaxIncome - taxBreakpoints[filingStatus][4]) * taxTierPercentages[5]);
        
        incomeTierAmount[0] = taxBreakpoints[filingStatus][0];
        incomeTierAmount[1] = taxBreakpoints[filingStatus][1] - taxBreakpoints[filingStatus][0];
        incomeTierAmount[2] = taxBreakpoints[filingStatus][2] - taxBreakpoints[filingStatus][1];
        incomeTierAmount[3] = taxBreakpoints[filingStatus][3] - taxBreakpoints[filingStatus][2];
        incomeTierAmount[4] = taxBreakpoints[filingStatus][4] - taxBreakpoints[filingStatus][3];
        incomeTierAmount[5] = preTaxIncome - taxBreakpoints[filingStatus][4];
    }
    else {
        // 37%
        taxTierAmount[0] = taxBreakpoints[filingStatus][0] * taxTierPercentages[0];
        taxTierAmount[1] = ((taxBreakpoints[filingStatus][1] - taxBreakpoints[filingStatus][0]) * taxTierPercentages[1]);
        taxTierAmount[2] = ((taxBreakpoints[filingStatus][2] - taxBreakpoints[filingStatus][1]) * taxTierPercentages[2]);
        taxTierAmount[3] = ((taxBreakpoints[filingStatus][3] - taxBreakpoints[filingStatus][2]) * taxTierPercentages[3]);
        taxTierAmount[4] = ((taxBreakpoints[filingStatus][4] - taxBreakpoints[filingStatus][3]) * taxTierPercentages[4]);
        taxTierAmount[5] = ((taxBreakpoints[filingStatus][5] - taxBreakpoints[filingStatus][4]) * taxTierPercentages[5]);
        taxTierAmount[6] = ((preTaxIncome - taxBreakpoints[filingStatus][5]) * taxTierPercentages[6]);
        
        incomeTierAmount[0] = taxBreakpoints[filingStatus][0];
        incomeTierAmount[1] = taxBreakpoints[filingStatus][1] - taxBreakpoints[filingStatus][0];
        incomeTierAmount[2] = taxBreakpoints[filingStatus][2] - taxBreakpoints[filingStatus][1];
        incomeTierAmount[3] = taxBreakpoints[filingStatus][3] - taxBreakpoints[filingStatus][2];
        incomeTierAmount[4] = taxBreakpoints[filingStatus][4] - taxBreakpoints[filingStatus][3];
        incomeTierAmount[5] = taxBreakpoints[filingStatus][5] - taxBreakpoints[filingStatus][4];
        incomeTierAmount[6] = preTaxIncome - taxBreakpoints[filingStatus][5];
    }
    for (var i = 0; i < taxTierAmount.length; i++) {
        taxAmount += taxTierAmount[i];
    }
    updateBrackets();
}

function updateBrackets() {
    document.getElementById("breakpointTier1").innerHTML = "$0 - $" + ((taxBreakpoints[filingStatus][0]).toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("breakpointTier2").innerHTML = "$" + ((taxBreakpoints[filingStatus][0]+1).toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " - $" + ((taxBreakpoints[filingStatus][1]).toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("breakpointTier3").innerHTML = "$" + ((taxBreakpoints[filingStatus][1]+1).toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " - $" + ((taxBreakpoints[filingStatus][2]).toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("breakpointTier4").innerHTML = "$" + ((taxBreakpoints[filingStatus][2]+1).toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " - $" + ((taxBreakpoints[filingStatus][3]).toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("breakpointTier5").innerHTML = "$" + ((taxBreakpoints[filingStatus][3]+1).toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " - $" + ((taxBreakpoints[filingStatus][4]).toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("breakpointTier6").innerHTML = "$" + ((taxBreakpoints[filingStatus][4]+1).toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " - $" + ((taxBreakpoints[filingStatus][5]).toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("breakpointTier7").innerHTML = "$" + ((taxBreakpoints[filingStatus][5]+1).toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " or more";
    
    document.getElementById("incomeAmount1").innerHTML = "$" + parseFloat(incomeTierAmount[0]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("incomeAmount2").innerHTML = "$" + parseFloat(incomeTierAmount[1]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("incomeAmount3").innerHTML = "$" + parseFloat(incomeTierAmount[2]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("incomeAmount4").innerHTML = "$" + parseFloat(incomeTierAmount[3]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("incomeAmount5").innerHTML = "$" + parseFloat(incomeTierAmount[4]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("incomeAmount6").innerHTML = "$" + parseFloat(incomeTierAmount[5]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("incomeAmount7").innerHTML = "$" + parseFloat(incomeTierAmount[6]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    document.getElementById("taxAmount1").innerHTML = "$" + parseFloat(taxTierAmount[0]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("taxAmount2").innerHTML = "$" + parseFloat(taxTierAmount[1]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("taxAmount3").innerHTML = "$" + parseFloat(taxTierAmount[2]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("taxAmount4").innerHTML = "$" + parseFloat(taxTierAmount[3]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("taxAmount5").innerHTML = "$" + parseFloat(taxTierAmount[4]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("taxAmount6").innerHTML = "$" + parseFloat(taxTierAmount[5]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("taxAmount7").innerHTML = "$" + parseFloat(taxTierAmount[6]).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById("taxResultTotal").innerHTML = "You will owe $" + parseFloat(taxAmount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " in taxes. Which is $" + parseFloat(taxAmount/12).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " a month."
}
