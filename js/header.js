window.onload = function() {
    siteTitle();
    siteNavigation();
    
}

function siteTitle() {
    document.getElementById("header").innerHTML += "<h1>Money Science</h1>";
}

function siteNavigation() {
    var navigationList = ["Path to Wealth", "Income Statement", "Balance Sheet", "Casino Simulator", "Money Articles"];
    document.getElementById("header").innerHTML += "<ul>";
    for (var i = 0; i < navigationList.length; i++){
        document.getElementById("header").innerHTML += "<li>" + navigationList[i] + "</li>";
    }
    document.getElementById("header").innerHTML += "</ul>";
}
