var debtList = [];
var monthlyDebtBudget = 0.00;

var minimumPaymentsTotal = 0.00;
var aboveMinumumPaymentsAmount = 0.00;

function updateTotalMonthlyDebtBudget() {
    if (document.getElementById("monthlyDebtBudgetInput").value >= minimumPaymentsTotal) {
        monthlyDebtBudget = parseFloat(document.getElementById("monthlyDebtBudgetInput").value);
        calculateMinimumPaymentTotal();
        makeListOutput();
    }
    else {
        alert("Must enter a number larger than your currenct budget of $" + parseFloat(monthlyDebtBudget).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        document.getElementById("monthlyDebtBudgetInput").value = parseFloat(monthlyDebtBudget.toFixed(2));
    }
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
                             return b[2] - a[2];
                             });
    debtList = debtList.sort(function(a,b) {
                    return a[1] - b[1];
                });
    monthlyDebtBudget += parseFloat(document.getElementById("loanPaymentInput").value);
    document.getElementById("monthlyDebtBudgetInput").value = parseFloat(monthlyDebtBudget.toFixed(2));
    calculateMinimumPaymentTotal();
    makeListOutput();
    document.getElementById("loanNameInput").value = "";
    document.getElementById("loanBalanceInput").value = "0.00";
    document.getElementById("loanInterestInput").value = "0.00";
    document.getElementById("loanPaymentInput").value = "0.00";
}

function calculateMinimumPaymentTotal() {
    minimumPaymentsTotal = 0.00;
    for (var i = 0; i < debtList.length; i++) {
        minimumPaymentsTotal += debtList[i][3];
    }
    aboveMinumumPaymentsAmount = monthlyDebtBudget - minimumPaymentsTotal;
    document.getElementById("nonMinimumPayment").innerHTML = "You have $" + parseFloat(aboveMinumumPaymentsAmount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " above your minimum payments to paydown your debts";
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
    document.getElementById("debtList").innerHTML += "<div class='card'>Name: " + name + "<br>Balance: $" + parseFloat(balance).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "<br>Rate: " + rate + "%<br>Minimum Payment: $" + parseFloat(payment).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "<br>Snowball Payment: $" + parseFloat(snowballPayment).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "<br>Months to Payoff: " + monthsToPayoff + "</div>";
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

