var giphyApiKey = "bkAxzVVfXtpuYo0AmrdqJO1Gp3erKjJE";

$(document).ready(function () {
    $.ageCheck({
        minAge: 21
    });
    startCount();

    function startCount() {
        var today = moment("2020-07-23");
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
        var spirit = $(this).attr("id");
        var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + spirit;
        $.ajax({
            url: url,
            method: "GET"
        }).then(function (response) {
            console.log(response)
        });
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
        $("#type-pg").addClass("is-hidden");
        $("#fun-pg").addClass("is-hidden");
        $("#spirit-pg").removeClass("is-hidden");
    });

    $(".type").on("click", function () {
        $("#home-pg").addClass("is-hidden");
        $("#spirit-pg").addClass("is-hidden");
        $("#fun-pg").addClass("is-hidden");
        $("#type-pg").removeClass("is-hidden");
    });

    $(".fun").on("click", function () {
        $("#home-pg").addClass("is-hidden");
        $("#spirit-pg").addClass("is-hidden");
        $("#type-pg").addClass("is-hidden");
        $("#fun-pg").removeClass("is-hidden");

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
        $("#type-pg").addClass("is-hidden");
        $("#home-pg").removeClass("is-hidden");
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
                    fullIngred=ingredient;
                }
                var ingedEl = $("<li>").attr("id", "ing-" + i).append(fullIngred);
                $("#ingredients").append(ingedEl);
            }
        }
    }
})