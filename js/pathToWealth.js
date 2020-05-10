// Timeline
var months = 0;
var years = 0;

// Inputs
var monthlySalary = 0;

var monthlyRent = 0;
var monthlyMortgage = 0;
var monthlyUtilities = 0;
var monthlyFood = 0;
var monthlyTransportation = 0;
var monthlyInternet = 0;
var monthlyPhone = 0;
var monthlyDebt = 0;

var monthlyRetirement = 0;
var monthlyIndividualInvesting = 0;
var monthlySavings = 0;


// Totals
var totalIncome = 0;
var totalExpenses = 0;

var totalRemainingMortgage = 0;
var totalRemainingDebt = 0;
var totalRetirement = 0;
var totalIndividualInvesting = 0;
var totalSavings = 0;
    // Interest
var totalRemainingMortgageInterest = 0;
var totalRemainingDebtInterest = 0;
var totalRetirementInterest = 0;
var totalIndividualInvestingInterest = 0;
var totalSavingsInterest = 0;


var netWorth = 0;


function resetTimeline() {
    months = 0;
    years = 0;
    updateTimeline();
}

function addMonth() {
    if (months < 11) {
        months++;
    }
    else {
        years++;
        months = 0;
    }
}

// OnChange
function updateMonthlySalary() {
    monthlySalary = parseFloat(document.getElementById("monthlySalary").value);
}

function updateMonthlyRent() {
    monthlyRent = parseFloat(document.getElementById("monthlyRent").value);
}

function updateMonthlyMortgage() {
    monthlyMortgage = parseFloat(document.getElementById("monthlyMortgage").value);
}

function updateMonthlyUtilities() {
    monthlyUtilities = parseFloat(document.getElementById("monthlyUtilities").value);
}

function updateMonthlyFood() {
    monthlyFood = parseFloat(document.getElementById("monthlyFood").value);
}

function updateMonthlyTransportation() {
    monthlyTransportation = parseFloat(document.getElementById("monthlyTransportation").value);
}

function updateMonthlyInternet() {
    monthlyInternet = parseFloat(document.getElementById("monthlyInternet").value);
}

function updateMonthlyPhone() {
    monthlyPhone = parseFloat(document.getElementById("monthlyPhone").value);
}

function updateMonthlyDebt() {
    monthlyDebt = parseFloat(document.getElementById("monthlyDebt").value);
}

function updateMonthlyRetirement() {
    monthlyRetirement = parseFloat(document.getElementById("monthlyRetirement").value);
}

function updateMonthlyIndividualInvesting() {
    monthlyIndividualInvesting = parseFloat(document.getElementById("monthlyIndividualInvesting").value);
}

function updateMonthlySavings() {
    monthlySavings = parseFloat(document.getElementById("monthlySavings").value);
}

function updateTotalRemainingMortgage() {
    totalRemainingMortgage = parseFloat(document.getElementById("remainingMortgageBalance").value);
}

function updateTotalRemainingDebt() {
    totalRemainingDebt = parseFloat(document.getElementById("remainingDebtBalance").value);
}

function updateTotalRetirement() {
    totalRetirement = parseFloat(document.getElementById("totalRetirementBalance").value);
}

function updateTotalIndividualInvesting() {
    totalIndividualInvesting = parseFloat(document.getElementById("totalIndividualInvestingBalance").value);
}

function updateTotalSavings() {
    totalSavings = parseFloat(document.getElementById("totalSavingsBalance").value);
}

function updateTotalRemainingMortgageInterest() {
    totalRemainingMortgageInterest = parseFloat(document.getElementById("remainingMortgageInterest").value);
}

function updateTotalRemainingDebtInterest() {
    totalRemainingDebtInterest = parseFloat(document.getElementById("remainingDebtInterest").value);
}

function updateTotalRetirementInterest() {
    totalRetirementInterest = parseFloat(document.getElementById("totalRetirementInterest").value);
}

function updateTotalIndividualInvestingInterest() {
    totalIndividualInvestingInterest = parseFloat(document.getElementById("totalIndividualInvestingInterest").value);
}

function updateTotalSavingsInterest() {
    totalSavingsInterest = parseFloat(document.getElementById("totalSavingsInterest").value);
}

// Account Manipulation
function adjustAccounts() {
    var monthCheck = monthlySalary;
    monthCheck = monthCheck - (monthlyRent + monthlyMortgage + monthlyUtilities + monthlyFood + monthlyTransportation + monthlyInternet + monthlyPhone + monthlyDebt + monthlyRetirement + monthlyIndividualInvesting);
    totalRemainingMortgage -= monthlyMortgage; // handle reducing properly
    totalRemainingDebt -= monthlyDebt; // handle reducing properly
    totalRetirement = (totalRetirement * (1 + (totalRetirementInterest * .00083333))) + monthlyRetirement;
    totalIndividualInvesting = (totalIndividualInvesting * (1 + (totalIndividualInvestingInterest * .00083333))) + monthlyIndividualInvesting;
    totalSavings = (totalSavings * (1 + (totalSavingsInterest * .00083333))) + monthCheck;
    netWorth = totalRetirement + totalIndividualInvesting + totalSavings - totalRemainingMortgage - totalRemainingDebt;
}


// Display
function updateTimeline() {
    document.getElementById("years").innerHTML = years;
    document.getElementById("months").innerHTML = months;
}

function updateTotalAmounts() {
    document.getElementById("remainingMortgageBalance").value = parseFloat(totalRemainingMortgage).toFixed(2);
    document.getElementById("remainingDebtBalance").value = parseFloat(totalRemainingDebt).toFixed(2);
    document.getElementById("totalRetirementBalance").value = parseFloat(totalRetirement).toFixed(2);
    document.getElementById("totalIndividualInvestingBalance").value = parseFloat(totalIndividualInvesting).toFixed(2);
    document.getElementById("totalSavingsBalance").value = parseFloat(totalSavings).toFixed(2);
    document.getElementById("netWorth").innerHTML = Number(netWorth).toLocaleString('en-US', {style: 'currency',currency: 'USD'});
}

function liveMonth() {
    addMonth();
    updateTimeline();
    adjustAccounts();
    updateTotalAmounts();
}

function liveYear() {
    for (var i = 0; i < 12; i++){
        liveMonth();
    }
}
