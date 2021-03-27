// Flags
var lastNetWorth = 0;

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

function updateInputs() {
    document.getElementById("monthlySalary").value = monthlySalary;
    document.getElementById("monthlyRentalProfit").value = monthlyRentalProfit;
    document.getElementById("monthlyGiving").value = monthlyGiving;
    document.getElementById("monthlyRent").value = monthlyRent;
    document.getElementById("monthlyMortgage").value = monthlyMortgage;
    document.getElementById("monthlyUtilities").value = monthlyUtilities;
    document.getElementById("monthlyFood").value = monthlyFood;
    document.getElementById("monthlyTransportation").value = monthlyTransportation;
    document.getElementById("monthlyInternet").value = monthlyInternet;
    document.getElementById("monthlyPhone").value = monthlyPhone;
    document.getElementById("monthlyDebt").value = monthlyDebt;
    document.getElementById("monthlyRetirement").value = monthlyRetirement;
    document.getElementById("monthlyIndividualInvesting").value = monthlyIndividualInvesting;
    document.getElementById("monthlySavings").value = monthlySavings;
}

function updateInterestInputs() {
    document.getElementById("remainingMortgageInterest").value = totalRemainingMortgageInterest;
    document.getElementById("remainingDebtInterest").value = totalRemainingDebtInterest;
    document.getElementById("totalRetirementInterest").value = totalRetirementInterest;
    document.getElementById("totalIndividualInvestingInterest").value = totalIndividualInvestingInterest;
    document.getElementById("primaryHouseEquityInterest").value = primaryHouseInterest;
    document.getElementById("totalRentalEquityInterest").value = rentalInterest;
    document.getElementById("totalSavingsInterest").value = totalSavingsInterest;
    document.getElementById("totalGivingInterest").value = totalGivingInterest;
}

function randomizeInputs() {
    // Timeline
    var ageMonths = (Math.random() * 100) % 12;
    var ageYears = (Math.random() * 100);
    document.getElementById("ageYears").value = ageYears;
    document.getElementById("ageMonths").value = ageMonths;
    // Inputs
    monthlySalary = parseFloat((Math.random() * 10000).toFixed(2));
//    monthlyRentalProfit = 0;
//    monthlyGiving = 0;
    monthlyRent = parseFloat((monthlySalary * .25).toFixed(2));
//    monthlyMortgage = 0;
    monthlyUtilities = 0;
    monthlyFood = 0;
    monthlyTransportation = 0;
    monthlyInternet = 0;
    monthlyPhone = 0;
    monthlyDebt = 0;
    monthlyRetirement = parseFloat((monthlySalary * .15).toFixed(2));
    monthlyIndividualInvesting = 0;
    monthlySavings = 0;
    updateInputs();
}

function reset() {
    // Flags
    lastNetWorth = 0;
    // Timeline
    simulatedMonths = 0;
    simulatedYears = 0;
    ageMonths = 0;
    ageYears = 0;
    currentMonth = new Date().getMonth();
    // Inputs
    monthlySalary = 0;
    monthlyRentalProfit = 0;
    monthlyGiving = 0;
    monthlyRent = 0;
    monthlyMortgage = 0;
    monthlyUtilities = 0;
    monthlyFood = 0;
    monthlyTransportation = 0;
    monthlyInternet = 0;
    monthlyPhone = 0;
    monthlyDebt = 0;
    monthlyRetirement = 0;
    monthlyIndividualInvesting = 0;
    monthlySavings = 0;
    // Totals
    totalIncome = 0;
    totalExpenses = 0;
    totalRemainingMortgage = 0;
    totalRemainingDebt = 0;
    totalRetirement = 0;
    totalIndividualInvesting = 0;
    primaryHouseEquity = 0;
    rentalEquity = 0;
    totalSavings = 0;
    totalGivingBalance = 0;
    // Interest
    totalRemainingMortgageInterest = 0;
    totalRemainingDebtInterest = 0;
    totalRetirementInterest = 0;
    totalIndividualInvestingInterest = 0;
    primaryHouseInterest = 0;
    rentalInterest = 0;
    totalSavingsInterest = 0;
    totalGivingInterest = 0;
    // Term
    totalRemainingMortgageTerm = 0;
    totalRemainingDebtTerm = 0;
    //Payments
    totalRemainingMortgagePayment = 0;
    totalRemainingDebtPayment = 0;
    totalGivingPayment = 0;
    netWorth = 0;
    updateTimeline();
    document.getElementById("ageYears").value = ageYears;
    document.getElementById("ageMonths").value = ageMonths;
    updateTotalAmounts();
    updateMortgagePayment();
    updateDebtPayment();
    updateInputs();
    updateInterestInputs();
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
    totalRemainingMortgage = parseFloat(parseFloat(document.getElementById("remainingMortgageBalance").value).toFixed(2));
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
    if (totalRemainingMortgage >= (monthlyMortgage - mortgageMonthInterest)) {
        totalRemainingMortgage = parseFloat((totalRemainingMortgage - monthlyMortgage + mortgageMonthInterest).toFixed(2));
    }
    else if (totalRemainingMortgage < (monthlyMortgage - mortgageMonthInterest) && totalRemainingMortgage > 0) {
        totalSavings = parseFloat((totalSavings + monthlyMortgage - mortgageMonthInterest - totalRemainingMortgage).toFixed(2));
        totalRemainingMortgage = 0;
        totalRemainingMortgageInterest = 0;
        totalRemainingMortgageTerm = 0;
        updateMortgagePayment();
    }
    
    var debtMonthInterest = parseFloat(totalRemainingDebtPayment * (totalRemainingDebtInterest / 1200));
    if (totalRemainingDebt >= (monthlyDebt - debtMonthInterest)) {
        totalRemainingDebt = parseFloat((totalRemainingDebt - monthlyDebt + debtMonthInterest).toFixed(2));
    }
    else if (totalRemainingDebt < (monthlyDebt - debtMonthInterest) && totalRemainingDebt > 0) {
        totalSavings = parseFloat((totalSavings + monthlyDebt - debtMonthInterest - totalRemainingDebt).toFixed(2));
        totalRemainingDebt = 0;
        totalRemainingDebtInterest = 0;
        totalRemainingDebtTerm = 0;
        updateDebtPayment();
    }
    totalGivingBalance = parseFloat(((totalGivingBalance * (1 + (totalGivingInterest /1200))) + monthlyGiving).toFixed(2));
    totalRetirement = parseFloat(((totalRetirement * (1 + (totalRetirementInterest / 1200))) + monthlyRetirement).toFixed(2));
    totalIndividualInvesting = parseFloat(((totalIndividualInvesting * (1 + (totalIndividualInvestingInterest / 1200))) + monthlyIndividualInvesting).toFixed(2));
    primaryHouseEquity = parseFloat((primaryHouseEquity * (1 + (primaryHouseInterest / 1200))).toFixed(2));
    rentalEquity = parseFloat((rentalEquity * (1 + (rentalInterest / 1200))).toFixed(2));
    totalSavings = parseFloat(((totalSavings * (1 + (totalSavingsInterest / 1200))) + monthCheck).toFixed(2));
    if (currentMonth === 0) {
        var tempPayout = (totalGivingBalance * .05);
        totalGivingBalance -= tempPayout;
        totalGivingPayment += tempPayout;
        totalGivingBalance = parseFloat(totalGivingBalance.toFixed(2));
    }
    updateNetWorth();
}

function updateNetWorth() {
    netWorth = totalRetirement + totalIndividualInvesting + primaryHouseEquity + rentalEquity + totalSavings - totalRemainingMortgage - totalRemainingDebt;
    if ((netWorth >= 1000000) && (lastNetWorth < 1000000)) {
        alert("You are a millionaire! Net Worth: " + Number(netWorth).toLocaleString('en-US', {style: 'currency',currency: 'USD'}));
    }
    if ((netWorth >= 1000000000) && (lastNetWorth < 1000000000)) {
        alert("You are a billionaire! Net Worth: " + Number(netWorth).toLocaleString('en-US', {style: 'currency',currency: 'USD'}));
    }
    lastNetWorth = netWorth;
    updateTotalAmounts();
}

// Display
function updateTimeline() {
    document.getElementById("simulatedYears").innerHTML = simulatedYears;
    document.getElementById("simulatedMonths").innerHTML = simulatedMonths;
}

function updateTotalAmounts() {
    document.getElementById("remainingMortgageBalance").value = parseFloat(totalRemainingMortgage);
    document.getElementById("remainingDebtBalance").value = parseFloat(totalRemainingDebt);
    document.getElementById("totalRetirementBalance").value = parseFloat(totalRetirement);
    document.getElementById("totalIndividualInvestingBalance").value = parseFloat(totalIndividualInvesting);
    document.getElementById("primaryHouseEquityBalance").value = parseFloat(primaryHouseEquity);
    document.getElementById("totalRentalEquityBalance").value = parseFloat(rentalEquity);
    document.getElementById("totalSavingsBalance").value = parseFloat(totalSavings);
    document.getElementById("netWorth").innerHTML = Number(netWorth).toLocaleString('en-US', {style: 'currency',currency: 'USD'});
    document.getElementById("totalGivingBalance").value = parseFloat(totalGivingBalance);
    document.getElementById("totalGivingPayment").innerHTML = Number(totalGivingPayment).toLocaleString('en-US', {style: 'currency',currency: 'USD'});
    document.getElementById("remainingMortgageInterest").value = parseFloat(totalRemainingMortgageInterest);
    document.getElementById("remainingMortgageTerm").value = parseFloat(totalRemainingMortgageTerm);
    document.getElementById("remainingDebtInterest").value = parseFloat(totalRemainingDebtInterest);
    document.getElementById("remainingDebtTerm").value = parseFloat(totalRemainingDebtTerm);
}

function updateMortgagePayment() {
    var monthlyMortgageRate = totalRemainingMortgageInterest/1200;
    var monthsMortgage = totalRemainingMortgageTerm * 12;
    totalRemainingMortgagePayment = totalRemainingMortgage * ((monthlyMortgageRate * Math.pow((1 + monthlyMortgageRate),monthsMortgage))/(Math.pow((1+monthlyMortgageRate),monthsMortgage)-1));
    if (isFinite(totalRemainingMortgagePayment)) {
        document.getElementById("remainingMortgagePayment").innerHTML = "$" + parseFloat(totalRemainingMortgagePayment).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    if (totalRemainingMortgage <= 0) {
        totalRemainingMortgagePayment = 0;
        document.getElementById("remainingMortgagePayment").innerHTML = "$" + parseFloat(totalRemainingMortgagePayment).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}

function updateDebtPayment() {
    var monthlyDebtRate = totalRemainingDebtInterest/1200;
    var monthsDebt = totalRemainingDebtTerm * 12;
    totalRemainingDebtPayment = totalRemainingDebt * ((monthlyDebtRate * Math.pow((1 + monthlyDebtRate),monthsDebt))/(Math.pow((1+monthlyDebtRate),monthsDebt)-1));
    if (isFinite(totalRemainingDebtPayment)) {
        document.getElementById("remainingDebtPayment").innerHTML = "$" + parseFloat(totalRemainingDebtPayment).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    if (totalRemainingDebt <= 0) {
        totalRemainingDebtPayment = 0;
        document.getElementById("remainingDebtPayment").innerHTML = "$" + parseFloat(totalRemainingDebtPayment).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
