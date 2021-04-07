window.onload = function() {
    siteTitle();
    siteNavigation();
    siteFooter();
}

function siteTitle() {
    document.getElementById("header").innerHTML += "<h1>Money Science</h1>";
}

function siteNavigation() {
    var navigationList = ["Home",
                          "Path to Wealth",
                          "Income Statement",
                          "Balance Sheet",
                          "Amortization Calculator",
                          "Debt Snowball",
                          "Investment Projections",
                          "Share Purchase",
                          "Money Articles"];
    var navigationPath = ["index",
                          "pathToWealth",
                          "incomeStatement",
                          "balanceSheet",
                          "amortizationCalculator",
                          "debtSnowball",
                          "investmentProjections",
                          "sharePurchase",
                          "moneyArticles"];
    var header = "<div class='navigationList'>";
    for (var i = 0; i < navigationList.length; i++){
        header += "<a class='listItem' href='" + navigationPath[i] + ".html'>" + navigationList[i] + "</a>";
    }
    header += "</div>";
    document.getElementById("header").innerHTML += header;
}

function siteFooter() {
    document.getElementById("footer").innerHTML += "<div class='siteFooter'>This site is for educational purposes only. There has not and never will be any investing advise. All decisions about a persons money shall be discussed with a financial advisor and/or tax professional and made solely by the individual. To make the best decision for an individuals' situation they must practice due diligence to understand the financial information that may impact them.<br><br>There is no way to create an account and therefore no way to save user information. Feel free to print any calculations as all input will be lost from the previous screen when moving to another page. As an extra layer of protection please do not enter account numbers.</div>";
    document.getElementById("footer").innerHTML += "<div class='siteFooter'>Created and Maintained by Zac McElfresh<div align=center class='counter'><a href='https://www.counter12.com'><img src='https://www.counter12.com/img-zc210463c1wAWcd9-50.gif' border='0' alt='free web counter'></a><script type='text/javascript' src='https://www.counter12.com/ad.js?id=zc210463c1wAWcd9'></script></div></div>";
}
