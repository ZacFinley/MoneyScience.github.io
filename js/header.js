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
                          "Tax Bracket",
                          "Amortization Calculator",
                          "Net Worth Growth",
                          "Debt Snowball",
                          "Investment Projections",
                          "Share Purchase",
                          "Money Articles"];
    var navigationPath = ["index",
                          "pathToWealth",
                          "incomeStatement",
                          "balanceSheet",
                          "taxBracket",
                          "amortizationCalculator",
                          "netWorthGrowth",
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
    document.getElementById("footer").innerHTML += "<div class='siteFooter'>Created and Maintained by Zac McElfresh<div align=center class='counter'><a href='https://www.counter12.com'><img src='https://www.counter12.com/img-zc210463c1wAWcd9-50.gif' border='0' alt='free web counter'></a><script type='text/javascript' src='https://www.counter12.com/ad.js?id=zc210463c1wAWcd9'></script></div></div>";
}
