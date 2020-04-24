$(document).ready(function () {
    $("#search-cocktails").on("click", function () {
        $("#home-pg").addClass("is-hidden");
        $("#fun-pg").addClass("is-hidden");
        $("#spirit-pg").addClass("is-hidden");
        $("#search-pg").addClass("is-hidden");
        $("#search-error-pg").addClass("is-hidden");

        var userInput = $("#user-input").val();
        var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + userInput;

        $.ajax({
            url: url,
            method: "GET"
        }).then(function (response) {
            if (!response.drinks) {
                $("#search-error-pg").removeClass("is-hidden");
            } else {
                $("#search-ingredients").empty();
                var searchDrink = response.drinks[0];
                bindSearchResults(searchDrink);
            }
        });
    });
});

function bindSearchResults(searchDrink) {
    $("#search-error-pg").addClass("is-hidden");

    var searchDrinkName = searchDrink.strDrink;
    $("#search-drink-name").text(searchDrinkName);

    $("#search-pg").removeClass("is-hidden");

    var image = $("<img>").attr("src", searchDrink.strDrinkThumb).addClass("img-radius");
    $("#search-drink-img").append(image);

    for (var i = 1; i <= 15; i++) {
        var searchIngredient = searchDrink["strIngredient" + i];
        var measure = searchDrink["strMeasure" + i];
        if (searchIngredient) {
            var fullIngred;
            if (measure) {
                fullIngred = measure + " " + searchIngredient;
            } else {
                fullIngred=searchIngredient;
            }
            var ingedEl = $("<li>").attr("id", "ing-" + i).append(fullIngred);
            $("#search-ingredients").append(ingedEl);
        }
    }
    var searchInstructions = searchDrink.strInstructions;
    $("#search-instructions").text(searchInstructions);
}