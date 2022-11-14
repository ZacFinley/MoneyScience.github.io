var startAge = 19;
var benEndArthurStartAge = 26
var endAge = 85;
var interestRate = 10;
var contributionAmount = 1000;

function updateStartAge() {
    startAge = parseInt(document.getElementById("startAgeInput").value);
    calculateChart();
}

function updateBenEndArthurStartAge() {
    benEndArthurStartAge = parseInt(document.getElementById("benEndArthurStartAgeInput").value);
    calculateChart();
}

function updateEndAge() {
    endAge = parseInt(document.getElementById("endAgeInput").value);
    calculateChart();
}

function updateInterestRate() {
    interestRate = parseFloat(document.getElementById("interestRateInput").value);
    calculateChart();
}

function updateContributionAmount() {
    contributionAmount = parseFloat(document.getElementById("contributionAmountInput").value);
    calculateChart();
}

function createHeaderRows() {
    document.getElementById("benArthurChart").innerHTML = "<tr><th></th><th>Ben</th><th></th><th>Arthur</th><th></th></tr>";
    document.getElementById("benArthurChart").innerHTML += "<tr><th>Age</th><th>Contribution</th><th>Total</th><th>Contribution</th><th>Total</th></tr>";
}

function calculateChart(){
    createHeaderRows();
    let benAmount = 0;
    let arthurAmount = 0;
    for (let i = startAge; i <= endAge; i++){
        let benContribution = (i < benEndArthurStartAge ? contributionAmount : 0.00);
        let arthurContribution = (i >= benEndArthurStartAge ? contributionAmount : 0.00);
        benAmount += benContribution;
        benAmount = benAmount * (1 + (interestRate/100));
        arthurAmount += arthurContribution;
        arthurAmount = arthurAmount * (1 + (interestRate/100));
        document.getElementById("benArthurChart").innerHTML += "<tr><td>" + i + "</td><td>$" + formatNumber(benContribution) + "</td><td " + (benAmount > arthurAmount ? "class='whiteGreen'" : "") + ">$" + formatNumber(benAmount) + "</td><td>$" + formatNumber(arthurContribution) + "</td><td " + (arthurAmount > benAmount ? "class='whiteGreen'" : "") + ">$" + formatNumber(arthurAmount) + "</td></tr>";
    }
}

function formatNumber(numberInput) {
    return parseFloat(numberInput).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
