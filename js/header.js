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
                          "Budget Grader",
                          "Income Statement",
                          "Balance Sheet",
                          "Tax Bracket",
                          "Casino Simulator",
                          "Money Articles"];
    var navigationPath = ["index",
                          "pathToWealth",
                          "budgetGrader",
                          "incomeStatement",
                          "balanceSheet",
                          "taxBracket",
                          "casinoSimulator",
                          "moneyArticles"];
    var header = "<div class='navigationList'>";
    for (var i = 0; i < navigationList.length; i++){
        header += "<a class='listItem' href='" + navigationPath[i] + ".html'>" + navigationList[i] + "</a>";
    }
    header += "</div>";
    document.getElementById("header").innerHTML += header;
}

function siteFooter() {
    document.getElementById("footer").innerHTML += "<div class='siteFooter'>Created and Maintained by Zac McElfresh</div>";
}
