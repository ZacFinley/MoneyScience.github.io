var accounts = [[["",0.0,0.0,0.0,0.0,0.0]]];

function addInvestment(accountid) {
    document.getElementById("account"+accountid).innerHTML += "<tr><td><input id='investment" + accounts[accountid].length + "Ticker' class='tickerInput' onChange=''></input></td><td><input id='investment" + accounts[accountid].length + "Shares' class='sharesInput' onChange=''></input></td><td><input id='investment" + accounts[accountid].length + "Price' class='priceInput' onChange=''></input></td><td id='investment" + accounts[accountid].length + "CurrentTotal' class='center'>$0.00</td><td><input id='investment" + accounts[accountid].length + "Adjustment' class='adjustmentInput' type='number' value='0' step='.1' onChange=''></input></td><td id='investment" + accounts[accountid].length + "ProjectedTotal' class='center'>$0.00</td></tr>";
}
