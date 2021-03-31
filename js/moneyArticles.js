
var linkDescription = ["Confused about how to handle money? Not sure where you are and what you should do next financially? This is a great resource to begin or continue our path to financial freedom."];

function getArticles() {
    document.getElementById("articleWrapper").innerHTML = '';
    for (var i = 0; i < articleData.length; i++){
        getArticle(i);
    }
}

function getArticle(index){
    document.getElementById("articleWrapper").innerHTML = '';
    var article = "<div class='articleCard'><div>" + articleData[index].title + "</div><div>" + articleData[index].body + "</div></div>";
    document.getElementById("articleWrapper").innerHTML += article;
}
