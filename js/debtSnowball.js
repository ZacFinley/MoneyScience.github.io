var debtList = [];
var monthlyDebtBudget = 0.00;

var minimumPaymentsTotal = 0.00;
var aboveMinumumPaymentsAmount = 0.00;

function updateTotalMonthlyDebtBudget() {
    monthlyDebtBudget = parseFloat(document.getElementById("monthlyDebtBudgetInput").value);
    calculateMinimumPaymentTotal();
    makeListOutput();
}

function addToDebtList() {
    var debtListRow = [];
    minimumPaymentsTotal = 0.00;
    debtListRow.push(document.getElementById("loanNameInput").value);
    debtListRow.push(parseFloat(document.getElementById("loanBalanceInput").value));
    debtListRow.push(parseFloat(document.getElementById("loanInterestInput").value));
    debtListRow.push(parseFloat(document.getElementById("loanPaymentInput").value));
    debtList.push(debtListRow);
    debtList = debtList.sort(function(a,b) {
                   return a[1] - b[1];
                   });
    calculateMinimumPaymentTotal();
    makeListOutput();
}

function calculateMinimumPaymentTotal() {
    minimumPaymentsTotal = 0.00;
    for (var i = 0; i < debtList.length; i++) {
        minimumPaymentsTotal += debtList[i][3];
    }
    aboveMinumumPaymentsAmount = monthlyDebtBudget - minimumPaymentsTotal;
    document.getElementById("nonMinimumPayment").innerHTML = "You have $" + parseFloat(aboveMinumumPaymentsAmount).toFixed(2) + " above your minimum payments to paydown your debts";
}

function makeListOutput() {
    var previousMinimumPaymentGone = 0.0;
    document.getElementById("debtList").innerHTML = "";
    for (var i = 0; i < debtList.length; i++){
        createNewDebtCard(debtList[i][0], debtList[i][1], debtList[i][2], debtList[i][3], previousMinimumPaymentGone);
        previousMinimumPaymentGone += debtList[i][3];
    }
}

function createNewDebtCard(name, balance, rate, payment, previousPayment) {
        // months to pay off
    var snowballPayment = (previousPayment + aboveMinumumPaymentsAmount + payment);
    var monthsToPayoff = 0;
    if (snowballPayment >= balance) {
        monthsToPayoff = 1;
    }
    else {
        monthsToPayoff = calculatePayoffMonths(balance, rate, payment, (previousPayment + aboveMinumumPaymentsAmount));
    }
    document.getElementById("debtList").innerHTML += "<div class='card'>Name: " + name + "<br>Balance: $" + balance + "<br>Rate: " + rate + "%<br>Minimum Payment: $" + payment + "<br>Snowball Payment: $" + parseFloat(snowballPayment).toFixed(2) + "<br>Months to Payoff: " + monthsToPayoff + "</div>";
}

function calculatePayoffMonths(balance, rate, minPayment, extraPayment) {
    var monthsUntilPayoff = 0;
    var tempBalance = balance;
    while (tempBalance > 0) {
        monthsUntilPayoff++;
        tempBalance -= (minPayment * (1-(rate/100)));
        tempBalance -= extraPayment
    }
    return monthsUntilPayoff;
}

