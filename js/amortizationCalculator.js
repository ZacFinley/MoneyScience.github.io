var loanAmount = 0.00;
var loanInterestAnnual = 0.00;
var loanInterestMonthly = 0.00;
var loanDurationYears = 0;
var loanDurationMonths = 0;

var payment = 0.00;

var paymentChart = [];

var extraPaymentAmount = 0.00;

function updateAll() {
    // call update functions
    updateLoanInterest();
    updateLoanAmount();
    updateDuration();
    updateExtraPaymentAmount();
    
    // call the calculation function
    calculatePayment();
    calculateChart();
}

function calculatePayment() {
    payment = ((loanAmount * loanInterestMonthly) / (1 - Math.pow((1 + loanInterestMonthly), -loanDurationMonths)));
    updatePaymentResult();
}

function calculateChart() {
    paymentChart = [];
    var year = new Date().getYear() + 1900;
    var month = new Date().getMonth();
    var remainingBalance = loanAmount;
    var remainingBalanceExtraPayment = loanAmount;
    var paymentChartRow = [];
    for (var i = 0; i < loanDurationMonths; i++) {
        paymentChartRow = [];
        paymentChartRow.push(year);
        paymentChartRow.push(getMonthName(month));
        paymentChartRow.push(parseFloat(payment).toFixed(2));
        paymentChartRow.push(parseFloat(payment-(remainingBalance*loanInterestMonthly)).toFixed(2));
        paymentChartRow.push(parseFloat(remainingBalance*loanInterestMonthly).toFixed(2));
        remainingBalance -= payment-(remainingBalance*loanInterestMonthly);
        paymentChartRow.push(remainingBalance);
        if (extraPaymentAmount > 0) {
            paymentChartRow.push(parseFloat(payment-(remainingBalanceExtraPayment*loanInterestMonthly)).toFixed(2));
            paymentChartRow.push(parseFloat(remainingBalanceExtraPayment*loanInterestMonthly).toFixed(2));
            paymentChartRow.push(extraPaymentAmount);
            remainingBalanceExtraPayment -= payment-(remainingBalanceExtraPayment*loanInterestMonthly);
            remainingBalanceExtraPayment -= extraPaymentAmount;
            if (remainingBalanceExtraPayment >= 0) {
                paymentChartRow.push(remainingBalanceExtraPayment);
            }
            else {
                paymentChartRow.push(0.00);
            }
        }
        else {
            paymentChartRow.push(0.00);
            paymentChartRow.push(0.00);
            paymentChartRow.push(0.00);
            paymentChartRow.push(0.00);
        }
        paymentChart.push(paymentChartRow);
        if (month === 11) {
            month = 0;
            year++;
        }
        else {
            month++;
        }
    }
    updatePaymentChart();
}

function getMonthName(num) {
    const monthNames = ["January", "February", "March",
                        "April", "May", "June",
                        "July", "August", "September",
                        "October", "November", "December"];
    return monthNames[num];
}

function updateLoanInterest() {
    loanInterestAnnual = document.getElementById("loanInterestInput").value/100;
    loanInterestMonthly = loanInterestAnnual/12;
}

function updateLoanAmount() {
    loanAmount = document.getElementById("loanAmountInput").value;
}

function updateDuration() {
    loanDurationYears = document.getElementById("loanDurationInput").value;
    loanDurationMonths = loanDurationYears*12;
}

function updatePaymentResult() {
    document.getElementById("paymentResult").innerHTML = "Your payment will be: $" + parseFloat(payment).toFixed(2);
}

function updatePaymentChart() {
    document.getElementById("amortizationChart").innerHTML = "<tr><th>Year</th><th>Month</th><th>Payment</th><th>Principal</th><th>Interest</th><th>Loan Balance</th><th>Principal</th><th>Interest</th><th>Extra Payment</th><th>Loan Balance with Extra Payment</th></tr>";
    for (var i = 0; i < paymentChart.length; i++){
        document.getElementById("amortizationChart").innerHTML += "<tr><td>" + paymentChart[i][0] + "</td><td>" + paymentChart[i][1] + "</td><td>$" + parseFloat(paymentChart[i][2]).toFixed(2) + "</td><td>$" + parseFloat(paymentChart[i][3]).toFixed(2) + "</td><td>$" + parseFloat(paymentChart[i][4]).toFixed(2) + "</td><td>$" + parseFloat(paymentChart[i][5]).toFixed(2) + "</td><td>$" + parseFloat(paymentChart[i][6]).toFixed(2) + "</td><td>$" + parseFloat(paymentChart[i][7]).toFixed(2) + "</td><td>$" + parseFloat(paymentChart[i][8]).toFixed(2) + "</td><td>$" + parseFloat(paymentChart[i][9]).toFixed(2) + "</td></tr>";
    }
}

function updateExtraPaymentAmount() {
    extraPaymentAmount = document.getElementById("extraPaymentAmountInput").value;
}
