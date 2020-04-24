var giphyApiKey = "bkAxzVVfXtpuYo0AmrdqJO1Gp3erKjJE";
$(document).ready(function () {
    $.ageCheck({
        minAge: 21
    });
    startCount();
    function startCount() {
        var today = moment();
        var then = moment("2020-03-24");
        var duration = moment.duration(today.diff(then));
        var months = duration.asMonths();
        var weeks = duration.asWeeks();
        var days = duration.asDays();
        var hours = duration.asHours();
        console.log(months, weeks, days, hours);
        var cMonths = (Math.trunc(months));
        var cWeeks = (Math.trunc(weeks))
        var cDays = (Math.trunc(days))
        var cHours = (Math.trunc(hours))
        console.log(cMonths, cWeeks, cDays, cHours);
        $("#months").text(cMonths);
        $("#weeks").text(cWeeks);
        $("#days").text(cDays);
        $("#hours").text(cHours);
    }
    // Get Method using spirit name or ingredient 
    $(".spirit").on("click", function () {

        $('.spirit-recipes').html('');
        $('.spirit-info').html('');
        var spirit = $(this).attr("id");
        var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + spirit;
        $.ajax({
            url: url,
            method: "GET"
        }).then(function (res) {
            $('<h2>' + (res.ingredients[0].strIngredient) + ' Recipes' + '</h2>').appendTo('.spirit-info')
            // $('<text>' + (res.ingredients[0].strDescription) + '</text>').appendTo('.spirit-info')
            $.ajax({
                url: "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + spirit,
                method: "GET"
            }).then(function (response) {
                var drinkIDs = []
                for (let i = 0; i < (response.drinks.length); i++) {
                    var drinkID = (response.drinks[i].idDrink)
                    drinkIDs.push(drinkID)
                }
                for (let i = 0; i < drinkIDs.length; i++) {
                    console.log(drinkIDs[i])
                    $.ajax({
                        method: "GET",
                        url: "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkIDs[i]
                    }).then(function (data) {
                        console.log("response", data)
                        let drink = {};
                        drink.name = data.drinks[0].strDrink;
                        drink.image = data.drinks[0].strDrinkThumb;
                        drink.text = data.drinks[0].strInstructions;
                        drink.ingredients = []

                        $('.spirit-recipes')
                            .append("<div class='tile is-ancestor'><div class='tile is-parent'><div class='tile is-child box'><h3 class='drink-name'>" + drink.name + "</h3><img class='cocktail-img' id='cocktail-img' src=" + drink.image + "><p class='ingr-text'></p><p id='" + i + "'></p>" + drink.text + "</div></div>");

                        for (var j = 1; j <= 15; j++) {
                            var currentDrink = data.drinks[0]
                            var ingredient = currentDrink['strIngredient' + j];
                            var measure = currentDrink['strMeasure' + j];
                            console.log(ingredient, measure)

                            if (ingredient) {
                                var fullIngred;
                                if (measure) {
                                    fullIngred = measure + " " + ingredient;
                                } else {
                                    fullIngred = ingredient;
                                }

                                $('#' + i).append($("<li>").attr("id", "ing-").text(fullIngred))
                            }
                        }

                    })
                }

            })
        })
    })
});
// Get Method using cocktail name 
$(".cocktail").on("click", function () {
    var cocktail = $(this).attr("id");
    var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + cocktail;
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        console.log(response)
    });
});
// Get Method for random cocktail
var url = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
// add event listener for menu btns
$(".spirit").on("click", function () {
    $("#home-pg").addClass("is-hidden");
    $("#search-error-pg").addClass("is-hidden");
    $("#search-pg").addClass("is-hidden");
    $("#fun-pg").addClass("is-hidden");
    $("#spirit-pg").removeClass("is-hidden");
});
$(".fun").on("click", function () {
    $("#home-pg").addClass("is-hidden");
    $("#spirit-pg").addClass("is-hidden");
    $("#search-pg").addClass("is-hidden");
    $("#fun-pg").removeClass("is-hidden");
    $("#search-error-pg").addClass("is-hidden");
    //random cocktail for fun page
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        $("#random-drink-name").empty();
        $("#random-drink-fun").empty()
        $("#ingredients").empty();
        funPageRandom(response);
        randomGifImage(response);
    });
});
$(".home").on("click", function () {
    $("#fun-pg").addClass("is-hidden");
    $("#spirit-pg").addClass("is-hidden");
    $("#search-pg").addClass("is-hidden");
    $("#home-pg").removeClass("is-hidden");
    $("#search-error-pg").addClass("is-hidden");
});
// random gif image on fun page
var giphyURL = "https://api.giphy.com/v1/gifs/random?limit=1&tag=drink&api_key=" + giphyApiKey;
function randomGifImage(response) {
    $.ajax({
        url: giphyURL,
        method: "GET"
    }).then(function (response) {
        $("#gif-img").empty();
        var image = $("<img>").attr("src", response.data.image_url);
        $("#gif-img").append(image).addClass("");
    });
}
// Function for processing response for cocktail api
function funPageRandom(response) {
    var randomDrink = response.drinks[0];
    var image = $("<img>").attr("src", randomDrink.strDrinkThumb);
    $("#random-drink-fun").append(image);
    var randomDrinkName = response.drinks[0].strDrink;
    $("#random-drink-name").append(randomDrinkName);
    // For loop for ingredients 
    for (var i = 1; i <= 15; i++) {
        var ingredient = randomDrink["strIngredient" + i];
        var measure = randomDrink["strMeasure" + i];
        if (ingredient) {
            var fullIngred;
            if (measure) {
                fullIngred = measure + " " + ingredient;
            } else {
                fullIngred = ingredient;
           }
            var ingedEl = $("<li>").attr("id", "ing-" + i).append(fullIngred);
            $("#ingredients").append(ingedEl);
        }
    }
};