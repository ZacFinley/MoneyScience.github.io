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

// Account Manipulation
function adjustAccounts() {
    var monthCheck = monthlySalary;
    monthCheck = monthCheck - (monthlyRent + monthlyMortgage + monthlyUtilities + monthlyFood + monthlyTransportation + monthlyInternet + monthlyPhone + monthlyDebt + monthlyRetirement + monthlyIndividualInvesting);
    totalRemainingMortgage -= monthlyMortgage; // handle reducing properly
    totalRemainingDebt -= monthlyDebt; // handle reducing properly
    totalRetirement += monthlyRetirement; // handle the interest
    totalIndividualInvesting += monthlyIndividualInvesting; // handle the interest
    totalSavings += monthCheck;
}


// Display
function updateTimeline() {
    document.getElementById("years").innerHTML = years;
    document.getElementById("months").innerHTML = months;
}

function updateInputs() {
    document.getElementById("monthlySalary").innerHTML = monthlySalary;
    document.getElementById("monthlyRent").innerHTML = monthlyRent;
    document.getElementById("monthlyMortgage").innerHTML = monthlyMortgage;
    document.getElementById("monthlyUtilities").innerHTML = monthlyUtilities;
    document.getElementById("monthlyFood").innerHTML = monthlyFood;
    document.getElementById("monthlyTransportation").innerHTML = monthlyTransportation;
    document.getElementById("monthlyInternet").innerHTML = monthlyInternet;
    document.getElementById("monthlyPhone").innerHTML = monthlyPhone;
    document.getElementById("monthlyDebt").innerHTML = monthlyDebt;
    document.getElementById("monthlyRetirement").innerHTML = monthlyRetirement;
    document.getElementById("monthlyIndividualInvesting").innerHTML = monthlyIndividualInvesting;
    document.getElementById("monthlySavings").innerHTML = monthlySavings;
}

function updateTotalAmounts() {
    document.getElementById("remainingMortgage").innerHTML = "$" + totalRemainingMortgage;
    document.getElementById("remainingDebt").innerHTML = "$" + totalRemainingDebt;
    document.getElementById("totalRetirement").innerHTML = "$" + totalRetirement;
    document.getElementById("totalIndividualInvesting").innerHTML = "$" + totalIndividualInvesting;
    document.getElementById("totalSavings").innerHTML = "$" + totalSavings;
}

function liveMonth() {
    addMonth();
    updateTimeline();
    updateInputs();
    adjustAccounts();
    updateTotalAmounts();
}
