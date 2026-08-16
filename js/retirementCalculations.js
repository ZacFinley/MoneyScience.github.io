//const fileInput = document.getElementById("fileInput");
//const uploadButton = document.getElementById("uploadButton");
//var clientData = null;
//
//uploadButton.addEventListener("click", () => {
//  const file = fileInput.files[0];
//
//  if (file) {
//    const reader = new FileReader();
//
//    reader.onload = (event) => {
//      try {
//        clientData = null;
//        clientData = JSON.parse(event.target.result);
//        loadPage();
//      } catch (error) {
//        console.error("Error parsing JSON:", error);
//      }
//    };
//
//    reader.readAsText(file);
//  }
//});

// TODO: when distributing from Aftertax we need to use a cost basis to figure out how much is taxed (it will be taxed at capital gaines)

// Put all the starting configurations here (maybe, is this needed)
function getClientsCard(){
    document.getElementById("clientsCard").innerHTML = buildClientData();
}

function buildClientData(){
    result = "";
    for (let client of clientData.clients) {
        result += getClientInfo(client);
    }
    return result;
}

function getClientInfo(client){
    result = `<div>${client.first_name} ${client.last_name} - Age: ${client.age}</div>`;
    if (client.remaining_working_years > 0) {
        result += `<div>Estimated Salary: $${client.base_salary.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>`;
        result += `<div>Estimated Bonus: $${client.estimated_bonus.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div><br>`;
    }
    return result;
}

function getTodaysAge() {
    clientData.clients.forEach(client => {
        const birthDate = new Date(client.birth_date);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        client.age = age;
    });
}

function handleFutureYears() {
    document.getElementById("futureCardsWrapper").innerHTML = "";
    for (let yearIter = youngestClientAge(); yearIter < 100; yearIter++) {
        handleFutureYearCard();
    }
}

function youngestClientAge() {
    let youngestClientAge = 120;
    for (let client of clientData.clients) {
        if (client.age < youngestClientAge) {
            youngestClientAge = client.age;
        }
    }
    return youngestClientAge;
}

function handleFutureYearCard() {
    addYearToClientAge();
    setAssetAcctDividendAmts();
    updateAssetAccts();
    document.getElementById("futureCardsWrapper").innerHTML += getFutureYearCard();
    reduceRemainingWorkingYears();
}

function setAssetAcctDividendAmts() {
    clientData.asset_accts.forEach(assetAcct => {
        let divYield = assetAcct?.dividend_yield ?? 0;
        if (assetAcct.acct_type === "401k_acct") {
            if (divYield > 0) {
                assetAcct.roth_curr_div_amt = assetAcct.roth_inv_amt * divYield;
                assetAcct.trad_curr_div_amt = assetAcct.traditional_inv_amt * divYield;
                assetAcct.after_tax_curr_div_amt = assetAcct.after_tax_inv_amt * divYield;
            }
            else {
                assetAcct.roth_curr_div_amt = 0.00;
                assetAcct.trad_curr_div_amt = 0.00;
                assetAcct.after_tax_curr_div_amt = 0.00;
            }
        } else {
            if (divYield > 0) {
                assetAcct.curr_div_amt = getAcctTotalValue(assetAcct) * divYield;
            }
            else {
                assetAcct.curr_div_amt = 0.00;
            }
        }
    });
}

function updateAssetAccts() {
    clientData.asset_accts.forEach(assetAcct => {
        switch (assetAcct.acct_type) {
            case "federal_treasury":
            case "savings":
                updateCashAccount(assetAcct);
                break;
            case "roth_ira_acct":
                updateRothIraAccount(assetAcct);
                break;
            case "traditional_ira_acct":
                updateTradIraAccount(assetAcct);
                break;
            case "401k_acct":
                update401KAccount(assetAcct);
                break;
            case "hsa_acct":
                updateHsaAccount(assetAcct);
                break;
            case "after_tax_brokerage_acct":
                updateAfterTaxAccount(assetAcct);
                break;
            case "primary_house":
                updateCashAccount(assetAcct);
                break;
        }
    });
}

function updateCashAccount(assetAcct) {
    const acctOwner = getClientByOwnerId(assetAcct.account_owner_id);
    assetAcct.previous_value = getAcctTotalValue(assetAcct);
    assetAcct.interest = assetAcct.cash * assetAcct.interest_rate;
    assetAcct.cash += assetAcct.interest;
    if (acctOwner.remaining_working_years > 0) {
        assetAcct.cash += (assetAcct.future_annual_contributions + assetAcct.future_annual_match);
    }
    assetAcct.cash += (assetAcct.previous_value * (assetAcct?.dividend_yield ?? 0));
}

function updateRothIraAccount(assetAcct) {
    const acctOwner = getClientByOwnerId(assetAcct.account_owner_id);
    assetAcct.previous_value = getAcctTotalValue(assetAcct);

    // TODO: update the inputs file to include a distribution annually starting at a given age
    
    assetAcct.interest = assetAcct.roth_inv_amt * assetAcct.interest_rate;
    assetAcct.roth_inv_amt += assetAcct.interest;
    if (acctOwner.remaining_working_years > 0) {
        assetAcct.roth_inv_amt += (assetAcct.future_annual_contributions + assetAcct.future_annual_match);
    }
    assetAcct.roth_inv_amt += (assetAcct.previous_value * assetAcct?.dividend_yield ?? 0);
}

function updateTradIraAccount(assetAcct) {
    const acctOwner = getClientByOwnerId(assetAcct.account_owner_id);
    assetAcct.previous_value = getAcctTotalValue(assetAcct);

    // TODO: update the inputs file to include a distribution annually starting at a given age
    
    assetAcct.interest = assetAcct.traditional_inv_amt * assetAcct.interest_rate;
    assetAcct.traditional_inv_amt += assetAcct.interest;
    
    if (acctOwner.remaining_working_years > 0) {
        assetAcct.traditional_inv_amt += (assetAcct.future_annual_contributions + assetAcct.future_annual_match);
    }
    assetAcct.traditional_inv_amt += (assetAcct.previous_value * assetAcct?.dividend_yield ?? 0);
    
    updateRMD(assetAcct);
}

function update401KAccount(assetAcct) {
    const acctOwner = getClientByOwnerId(assetAcct.account_owner_id);
    assetAcct.previous_value = getAcctTotalValue(assetAcct);
    
    // TODO: update the inputs file to include a distribution annually starting at a given age
    
    assetAcct.previous_roth_value = assetAcct.roth_inv_amt;
    assetAcct.previous_trad_value = assetAcct.traditional_inv_amt;
    assetAcct.previous_after_tax_value = assetAcct.after_tax_inv_amt;
    
    assetAcct.roth_interest = assetAcct.roth_inv_amt * assetAcct.interest_rate;
    assetAcct.trad_interest = assetAcct.traditional_inv_amt * assetAcct.interest_rate;
    assetAcct.after_tax_interest = assetAcct.after_tax_inv_amt * assetAcct.interest_rate;
    
    assetAcct.roth_inv_amt += assetAcct.roth_interest;
    assetAcct.traditional_inv_amt += assetAcct.trad_interest;
    assetAcct.after_tax_inv_amt += assetAcct.after_tax_interest;
    
    if (acctOwner.remaining_working_years > 0) {
        assetAcct.roth_inv_amt += assetAcct.future_annual_roth_contributions;
        assetAcct.traditional_inv_amt += (assetAcct.future_annual_trad_contributions + assetAcct.future_annual_match);
        assetAcct.after_tax_inv_amt += assetAcct.future_annual_after_tax_contributions;
    }
    
    assetAcct.roth_inv_amt += assetAcct.roth_curr_div_amt;
    assetAcct.traditional_inv_amt += assetAcct.trad_curr_div_amt;
    assetAcct.after_tax_inv_amt += assetAcct.after_tax_curr_div_amt;
    
    updateRMD(assetAcct);
}

function updateRMD(assetAcct) {
    const accountOwner = getClientByOwnerId(assetAcct.account_owner_id);
    if (assetAcct.acct_type === "401k_acct" && assetAcct.previous_trad_value > 0.00 && accountOwner.age >= getRmdStartAge()){
        assetAcct.rmd = assetAcct.previous_trad_value / getLifeExpectancyFactor(accountOwner.age).factor;
        assetAcct.traditional_inv_amt -= assetAcct.rmd;
    }
    if (assetAcct.acct_type === "traditional_ira_acct" && assetAcct.previous_value > 0.00 && accountOwner.age >= getRmdStartAge()){
        assetAcct.rmd = assetAcct.previous_value / getLifeExpectancyFactor(accountOwner.age).factor;
        assetAcct.traditional_inv_amt -= assetAcct.rmd;
    }
}

function updateHsaAccount(assetAcct) {
    const acctOwner = getClientByOwnerId(assetAcct.account_owner_id);
    assetAcct.previous_value = getAcctTotalValue(assetAcct);
    
    assetAcct.interest = assetAcct.hsa_inv_amt * assetAcct.interest_rate;
    assetAcct.hsa_inv_amt += assetAcct.interest;
    
    if (acctOwner.remaining_working_years > 0) {
        assetAcct.hsa_inv_amt += assetAcct.future_annual_contributions + assetAcct.future_annual_match;
    }
    assetAcct.hsa_inv_amt += (assetAcct.previous_value * assetAcct?.dividend_yield ?? 0);
}

function updateAfterTaxAccount(assetAcct) {
    const acctOwner = getClientByOwnerId(assetAcct.account_owner_id);
    assetAcct.previous_value = getAcctTotalValue(assetAcct);
    
    // TODO: update the inputs file to include a distribution annually starting at a given age
    
    assetAcct.interest = assetAcct.after_tax_inv_amt * assetAcct.interest_rate;
    assetAcct.after_tax_inv_amt += assetAcct.interest;
    
    if (acctOwner.remaining_working_years > 0) {
        assetAcct.after_tax_inv_amt += assetAcct.future_annual_contributions;
    }
    assetAcct.after_tax_inv_amt += (assetAcct.previous_value * assetAcct?.dividend_yield ?? 0);
}

function reduceRemainingWorkingYears() {
    clientData.clients.forEach(client => {
        client.remaining_working_years -= 1;
    });
}

function addYearToClientAge() {
    clientData.clients.forEach(client => {
        client.age += 1;
    });
}

function getFutureYearCard() {
    let result = buildClientData();
    result += getAllAssetAcctsForCard();
    result += getAssetAcctsTotals();
    if (isAClientOfSocialSecurityAge()) {
        result += getSocialSecurityCard();
    }
    if (isAClientOfRmdAge()) {
        result += getRMDCard();
    }
    result += getAllDistributionsForYear(.04);
    result += getTaxesCard();
    return "<div class='card'>" + result + "</div>";
}

function getAllAssetAcctsForCard() {
    const groupedByAcctType = Object.groupBy(clientData.asset_accts, assetAcct => assetAcct.acct_type);
    groupingRowStrs = [];
    
    cashAccounts = [...(groupedByAcctType.federal_treasury ?? []), ...(groupedByAcctType.savings ?? []), ...(groupedByAcctType.primary_house ?? [])];
    assetGrouping = getAssetAcctGroupingForCard("Cash Accounts", cashAccounts);
    assetGrouping += getAssetAcctGroupingForCard("After Tax", groupedByAcctType.after_tax_brokerage_acct ?? []);
    assetGrouping += getAssetAcctGroupingForCard("Roth IRA", groupedByAcctType.roth_ira_acct ?? []);
    groupingRowStrs.push("<div class='asset-acct-grouping-wrapper'>" + assetGrouping + "</div>");
    
    assetGrouping = getAssetAcctGroupingForCard("Traditional IRA", groupedByAcctType.traditional_ira_acct ?? []);
    assetGrouping += getAssetAcctGroupingForCard("401K", groupedByAcctType["401k_acct"] ?? []);
    assetGrouping += getAssetAcctGroupingForCard("HSA", groupedByAcctType.hsa_acct ?? []);
    groupingRowStrs.push("<div class='asset-acct-grouping-wrapper'>" + assetGrouping + "</div>");
    
    result = "";
    for (const assetGroupingRow of groupingRowStrs) {
        result += assetGroupingRow
    }
    return result;
}

function getAssetAcctsTotals() {
    result = getAllAcctTotals();
    return "<div class='card'>" + result + "</div>";;
}

function getAssetAcctGroupingForCard(groupingName, assetAccts) {
    result = `<div class='acct-card-header'>${groupingName}</div><br>`;
    assetAcctGroupingBalanceTotal = 0;
    for (const assetAcct of assetAccts) {
        result += getAssetAcct(assetAcct);
        assetAcctGroupingBalanceTotal += getAcctTotalValue(assetAcct);
    }
    result += `<div>Grouping Balance Total: $${assetAcctGroupingBalanceTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>`;
    return "<div class='card asset-acct-grouping'>" + result + "</div>";
}

function getAssetAcct(assetAcct) {
    result = `<div>Name: ${assetAcct.account_name}</div>`;
    result += `<div>Current Value: $${getAcctTotalValue(assetAcct).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>`;
    if (assetAcct.acct_type === '401k_acct'){
        result += `<div class='indent'>Roth: $${(assetAcct.roth_inv_amt).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>`;
        result += `<div class='indent'>Traditional: $${(assetAcct.traditional_inv_amt).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>`;
        result += `<div class='indent'>After Tax: $${(assetAcct.after_tax_inv_amt).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>`;
        result += `<div>Roth Annual Growth: $${assetAcct.roth_interest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Monthly Growth: $${(assetAcct.roth_interest/12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>`;
        result += `<div>Traditional Annual Growth: $${assetAcct.trad_interest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Monthly Growth: $${(assetAcct.trad_interest/12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>`;
        result += `<div>After-Tax Annual Growth: $${assetAcct.after_tax_interest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Monthly Growth: $${(assetAcct.after_tax_interest/12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div><br>`;
        
        result += `<div>Roth Annual Dividend: $${assetAcct.roth_curr_div_amt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Monthly Dividend: $${(assetAcct.roth_curr_div_amt/12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>`;
        result += `<div>Traditional Annual Dividend: $${assetAcct.trad_curr_div_amt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Monthly Dividend: $${(assetAcct.trad_curr_div_amt/12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>`;
        result += `<div>After Tax Annual Dividend: $${assetAcct.after_tax_curr_div_amt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Monthly Dividend: $${(assetAcct.after_tax_curr_div_amt/12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div><br>`;
    } else {
        result += `<div>Annual Growth: $${assetAcct.interest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Monthly Growth: $${(assetAcct.interest/12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>`;
        result += `<div>Annual Dividend: $${assetAcct.curr_div_amt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Monthly Dividend: $${(assetAcct.curr_div_amt/12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>`;
    }
    
    const acctOwner = getClientByOwnerId(assetAcct.account_owner_id);
    if (acctOwner.remaining_working_years > 0) {
        if (assetAcct.acct_type === "401k_acct") {
            result += `<div>Roth Annual Contrib: $${(assetAcct?.future_annual_roth_contributions ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Monthly Contrib: $${(((assetAcct?.future_annual_roth_contributions) ?? 0)/12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>`;
            result += `<div>Trad Annual Contrib: $${(assetAcct?.future_annual_trad_contributions ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Monthly Contrib: $${(((assetAcct?.future_annual_trad_contributions) ?? 0)/12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>`;
            result += `<div>After-Tax Annual Contrib: $${(assetAcct?.future_annual_after_tax_contributions ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Monthly Contrib: $${(((assetAcct?.future_annual_after_tax_contributions) ?? 0)/12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div><br>`;
        } else {
            result += `<div>Annual Contrib: $${(assetAcct?.future_annual_contributions ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Monthly Contrib: $${(((assetAcct?.future_annual_contributions) ?? 0)/12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>`;
        }
        result += `<div>Annual Match: $${(assetAcct?.future_annual_match ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Monthly Match: $${(((assetAcct?.future_annual_match) ?? 0)/12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div><br>`;
    }
    if (assetAcct.acct_type === "roth_ira_acct" || assetAcct.acct_type === "traditional_ira_acct") {
        if (isOtherClientWorking(assetAcct.account_owner_id)) {
            result += `<div>Annual Contrib: $${(assetAcct?.future_annual_contributions ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Monthly Contrib: $${(((assetAcct?.future_annual_contributions) ?? 0)/12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>`;
        }
    }
    result += "<br>";
    return result;
}

function isOtherClientWorking(acctOwnerId) {
    for (let client of clientData.clients) {
        if (client.account_owner_id !== acctOwnerId && client.remaining_working_years > 0) {
            return true;
        }
    }
    return false;
}

function getAllAcctTotals() {
    let allAcctTotalValue = 0;
    for (const assetAcct of clientData.asset_accts) {
        allAcctTotalValue += getAcctTotalValue(assetAcct);
    }
    result = `<div>All Accounts Total Values: $${allAcctTotalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>`;
    return result;
}

function getAcctTotalValue(assetAcct) {
    return (assetAcct?.cash ?? 0) + (assetAcct?.roth_inv_amt ?? 0) +
    (assetAcct?.traditional_inv_amt ?? 0) + (assetAcct?.after_tax_inv_amt ?? 0) +
    (assetAcct?.hsa_inv_amt ?? 0);
}

function isAClientOfRmdAge() {
    for (let client of clientData.clients) {
        if (client.age >= getRmdStartAge()) {
            return true;
        }
    }
    return false;
}

function isAClientOfSocialSecurityAge() {
    for (let client of clientData.clients) {
        if (client.age >= getSocialSecurityStartAge().survivorBenefitStartAge) {
            return true;
        }
    }
    return false;
}

function getRMDCard() {
    result = "";
    result += getAllRmd();
    result += getRmdDisclosure();
    return "<div class='card'>" + result + "</div>";
}



// This will calculate the rmd and deduct it from the account
function getAllRmd() {
    result = "<tr><th>Account Name</th><th>Previous Total Value</th><th>RMD</th></tr>";
    let totalRmd = 0.00;
    for (const assetAcct of clientData.asset_accts) {
        accountOwner = getClientByOwnerId(assetAcct.account_owner_id);
        if (assetAcct.acct_type === "401k_acct" && assetAcct.previous_trad_value > 0.00 && accountOwner.age >= getRmdStartAge()){
            totalRmd += assetAcct.rmd;
            result += `<tr><td>${assetAcct.account_name}</td><td>$${(assetAcct.previous_trad_value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td><td>$${assetAcct.rmd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td></tr>`;
        }
        if (assetAcct.acct_type === "traditional_ira_acct" && assetAcct.previous_value > 0.00 && accountOwner.age >= getRmdStartAge()){
            totalRmd += assetAcct.rmd;
            result += `<tr><td>${assetAcct.account_name}</td><td>$${(assetAcct.previous_value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td><td>$${assetAcct.rmd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td></tr>`;
        }
    }
    result += `<tr><td>Total</td><td></td><td>$${totalRmd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td></tr>`;
    return "<table>" + result + "</table>";
}

function getLifeExpectancyFactor(age) {
    for (const rmdObj of rmdData.rmd_lifetime_list) {
        if (rmdObj.age === age) {
            return rmdObj
        }
    }
    return rmdData.rmd_lifetime_list.at(-1);
}

function getRmdStartAge() {
//    TODO: handle the different start ages based on birth date
    return 75;
}

function getSocialSecurityStartAge() {
    // 60 is for survivor benefits otherwise it is 62
    return {"survivorBenefitStartAge": 60, "earlyBenefitAge": 62};
}

function getRmdDisclosure() {
    iraRmd = "Traditional IRA's are subject to RMD's. You can total all of the accounts together owned by the same owner and get take a RMD from just one account. ";
    fourZeroOneK = "The traditional or pre-tax portion of 401K's are subject to RMD's. You have to treat each 401K account seperatly for RMD's. Any 401K with a traditional or pre-tax portion must have RMD's withdrawn separately. ";
    irsDisclosure = "RMD start ages are subject to change. Likewise, the persentage of the account that is required minimum distributon can also change. ";
    irsLink = "The divisors used in these calculations are correct for 2026 from the IRS website. <a href='https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-required-minimum-distributions-rmds'>IRS RMD info</a> <a href='https://www.irs.gov/pub/irs-pdf/p590b.pdf'>IRS Divisor Table</a>";
    return iraRmd + fourZeroOneK + irsDisclosure + irsLink;
}

function getSocialSecurityCard() {
    result = "<div>Social Security Info:</div>";
    result += getAllSocialSecurity();
    result += getSocialSecurityDisclosure();
    return "<div class='card'>" + result + "</div>";
}

function getAllSocialSecurity() {
    let result = "";
    let resultBreakeven = "";
    let resultAvailableToFileFor = "";
    for (let client of clientData.clients) {
        // include break even for each client
        resultBreakeven += getBreakevenForClient(client);
        // what is available to each client in this year, spousal add-on only if the other spouse is old enough to file that year
        resultAvailableToFileFor += getIndividualClientSSInfo(client);
    }
    
    if (clientData.clients.length === 2) {
        resultAvailableToFileFor += getMarriedClientsInfo(clientData.clients[0], clientData.clients[1]);
    }
    
    result += resultBreakeven;
    result += resultAvailableToFileFor;
    
    // Survivor benefits they start when the surviving spouse is 60 (Obviously the other spouse has to be deceased) show this but do not add it into calculations (unless they are already deceased)
    if (clientData.clients.length > 1) {
        for (let client of clientData.clients) {
            if (client.age >= getSocialSecurityStartAge().survivorBenefitStartAge) {
                result += getSurvivorBenefitInfoForCard(client);
            }
        }
        result += "<br>";
    }
    return result;
}

function getIndividualClientSSInfo(client) {
    let result = "";
    monthlyAmount = lookupBenefitScheduleAmount(client);
    client.social_security.current_monthly_benefit = monthlyAmount;
    result += `<div>Individually, ${client.first_name} can file for $${monthlyAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} a month, which is $${(monthlyAmount * 12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} a year.</div><br>`;
    return result;
}

function getMarriedClientsInfo(client1, client2) {
    let result = "<div>Spousal Calculations:</div>";
    let smallerClientSSBenefit = null;
    let largerClientSSBenefit = null;
    
    if (client1.social_security.full_benefit < client2.social_security.full_benefit) {
        smallerClientSSBenefit = client1;
        largerClientSSBenefit = client2;
    } else {
        smallerClientSSBenefit = client2;
        largerClientSSBenefit = client1;
    }
    
    // Smaller Benefit calculation
    const baseSpousalAddon = (.5 * largerClientSSBenefit.social_security.full_benefit) - smallerClientSSBenefit.social_security.full_benefit;
    const smClientMonthsToFRA = monthsUntilFRA(smallerClientSSBenefit);
    // This is the percent (in decimal format) of the amount retained of the spousal addon
    let baseSpousalAddonPercent = 1.00;
    if (smClientMonthsToFRA >= 36) {
        // First 36 months reduction: (36 * ( (25/36) * 0.01) = 25%) reduction.
        let first36MonReduction = 36 * ((25/36) * .01);
        // Remaining 24 months reduction: (24 * ( (5/12) * 0.01) = 10%) reduction.
        let additionalMonthReduction = (smClientMonthsToFRA - 36) * ((5/12) * .01);
        baseSpousalAddonPercent = 1 - (first36MonReduction + additionalMonthReduction);
    } else {
        // First 36 months reduction: (36 * ( (25/36) * 0.01) = 25%) reduction.
        let first36MonReduction = smClientMonthsToFRA * ((25/36) * .01);
        baseSpousalAddonPercent = 1 - (first36MonReduction);
    }
    const reducedSpousalAddon = baseSpousalAddon * baseSpousalAddonPercent;
    let totalSmBenefitMonthly = lookupBenefitScheduleAmount(smallerClientSSBenefit) + reducedSpousalAddon;
    if (totalSmBenefitMonthly > (.5 * largerClientSSBenefit.social_security.full_benefit)) {
        totalSmBenefitMonthly = (.5 * largerClientSSBenefit.social_security.full_benefit);
    }
    
    const totalSmBenefitAnnual = totalSmBenefitMonthly * 12;
    const totalLgBenefitMonthly = lookupBenefitScheduleAmount(largerClientSSBenefit);
    const totalLgBenefitAnnual = totalLgBenefitMonthly * 12;
    const totalMonthly = totalSmBenefitMonthly + totalLgBenefitMonthly;
    const totalAnnual = totalSmBenefitAnnual + totalLgBenefitAnnual;
    
    updateSmClientBenefit(smallerClientSSBenefit, totalSmBenefitMonthly);
    
    let spousalBenefitTable = `<tr><th>Client</th><th>SS Monthly Benefit</th><th>SS Annual Benefit</th></tr>`;
    spousalBenefitTable += `<tr><td>${smallerClientSSBenefit.first_name}</td><td>$${totalSmBenefitMonthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td><td>$${totalSmBenefitAnnual.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td></tr>`;
    spousalBenefitTable += `<tr><td>${largerClientSSBenefit.first_name}</td><td>$${totalLgBenefitMonthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td><td>$${totalLgBenefitAnnual.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td></tr>`;
    spousalBenefitTable += `<tr><td>Totals</td><td>$${totalMonthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td><td>$${totalAnnual.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td></tr>`;
    
    if (largerClientSSBenefit.age >= largerClientSSBenefit.social_security.early_retirement_age) {
        result += "<table>" + spousalBenefitTable + "</table>";
        result += getSpousalCalcDisclaimer(true, smallerClientSSBenefit, largerClientSSBenefit);
    } else {
        result += getSpousalCalcDisclaimer(false, smallerClientSSBenefit, largerClientSSBenefit);
    }
    return result + "<br>";
}

function updateSmClientBenefit(smallerClientSSBenefit, totalSmBenefitMonthly) {
    for (const client of clientData.clients) {
        if (client.account_owner_id === smallerClientSSBenefit.account_owner_id && (client.social_security?.current_monthly_benefit ?? 0) < totalSmBenefitMonthly && client.age >= 62 && getOtherClient(client).age >= 62) {
            client.social_security.current_monthly_benefit = totalSmBenefitMonthly;
        }
    }
}


function getSpousalCalcDisclaimer(hasSpousalCalc, smallerClientSSBenefit, largerClientSSBenefit) {
    if (hasSpousalCalc) {
        return `<div>For these calculations to be applicable ${largerClientSSBenefit.first_name} has to file this year so that it unlocks the spousal add-on for ${smallerClientSSBenefit.first_name}.</div>`;
    }
    return `<div>${smallerClientSSBenefit.first_name} cannot recieve the spousal add-on since ${largerClientSSBenefit.first_name} is not old enough to file for their own benefit which unlocks the spousal add-on.</div>`;
}

function monthsUntilFRA(client) {
    if (client.age < client.social_security.full_retirement_age) {
        return (client.social_security.full_retirement_age - client.age) * 12;
    }
    return 0;
}

function lookupBenefitScheduleAmount(client) {
    let result = 0
    for (const benefitScheduleAmount of client.social_security.benefit_schedule) {
        if (benefitScheduleAmount.age === client.age) {
            return benefitScheduleAmount.amount;
        }
        if (client.age > 70) {
            result = benefitScheduleAmount.amount;
        }
    }
    return result;
}

function getBreakevenForClient(client) {
    earlyToFull = getBreakevenAge(client.social_security.early_retirement_age, client.social_security.full_retirement_age, client.social_security.early_benefit, client.social_security.full_benefit);
    fullToDelayed = getBreakevenAge(client.social_security.full_retirement_age, client.social_security.delayed_retirement_age, client.social_security.full_benefit, client.social_security.delayed_benefit);
    result = `<div>The breakeven age if ${client.first_name} waits to file until full retirement age is ${earlyToFull.toFixed(1)}</div>`;
    result += `<div>The breakeven age if ${client.first_name} waits to file until delayed retirement age is ${fullToDelayed.toFixed(1)}</div><br>`;
    return result;
}

function getBreakevenAge(youngAge, oldAge, youngBenefit, oldBenefit) {
    diffMonths = (oldAge - youngAge) * 12;
    breakevenAmount = youngBenefit * diffMonths;
    monthlyAdvantage = oldBenefit - youngBenefit;
    monthsToBreakeven = breakevenAmount / monthlyAdvantage;
    return (oldAge + (monthsToBreakeven/12));
}

function getSurvivorBenefitInfoForCard(survivingClient) {
    let result = "";
    nonSurvivingClient = getOtherClient(survivingClient);
    survivingBenefit = nonSurvivingClient.social_security.full_benefit;
    // TODO: when you have entered all of the annual SS benefits in a list for each client then if the deceased client is older than their own FRA increase the survivingBenefit number. The FRA is the minimum this number will be though.
    if (survivingClient.age <= survivingClient.social_security.full_retirement_age) {
        survivingBenefit *= retainedBenefitSurvivingSpouseByAge(survivingClient.age);
    }
    result += `<div>${survivingClient.first_name} is eligible to recieve $${survivingBenefit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} monthly, which is $${(survivingBenefit * 12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} annually, from ${nonSurvivingClient.first_name}'s survivor benefit which may include a reduction if ${survivingClient.first_name} has not reached their full retirement age of ${survivingClient.social_security.full_retirement_age}.</div>`;
    return result;
}

function retainedBenefitSurvivingSpouseByAge(filingAge) {
    // TODO: update to be variable for different Full Retirement Ages (currently only set for FRA = 67)
    switch (filingAge) {
        case 60:
            return .715; // 71.5%
        case 61:
            return .756; // 75.6%
        case 62:
            return .796; // 79.6%
        case 63:
            return .837; // 83.7%
        case 64:
            return .878; // 87.8%
        case 65:
            return .919; // 91.9%
        case 66:
            return .959; // 95.9
        default:
            return 1;
    }
}

function getOtherClient(clientToNotReturn) {
    for (let client of clientData.clients) {
        if (client.account_owner_id !== clientToNotReturn.account_owner_id) {
            return client;
        }
    }
}

function getSocialSecurityDisclosure() {
    general = "These numbers are based on the numbers provided in the input file. Please talk with a Social Security and Tax professional before making any filing decisions. ";
    deceased = "If you are seeing survivor benefits, know that this is showing the maximum a spouse could get if the other spouse has passed. There may be other reductions that are not calculated here. ";

    return general + deceased;
}

function getClientByOwnerId(ownerId) {
    for (let client of clientData.clients) {
        if (client.account_owner_id === ownerId) {
            return client;
        }
    }
}

// this lists each individual retirement acct value (previous year value) and the percent passed in (annual distribution)
// then also divide that by 12 to get the monthly amount
function getAllDistributionsForYear(percent) {
    let result = "";
    
    return result;
}

// This is for all income taxes
function getTaxesCard() {
    let result = "<div>Taxes:</div>";
    // tax data
    // get earned income
    // get SS Annual Benefit
    // get interest
    // get dividends
    // get rmds
    // TODO: get pre-tax distributions
    const taxableIncomeInfo = calculateTaxBreakdown(getTotalEarnedIncome(), getTotalTaxableInterest(), getTotalTaxableDividends(), getTotalTaxableRmds(), getTotalSocialSecurityIncome());
    let taxableIncomeList = [
                             {"name": "Earned Income", "amount": taxableIncomeInfo.earnedIncome},
                             {"name": "Interest Income", "amount": taxableIncomeInfo.interestIncome},
                             {"name": "Dividend Income", "amount": taxableIncomeInfo.dividendIncome},
                             {"name": "RMD Income", "amount": taxableIncomeInfo.rmdIncome},
                             {"name": "Social Security Income", "amount": taxableIncomeInfo.ssIncome.taxableAmt},
                             {"name": "Gross Income", "amount": taxableIncomeInfo.grossIncome},
                             {"name": "Standard Deduction", "amount": taxableIncomeInfo.stdDeduct},
                             {"name": "Taxable Income", "amount": taxableIncomeInfo.taxableIncome},
                             ];

    // show taxable income breakdown
    let taxableIncomeTable = `<tr><th></th><th>Amount</th></tr>`;
    for (const taxableIncome of taxableIncomeList) {
        let taxableIncomeAmount = `${currFormat(taxableIncome.amount)}`;
        if (taxableIncome.amount < 0) {
            taxableIncomeAmount = `(${currFormat(taxableIncome.amount)})`;
        }
        taxableIncomeTable += `<tr><td>${taxableIncome.name}</td><td>${taxableIncomeAmount}</td></tr>`;
    }
    result += "<table>" + taxableIncomeTable + "</table><br>";
    
    // show the tax bracket breakdown
    let taxTable = `<tr><th>Tax Rate</th><th>Bracket Min</th><th>Bracket Max</th><th>Income in Bracket</th><th>Federal Tax</th><th>Amount Left in Bracket</th></tr>`;
    
    // get the keys from the brackets list
    const formattedPercents = getTaxDataBrackets().map(item =>
      item.percent.toLocaleString('en-US', { style: 'percent' })
    );
    
    for (const key of formattedPercents) {
        let rowInfo = taxableIncomeInfo.brackets[key];
        if (rowInfo !== undefined) {
            taxTable += `<tr><td>${key}</td><td>${currFormat(rowInfo.min)}</td><td>${currFormat(rowInfo.max)}</td><td>${currFormat(rowInfo.amountInBracket)}</td><td>${currFormat(rowInfo.taxOwed)}</td><td>${currFormat(rowInfo.amountLeftInBracket)}</td></tr>`;
        }
    }
    taxTable += `<tr><td>Total</td><td></td><td></td><td></td><td>${currFormat(taxableIncomeInfo.totalTaxOwed)}</td><td></td></tr>`;
    result += "<table>" + taxTable + "</table><br>";
    
    result += `<div>Net Income: ${currFormat(taxableIncomeInfo.netIncome)}</div>`;

    // show the tax break down for the given tax filing status
    // show the amount of $ left in the top most bracket
    
    return "<div class='card'>" + result + "</div>";
}

function getTotalTaxableInterest() {
    let totalInterest = 0.00;
    for (const assetAcct of clientData.asset_accts) {
        if (assetAcct.acct_type === "savings" || assetAcct.acct_type === "federal_treasury") {
            totalInterest += assetAcct.interest;
        }
    }
    return totalInterest;
}

function getTotalTaxableDividends() {
    let totalDividends = 0.00;
    for (const assetAcct of clientData.asset_accts) {
        if (assetAcct.acct_type === "after_tax_brokerage_acct") {
            totalDividends += assetAcct.curr_div_amt;
        }
    }
    return totalDividends;
}

function getTotalTaxableRmds() {
    let totalRmds = 0.00;
    for (const assetAcct of clientData.asset_accts) {
        totalRmds += assetAcct?.rmd ?? 0;
    }
    return totalRmds;
    
}

function currFormat(num) {
    return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function getTotalEarnedIncome() {
    let result = 0.00;
    for (const client of clientData.clients) {
        if (client.remaining_working_years > 0) {
            result += (client.base_salary + client.estimated_bonus);
        }
    }
    return result;
}

function getTotalSocialSecurityIncome() {
    let result = 0.00;
    for (const client of clientData.clients) {
        result += client.social_security?.current_monthly_benefit ?? 0;
    }
    return result * 12;
}

function calculateTaxBreakdown(earnedIncome, interestIncome, dividendIncome, rmdIncome, socialSecurityIncome) {
    // TODO: dividendIncome
    let stdDeduct = getStdDeduct();
    let taxableAmtSSBenefit = socialSecurityIncome; // TODO: calculate the amount that is taxable
    let taxableIncome = (earnedIncome + interestIncome + dividendIncome + stdDeduct + rmdIncome + taxableAmtSSBenefit);
    let totalTaxOwed = 0;
    let breakdown = {};
    let brackets = getTaxDataBrackets();
   
    for (const bracket of brackets) {
      const currentMax = (bracket.max === undefined || bracket.max === null) ? Infinity : bracket.max;

      if (taxableIncome > bracket.min) {
        const upperLimit = Math.min(taxableIncome, currentMax);
        const incomeInBracket = upperLimit - bracket.min;
        
        // 1. Calculate tax for this specific bracket
        const taxForBracket = incomeInBracket * bracket.percent;
        
        // 2. Add to the running grand total
        totalTaxOwed += taxForBracket;

        const key = `${bracket.percent * 100}%`;
        
        breakdown[key] = {
            min: bracket.min,
            max: bracket.max,
            amountInBracket: incomeInBracket,
            amountLeftInBracket: bracket.max - incomeInBracket - bracket.min,
            taxOwed: taxForBracket // Added per-bracket tax
        };
      } else {
        break;
      }
    }
    
    let grossIncome = (earnedIncome + interestIncome + dividendIncome + rmdIncome + taxableAmtSSBenefit);

    // 3. Return both the bracket breakdown and the total calculation
    return {
        "earnedIncome": earnedIncome,
        "interestIncome": interestIncome,
        "dividendIncome": dividendIncome,
        "rmdIncome": rmdIncome,
        "ssIncome": {"totalAmt": socialSecurityIncome, "taxableAmt": taxableAmtSSBenefit},
        "grossIncome": grossIncome,
        "stdDeduct": stdDeduct,
        "taxableIncome": taxableIncome,
        "brackets": breakdown,
        "totalTaxOwed": totalTaxOwed,
        "netIncome": grossIncome - totalTaxOwed
    };
}

function getTaxDataBrackets() {
    let brackets = taxData.federal_brackets.single_ordinary;
    if (clientData.clients.length === 2) {
        brackets = taxData.federal_brackets.married_filing_jointly_ordinary;
    }
    return brackets;
}

function getStdDeduct() {
    let result = 0.00;
    for (const client of clientData.clients) {
        result += taxData.standard_deduction.single;
        if (client.age >= 65) {
            result += taxData.standard_deduction.enhanced_senior_deduction;
        }
        if (clientData.clients.length === 2) {
            if (client.age >= 65) {
                result += taxData.standard_deduction.married_over_sixty_five;
            }
            if (client.is_blind) {
                result += taxData.standard_deduction.married_blind;
            }
        } else {
            if (client.age >= 65) {
                result += taxData.standard_deduction.single_over_sixty_five;
            }
            if (client.is_blind) {
                result += taxData.standard_deduction.single_blind;
            }
        }
    }
    return result;
}

function loadPage() {
    getTodaysAge();
    getClientsCard();
    handleFutureYears();
}

window.addEventListener('load', loadPage);
