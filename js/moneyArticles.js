var links = ["https://www.daveramsey.com/dave-ramsey-7-baby-steps"];

var linkName = ["Dave Ramsey's 7 Baby Steps"];

var linkDescription = ["Confused about how to handle money? Not sure where you are and what you should do next financially? This is a great resource to begin or continue our path to financial freedom."];

function getArticles() {
    for (var i = 0; i < links.length; i++){
        getArticle(i);
    }
}

function getArticle(index){
    var article = "<div class='articleCard'><a href='" + links[index] + "' target='_blank'>" + linkName[index] + "</a><div>" + linkDescription[index] + "</div></div>";
    document.getElementById("articleWrapper").innerHTML += article;
}
