// Timeline
var simulatedMonths = 0;
var simulatedYears = 0;
var ageMonths = 0;
var ageYears = 0;
var currentMonth = new Date().getMonth();

// Inputs
var monthlySalary = 0;
var monthlyRentalProfit = 0;

var monthlyGiving = 0;
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
var primaryHouseEquity = 0;
var rentalEquity = 0;
var totalSavings = 0;

var totalGivingBalance = 0;
    // Interest
var totalRemainingMortgageInterest = 0;
var totalRemainingDebtInterest = 0;
var totalRetirementInterest = 0;
var totalIndividualInvestingInterest = 0;
var primaryHouseInterest = 0;
var rentalInterest = 0;
var totalSavingsInterest = 0;

var totalGivingInterest = 0;
    // Term
var totalRemainingMortgageTerm = 0;
var totalRemainingDebtTerm = 0;
    //Payments
var totalRemainingMortgagePayment = 0;
var totalRemainingDebtPayment = 0;
var totalGivingPayment = 0;


var netWorth = 0;


function resetTimeline() {
    simulatedMonths = 0;
    simulatedYears = 0;
    ageMonths = 0;
    ageYears = 0;
    updateTimeline();
}

function addMonth() {
    if (simulatedMonths < 11) {
        simulatedMonths++;
    }
    else {
        simulatedYears++;
        simulatedMonths = 0;
    }
    
    if (ageMonths < 11) {
        ageMonths++;
    }
    else {
        ageYears++;
        ageMonths = 0;
    }
    
    if (currentMonth < 11) {
        currentMonth++;
    }
    else {
        currentMonth = 0;
    }
    
    document.getElementById("ageYears").value = ageYears;
    document.getElementById("ageMonths").value = ageMonths;
}

// OnChange
function updateMonthlySalary() {
    monthlySalary = parseFloat(document.getElementById("monthlySalary").value);
}

function updateMonthlyRentalProfit() {
    monthlyRentalProfit = parseFloat(document.getElementById("monthlyRentalProfit").value);
}

function updateMonthlyGiving() {
    monthlyGiving = parseFloat(document.getElementById("monthlyGiving").value);
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
    updateMortgagePayment();
    updateNetWorth();
}

function updateTotalRemainingDebt() {
    totalRemainingDebt = parseFloat(document.getElementById("remainingDebtBalance").value);
    updateDebtPayment();
    updateNetWorth();
}

function updateTotalRetirement() {
    totalRetirement = parseFloat(document.getElementById("totalRetirementBalance").value);
    updateNetWorth();
}

function updateTotalIndividualInvesting() {
    totalIndividualInvesting = parseFloat(document.getElementById("totalIndividualInvestingBalance").value);
    updateNetWorth();
}

function updateTotalSavings() {
    totalSavings = parseFloat(document.getElementById("totalSavingsBalance").value);
    updateNetWorth();
}

function updateTotalRemainingMortgageInterest() {
    totalRemainingMortgageInterest = parseFloat(document.getElementById("remainingMortgageInterest").value);
    updateMortgagePayment();
}

function updateTotalRemainingDebtInterest() {
    totalRemainingDebtInterest = parseFloat(document.getElementById("remainingDebtInterest").value);
    updateDebtPayment();
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

function updateAgeYears() {
    ageYears = parseInt(document.getElementById("ageYears").value);
}

function updateAgeMonths() {
    ageMonths = parseInt(document.getElementById("ageMonths").value);
}

function updateTotalRemainingMortgageTerm() {
    totalRemainingMortgageTerm = parseFloat(document.getElementById("remainingMortgageTerm").value);
    updateMortgagePayment();
}

function updateTotalRemainingDebtTerm() {
    totalRemainingDebtTerm = parseFloat(document.getElementById("remainingDebtTerm").value);
    updateDebtPayment();
}

function updatePrimaryHouseEquity() {
    primaryHouseEquity = parseFloat(document.getElementById("primaryHouseEquityBalance").value);
    updateNetWorth();
    
}

function updatePrimaryHouseEquityInterest() {
    primaryHouseInterest = parseFloat(document.getElementById("primaryHouseEquityInterest").value);
}

function updateTotalRentalEquity() {
    rentalEquity = parseFloat(document.getElementById("totalRentalEquityBalance").value);
    updateNetWorth();
}

function updateTotalRentalEquityInterest() {
    rentalInterest = parseFloat(document.getElementById("totalRentalEquityInterest").value);
}

function updateTotalGiving() {
    totalGivingBalance = parseFloat(document.getElementById("totalGivingBalance").value);
}

function updateTotalGivingInterest() {
    totalGivingInterest = parseFloat(document.getElementById("totalGivingInterest").value);
}

// Account Manipulation
function adjustAccounts() {
    var monthCheck = monthlySalary + monthlyRentalProfit;
    monthCheck = monthCheck - (monthlyGiving + monthlyRent + monthlyMortgage + monthlyUtilities + monthlyFood + monthlyTransportation + monthlyInternet + monthlyPhone + monthlyDebt + monthlyRetirement + monthlyIndividualInvesting);
    var mortgageMonthInterest = parseFloat(totalRemainingMortgagePayment * (totalRemainingMortgageInterest / 1200));
    if (totalRemainingMortgage >= (monthlyMortgage - mortgageMonthInterest)){
        totalRemainingMortgage -= (monthlyMortgage - mortgageMonthInterest);
    }
    else {
        totalSavings += parseFloat((monthlyMortgage - mortgageMonthInterest) - totalRemainingMortgage);
        totalRemainingMortgage = 0;
    }
    
    var debtMonthInterest = parseFloat(totalRemainingDebtPayment * (totalRemainingDebtInterest / 1200));
    if (totalRemainingDebt >= (monthlyDebt - debtMonthInterest)){
        totalRemainingDebt -= (monthlyDebt - debtMonthInterest);
    }
    else {
        totalSavings += parseFloat((monthlyDebt - debtMonthInterest) - totalRemainingDebt);
        totalRemainingDebt = 0;
    }
    totalGivingBalance = (totalGivingBalance * (1 + (totalGivingInterest /1200))) + monthlyGiving;
    totalRetirement = (totalRetirement * (1 + (totalRetirementInterest / 1200))) + monthlyRetirement;
    totalIndividualInvesting = (totalIndividualInvesting * (1 + (totalIndividualInvestingInterest / 1200))) + monthlyIndividualInvesting;
    primaryHouseEquity = (primaryHouseEquity * (1 + (primaryHouseInterest / 1200)));
    rentalEquity = (rentalEquity * (1 + (rentalInterest / 1200)));
    totalSavings = parseFloat((totalSavings * (1 + (totalSavingsInterest / 1200))) + monthCheck);
    if (currentMonth === 0) {
        var tempPayout = (totalGivingBalance * .05);
        totalGivingBalance -= tempPayout;
        totalGivingPayment += tempPayout;
    }
    updateNetWorth();
}

function updateNetWorth() {
    netWorth = totalRetirement + totalIndividualInvesting + primaryHouseEquity + rentalEquity + totalSavings - totalRemainingMortgage - totalRemainingDebt;
    updateTotalAmounts();
}

// Display
function updateTimeline() {
    document.getElementById("simulatedYears").innerHTML = simulatedYears;
    document.getElementById("simulatedMonths").innerHTML = simulatedMonths;
}

function updateTotalAmounts() {
    document.getElementById("remainingMortgageBalance").value = parseFloat(totalRemainingMortgage).toFixed(2);
    document.getElementById("remainingDebtBalance").value = parseFloat(totalRemainingDebt).toFixed(2);
    document.getElementById("totalRetirementBalance").value = parseFloat(totalRetirement).toFixed(2);
    document.getElementById("totalIndividualInvestingBalance").value = parseFloat(totalIndividualInvesting).toFixed(2);
    document.getElementById("primaryHouseEquityBalance").value = parseFloat(primaryHouseEquity).toFixed(2);
    document.getElementById("totalRentalEquityBalance").value = parseFloat(rentalEquity).toFixed(2);
    document.getElementById("totalSavingsBalance").value = parseFloat(totalSavings).toFixed(2);
    document.getElementById("netWorth").innerHTML = Number(netWorth).toLocaleString('en-US', {style: 'currency',currency: 'USD'});
    document.getElementById("totalGivingBalance").value = parseFloat(totalGivingBalance).toFixed(2);
    document.getElementById("totalGivingPayment").innerHTML = Number(totalGivingPayment).toLocaleString('en-US', {style: 'currency',currency: 'USD'});;
}

function updateMortgagePayment() {
    var monthlyMortgageRate = totalRemainingMortgageInterest/1200;
    var monthsMortgage = totalRemainingMortgageTerm * 12;
    totalRemainingMortgagePayment = totalRemainingMortgage * ((monthlyMortgageRate * Math.pow((1 + monthlyMortgageRate),monthsMortgage))/(Math.pow((1+monthlyMortgageRate),monthsMortgage)-1));
    if (isFinite(totalRemainingMortgagePayment)) {
        document.getElementById("remainingMortgagePayment").innerHTML = "$" + parseFloat(totalRemainingMortgagePayment).toFixed(2);
    }
}

function updateDebtPayment() {
    var monthlyDebtRate = totalRemainingDebtInterest/1200;
    var monthsDebt = totalRemainingDebtTerm * 12;
    totalRemainingDebtPayment = totalRemainingDebt * ((monthlyDebtRate * Math.pow((1 + monthlyDebtRate),monthsDebt))/(Math.pow((1+monthlyDebtRate),monthsDebt)-1));
    if (isFinite(totalRemainingDebtPayment)) {
        document.getElementById("remainingDebtPayment").innerHTML = "$" + parseFloat(totalRemainingDebtPayment).toFixed(2);
    }
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
