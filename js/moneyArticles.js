
var linkDescription = ["Confused about how to handle money? Not sure where you are and what you should do next financially? This is a great resource to begin or continue our path to financial freedom."];

function getArticleList() {
    document.getElementById("articleList").innerHTML = '';
    for (var i = 0; i < articleData.length; i++){
        document.getElementById("articleList").innerHTML += "<div class='articleListItem' onClick='getArticle(" + i + ")'>" + articleData[i].title + "</div>";
    }
}

function getArticle(index){
    document.getElementById("articleWrapper").innerHTML = '';
    var article = "<div class='articleCard'><div class='articleHeader'>" + articleData[index].title + "</div><div>" + articleData[index].body + "</div></div>";
    document.getElementById("articleWrapper").innerHTML += article;
}
