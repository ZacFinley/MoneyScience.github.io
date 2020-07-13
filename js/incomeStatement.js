var income = [];
var expenses = [];
var savings = [];

var incomeTotal = 0.00;
var expenseTotal = 0.00;
var savingsTotal = 0.00;
var netIncome = 0.00;

function calculateTotals() {
    if (income.length > 0){
        incomeTotal = 0;
        for(var i = 0; i < income.length; i++){
            incomeTotal += income[i][1];
        }
    }
    if (expenses.length > 0){
        expenseTotal = 0;
        for(var j = 0; j < expenses.length; j++){
            expenseTotal += expenses[j][1];
        }
    }
    netIncome = incomeTotal - expenseTotal;
}

function updateIncomeStatement() {
    calculateTotals();
    // Income header
    document.getElementById("incomeStatement").innerHTML = "<tr><td>Income:</td></tr>";
    
    // Income line items
    if (income.length > 0){
        for (var i = 0; i < income.length; i++) {
            document.getElementById("incomeStatement").innerHTML += "<tr><td></td><td>" + income[i][0] + "</td><td>$" + parseFloat(income[i][1]).toFixed(2) + "</td><td></td></tr>";
        }
    }
    
    // Total income
    document.getElementById("incomeStatement").innerHTML += "<tr><td></td><td>Total Income:</td><td></td><td>$" + parseFloat(incomeTotal).toFixed(2) + "</td></tr>";
    
    // Expense header
    document.getElementById("incomeStatement").innerHTML += "<tr><td>Expenses:</td></tr>";
    
    // Expense line items
    if (expenses.length > 0){
        for (var i = 0; i < expenses.length; i++) {
            document.getElementById("incomeStatement").innerHTML += "<tr><td></td><td>" + expenses[i][0] + "</td><td>$" + parseFloat(expenses[i][1]).toFixed(2) + "</td><td></td></tr>";
        }
    }
    
    // Total expenses
    document.getElementById("incomeStatement").innerHTML += "<tr><td></td><td>Total Expenses:</td><td></td><td>$" + parseFloat(expenseTotal).toFixed(2) + "</td></tr>";
    
    // Net Income
    document.getElementById("incomeStatement").innerHTML += "<tr><td class='font20Bold'>Net Income:</td><td></td><td></td><td class='font20Bold'>$" + parseFloat(netIncome).toFixed(2) + "</td></tr>";
    
    // Savings header
    document.getElementById("incomeStatement").innerHTML += "<tr><td>Savings:</td></tr>";
    
    // Savings line items
    if (savings.length > 0){
        for (var i = 0; i < savings.length; i++) {
            document.getElementById("incomeStatement").innerHTML += "<tr><td></td><td>" + savings[i][0] + "</td><td>$" + parseFloat(savings[i][1]).toFixed(2) + "</td><td></td></tr>";
        }
    }
    // Total savings
    document.getElementById("incomeStatement").innerHTML += "<tr><td></td><td>Total Savings:</td><td></td><td>$" + parseFloat(savingsTotal).toFixed(2) + "</td></tr>";
    
}

function addIncome() {
    // Adding the item
    var incomeLineItem = [];
    incomeLineItem.push(document.getElementById("incomeName").value);
    incomeLineItem.push(parseFloat(document.getElementById("incomeAmount").value));
    income.push(incomeLineItem);
    // Update the statement
    updateIncomeStatement();
    // Reset inputs
    document.getElementById("incomeName").value = "Income Item";
    document.getElementById("incomeAmount").value = 0.00;
}

function addExpense() {
    // Adding the item
    var expenseLineItem = [];
    expenseLineItem.push(document.getElementById("expenseName").value);
    expenseLineItem.push(parseFloat(document.getElementById("expenseAmount").value));
    expenses.push(expenseLineItem);
    // Update the statement
    updateIncomeStatement();
    // Reset inputs
    document.getElementById("expenseName").value = "Expense Item";
    document.getElementById("expenseAmount").value = 0.00;
}

function addSavings() {
    // Adding the item
    var savingsLineItem = [];
    savingsLineItem.push(document.getElementById("savingsName").value);
    savingsLineItem.push(parseFloat(document.getElementById("savingsAmount").value));
    savings.push(savingsLineItem);
    // Update the statement
    updateIncomeStatement();
    // Reset inputs
    document.getElementById("savingsName").value = "Savings Item";
    document.getElementById("savingsAmount").value = 0.00;
}
