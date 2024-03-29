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
var monthlyTaxes = 0;
var monthlyRent = 0;
var monthlyMortgage = 0;
var monthlyUtilities = 0;
var monthlyFood = 0;
var monthlyTransportation = 0;
var monthlyInternet = 0;
var monthlyPhone = 0;
var monthlyInsurance = 0;
var monthlyDebt = 0;
var monthlyOther = 0;

var monthlyRetirement = 0;
var monthlyIndividualInvesting = 0;
var monthlySavings = 0;
var monthlyHsa = 0;


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
var totalHsa = 0;

var totalGivingBalance = 0;
    // Interest
var totalRemainingMortgageInterest = 0;
var totalRemainingDebtInterest = 0;
var totalRetirementInterest = 0;
var totalIndividualInvestingInterest = 0;
var primaryHouseInterest = 0;
var rentalInterest = 0;
var totalSavingsInterest = 0;
var totalHsaInterest = 0;
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
    document.getElementById("monthlySalary").value = monthlySalary.toFixed(2);
    document.getElementById("monthlyRentalProfit").value = monthlyRentalProfit.toFixed(2);
    document.getElementById("monthlyGiving").value = monthlyGiving.toFixed(2);
    document.getElementById("monthlyTaxes").value = monthlyTaxes.toFixed(2);
    document.getElementById("monthlyRent").value = monthlyRent.toFixed(2);
    document.getElementById("monthlyMortgage").value = monthlyMortgage.toFixed(2);
    document.getElementById("monthlyUtilities").value = monthlyUtilities.toFixed(2);
    document.getElementById("monthlyFood").value = monthlyFood.toFixed(2);
    document.getElementById("monthlyTransportation").value = monthlyTransportation.toFixed(2);
    document.getElementById("monthlyInternet").value = monthlyInternet.toFixed(2);
    document.getElementById("monthlyPhone").value = monthlyPhone.toFixed(2);
    document.getElementById("monthlyInsurance").value = monthlyInsurance.toFixed(2);
    document.getElementById("monthlyDebt").value = monthlyDebt.toFixed(2);
    document.getElementById("monthlyOther").value = monthlyOther.toFixed(2);
    document.getElementById("monthlyRetirement").value = monthlyRetirement.toFixed(2);
    document.getElementById("monthlyIndividualInvesting").value = monthlyIndividualInvesting.toFixed(2);
    document.getElementById("monthlySavings").value = monthlySavings.toFixed(2);
    document.getElementById("monthlyHsa").value = monthlyHsa.toFixed(2);
}

function updateInterestInputs() {
    document.getElementById("remainingMortgageInterest").value = totalRemainingMortgageInterest.toFixed(2);
    document.getElementById("remainingDebtInterest").value = totalRemainingDebtInterest.toFixed(2);
    document.getElementById("totalRetirementInterest").value = totalRetirementInterest.toFixed(2);
    document.getElementById("totalIndividualInvestingInterest").value = totalIndividualInvestingInterest.toFixed(2);
    document.getElementById("primaryHouseEquityInterest").value = primaryHouseInterest.toFixed(2);
    document.getElementById("totalRentalEquityInterest").value = rentalInterest.toFixed(2);
    document.getElementById("totalSavingsInterest").value = totalSavingsInterest.toFixed(2);
    document.getElementById("totalHsaInterest").value = totalHsaInterest.toFixed(2);
    document.getElementById("totalGivingInterest").value = totalGivingInterest.toFixed(2);
}

function randomizeInputs() {
    // Timeline
    ageMonths = Math.floor((Math.random() * 100) % 12);
    ageYears = Math.floor(Math.random() * 100);
    document.getElementById("ageYears").value = ageYears;
    document.getElementById("ageMonths").value = ageMonths;
    // Inputs
    monthlySalary = parseFloat((Math.random() * 10000).toFixed(2));
    monthlyTaxes = parseFloat((monthlySalary * .3).toFixed(2));
    if (Math.floor(Math.random()*10) > 4) {
        monthlyRent = parseFloat((monthlySalary * .25).toFixed(2));
        monthlyMortgage = 0;
        totalRemainingMortgage = 0;
        primaryHouseEquity = 0;
        totalRemainingMortgageInterest = 0;
        totalRemainingMortgageTerm = 0;
    }
    else {
        monthlyRent = 0;
        // Terms
        totalRemainingMortgageTerm = Math.floor((Math.random() * 30));
        // Balances
        totalRemainingMortgage = parseFloat((Math.random() * ((monthlySalary - monthlyTaxes)*.25*12*totalRemainingMortgageTerm)).toFixed(2));
        primaryHouseEquity = parseFloat((Math.random() * totalRemainingMortgage*2).toFixed(2));
        // Interest
        totalRemainingMortgageInterest = parseFloat((Math.random() * 10).toFixed(2));
    }
    
    monthlyUtilities = parseFloat((100+(Math.random() * 200)).toFixed(2));
    monthlyFood = parseFloat((150+(Math.random() * 450)).toFixed(2));
    monthlyTransportation = parseFloat((50+(Math.random() * 500)).toFixed(2));
    monthlyInternet = parseFloat((50+(Math.random() * 100)).toFixed(2));
    monthlyPhone = parseFloat((50+(Math.random() * 100)).toFixed(2));
    monthlyInsurance = parseFloat((10+(Math.random() * 100)).toFixed(2));
    monthlyDebt = parseFloat((Math.random() * 1000).toFixed(2));
    monthlyRetirement = parseFloat((monthlySalary * .15).toFixed(2));
    monthlyIndividualInvesting = 0;
    monthlySavings = 0;
    updateInputs();
    // Balances
    totalRemainingDebt = parseFloat((Math.random() * 100000).toFixed(2));
    totalRetirement = parseFloat((Math.random() * 1000 * ageYears).toFixed(2));
    totalIndividualInvesting = 0;
    totalSavings = parseFloat((Math.random() * 100000).toFixed(2));
    // Terms
    totalRemainingDebtTerm = Math.floor((Math.random() * 30));
    // Interest
    totalRemainingDebtInterest = Math.floor((Math.random() * 100))/10;
    totalRetirementInterest = Math.floor((Math.random() * 100))/10;
    totalIndividualInvestingInterest = Math.floor((Math.random() * 100))/10;
    primaryHouseInterest = 3 + (Math.floor((Math.random() * 10))/10);
    rentalInterest = 3 + (Math.floor((Math.random() * 10))/10);
    totalSavingsInterest = Math.floor((Math.random()*100))/100;
    totalGivingInterest = Math.floor((Math.random() * 100))/10;
    updateInterestInputs();
    updateMortgagePayment();
    updateRemainingIncome();
    updateNetWorth();
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
    monthlyTaxes = 0;
    monthlyRent = 0;
    monthlyMortgage = 0;
    monthlyUtilities = 0;
    monthlyFood = 0;
    monthlyTransportation = 0;
    monthlyInternet = 0;
    monthlyPhone = 0;
    monthlyInsurance = 0;
    monthlyDebt = 0;
    monthlyOther = 0;
    monthlyRetirement = 0;
    monthlyIndividualInvesting = 0;
    monthlySavings = 0;
    monthlyHsa = 0;
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
    totalHsa = 0;
    totalGivingBalance = 0;
    // Interest
    totalRemainingMortgageInterest = 0;
    totalRemainingDebtInterest = 0;
    totalRetirementInterest = 0;
    totalIndividualInvestingInterest = 0;
    primaryHouseInterest = 0;
    rentalInterest = 0;
    totalSavingsInterest = 0;
    totalHsaInterest = 0;
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
    updateRemainingIncome();
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
    updateRemainingIncome();
}

function updateMonthlyRentalProfit() {
    monthlyRentalProfit = parseFloat(document.getElementById("monthlyRentalProfit").value);
    updateRemainingIncome();
}

function updateMonthlyGiving() {
    monthlyGiving = parseFloat(document.getElementById("monthlyGiving").value);
    updateRemainingIncome();
}

function updateMonthlyTaxes() {
    monthlyTaxes = parseFloat(document.getElementById("monthlyTaxes").value);
    updateRemainingIncome();
}

function updateMonthlyRent() {
    monthlyRent = parseFloat(document.getElementById("monthlyRent").value);
    updateRemainingIncome();
}

function updateMonthlyMortgage() {
    monthlyMortgage = parseFloat(document.getElementById("monthlyMortgage").value);
    updateRemainingIncome();
}

function updateMonthlyUtilities() {
    monthlyUtilities = parseFloat(document.getElementById("monthlyUtilities").value);
    updateRemainingIncome();
}

function updateMonthlyFood() {
    monthlyFood = parseFloat(document.getElementById("monthlyFood").value);
    updateRemainingIncome();
}

function updateMonthlyTransportation() {
    monthlyTransportation = parseFloat(document.getElementById("monthlyTransportation").value);
    updateRemainingIncome();
}

function updateMonthlyInternet() {
    monthlyInternet = parseFloat(document.getElementById("monthlyInternet").value);
    updateRemainingIncome();
}

function updateMonthlyPhone() {
    monthlyPhone = parseFloat(document.getElementById("monthlyPhone").value);
    updateRemainingIncome();
}

function updateMonthlyInsurance() {
    monthlyInsurance = parseFloat(document.getElementById("monthlyInsurance").value);
    updateRemainingIncome();
}

function updateMonthlyDebt() {
    monthlyDebt = parseFloat(document.getElementById("monthlyDebt").value);
    updateRemainingIncome();
}

function updateMonthlyOther() {
    monthlyOther = parseFloat(document.getElementById("monthlyOther").value);
    updateRemainingIncome();
}

function updateMonthlyRetirement() {
    monthlyRetirement = parseFloat(document.getElementById("monthlyRetirement").value);
    updateRemainingIncome();
}

function updateMonthlyIndividualInvesting() {
    monthlyIndividualInvesting = parseFloat(document.getElementById("monthlyIndividualInvesting").value);
    updateRemainingIncome();
}

function updateMonthlySavings() {
    monthlySavings = parseFloat(document.getElementById("monthlySavings").value);
    updateRemainingIncome();
}

function updateMonthlyHsa() {
    monthlyHsa = parseFloat(document.getElementById("monthlyHsa").value);
    updateRemainingIncome();
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

function updateTotalHsa() {
    totalHsa = parseFloat(document.getElementById("totalHsaBalance").value);
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

function updateTotalHsaInterest() {
    totalHsaInterest = parseFloat(document.getElementById("totalHsaInterest").value);
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
    monthCheck = monthCheck - (monthlyGiving + monthlyTaxes + monthlyRent + monthlyMortgage + monthlyUtilities + monthlyFood + monthlyTransportation + monthlyInternet + monthlyPhone + monthlyInsurance + monthlyDebt + monthlyOther + monthlyRetirement + monthlyIndividualInvesting + monthlyHsa);
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
    totalHsa = parseFloat(((totalHsa * (1 + (totalHsaInterest / 1200))) + monthlyHsa).toFixed(2));
    if (currentMonth === 0) {
        var tempPayout = (totalGivingBalance * .05);
        totalGivingBalance -= tempPayout;
        totalGivingPayment += tempPayout;
        totalGivingBalance = parseFloat(totalGivingBalance.toFixed(2));
    }
    updateNetWorth();
}

function updateNetWorth() {
    netWorth = totalRetirement + totalIndividualInvesting + primaryHouseEquity + rentalEquity + totalSavings + totalHsa - totalRemainingMortgage - totalRemainingDebt;
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
    document.getElementById("remainingMortgageBalance").value = parseFloat(totalRemainingMortgage).toFixed(2);
    document.getElementById("remainingDebtBalance").value = parseFloat(totalRemainingDebt).toFixed(2);
    document.getElementById("totalRetirementBalance").value = parseFloat(totalRetirement).toFixed(2);
    document.getElementById("totalIndividualInvestingBalance").value = parseFloat(totalIndividualInvesting).toFixed(2);
    document.getElementById("primaryHouseEquityBalance").value = parseFloat(primaryHouseEquity).toFixed(2);
    document.getElementById("totalRentalEquityBalance").value = parseFloat(rentalEquity).toFixed(2);
    document.getElementById("totalSavingsBalance").value = parseFloat(totalSavings).toFixed(2);
    document.getElementById("totalHsaBalance").value = parseFloat(totalHsa).toFixed(2);
    document.getElementById("netWorth").innerHTML = Number(netWorth).toLocaleString('en-US', {style: 'currency',currency: 'USD'});
    document.getElementById("totalGivingBalance").value = parseFloat(totalGivingBalance).toFixed(2);
    document.getElementById("totalGivingPayment").innerHTML = Number(totalGivingPayment).toLocaleString('en-US', {style: 'currency',currency: 'USD'});
    document.getElementById("remainingMortgageInterest").value = parseFloat(totalRemainingMortgageInterest).toFixed(2);
    document.getElementById("remainingMortgageTerm").value = parseFloat(totalRemainingMortgageTerm).toFixed(2);
    document.getElementById("remainingDebtInterest").value = parseFloat(totalRemainingDebtInterest).toFixed(2);
    document.getElementById("remainingDebtTerm").value = parseFloat(totalRemainingDebtTerm).toFixed(2);
}

function updateMortgagePayment() {
    var monthlyMortgageRate = totalRemainingMortgageInterest/1200;
    var monthsMortgage = totalRemainingMortgageTerm * 12;
    totalRemainingMortgagePayment = totalRemainingMortgage * ((monthlyMortgageRate * Math.pow((1 + monthlyMortgageRate),monthsMortgage))/(Math.pow((1+monthlyMortgageRate),monthsMortgage)-1));
    if (isFinite(totalRemainingMortgagePayment)) {
        document.getElementById("remainingMortgagePayment").innerHTML = "$" + parseFloat(totalRemainingMortgagePayment).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        monthlyMortgage = parseFloat(totalRemainingMortgagePayment.toFixed(2));
        
    }
    if (totalRemainingMortgage <= 0) {
        totalRemainingMortgagePayment = 0;
        document.getElementById("remainingMortgagePayment").innerHTML = "$" + parseFloat(totalRemainingMortgagePayment).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    updateInputs();
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

function updateRemainingIncome() {
    var income = monthlySalary + monthlyRentalProfit;
    var outgo = monthlyGiving + monthlyTaxes + monthlyRent + monthlyMortgage + monthlyUtilities + monthlyFood + monthlyTransportation + monthlyInternet + monthlyPhone + monthlyInsurance + monthlyDebt + monthlyOther + monthlyRetirement + monthlyIndividualInvesting + monthlyHsa;
    document.getElementById("monthlySavings").value = parseFloat((income - outgo)).toFixed(2);
}

function transferMoney() {
    var fromAccount = document.getElementById("fromAccount").value;
    var toAccount = document.getElementById("toAccount").value;
    var amount = document.getElementById("transferAmountInput").value;
    if (fromAccount === toAccount) {
        alert("You cannot transfer money from and to the same account!");
    }
    switch (fromAccount) {
        case "totalRetirement":
            totalRetirement -= amount;
            break;
        case "totalIndividualInvesting":
            totalIndividualInvesting -= amount;
            break;
        case "totalRentalEquity":
            totalRentalEquity -= amount;
            break;
        case "totalSavings":
            totalSavings -= amount;
            break;
        case "totalHsa":
            totalHsa -= amount;
            break;
    }
    switch (toAccount) {
        case "remainingMortgage":
            totalRemainingMortgage -= amount;
            break;
        case "remainingDebt":
            totalRemainingDebt -= amount;
            break;
        case "totalRetirement":
            totalRetirement += amount;
            break;
        case "totalIndividualInvesting":
            totalIndividualInvesting += amount;
            break;
        case "primaryHouseEquity":
            primaryHouseEquity += amount;
            break;
        case "totalRentalEquity":
            rentalEquity += amount;
            break;
        case "totalSavings":
            totalSavings += amount;
            break;
        case "totalHsa":
            totalHsa += amount;
            break;
        case "totalGiving":
            totalGivingBalance += amount;
            break;
    }
    updateTotalAmounts();
}

function updateRentalIncome() {
    monthlyRentalProfit = rentalEquity * .01;
    document.getElementById("monthlyRentalProfit").value = monthlyRentalProfit;

}
