var ageModal = $(".container-modal");
var birthYear = $("#verify-year");

$(document).ready(function () {

    // $(ageModal).addClass("is-active");
    // userAge();
    // var age = {};
    
    // function userAge () {
    //     var month = 0;
    //     var day = 0;
    //     var year = 0;

    //     $("#age-submit").on("click", function() {
    //         age[month] = $("#verify-month option:selected").text();
    //         age[day] = $("#verify-day option:selected").text();
    //         age[year] = $("#verify-year").val();
            
    //         check();
    //     });
    // }

    // function check() {
    //     if (age.month == "none" || age.day == "none" || age.year == "none") {
    //         $(".container-modal").addClass("has-background-grey");

    //         if (age.month == "none") {
    //             $("#verify-month").addClass("has-background-grey");
    //             $("#verify-month").on("change", function() {
    //                 if ($("#verify-month").text() == "none") {
    //                     $("#verify-month").addClass("has-background-grey");
    //                 } else {
    //                     $("#verify-month").removeClass("has-background-grey");
    //                 }

    //             });
    //         }   
            
    //         if (age.day == "none") {
    //             $("#verify-day").addClass("has-background-grey");
    //             $("#verify-day").on("change", function() {
    //                 if ($("#verify-day").text() == "none") {
    //                     $("#verify-day").addClass("has-background-grey");
    //                 } else {
    //                     $("#verify-day").removeClass("has-background-grey");
    //                 }

    //             });
    //         }   
             
    //         if (age.year == "none") {
    //             $("#verify-year").addClass("input is-warning");
    //             $("#verify-year").on("change", function() {
    //                 if ($("#verify-year").val() == "none") {
    //                      $("#verify-year").addClass("input is-warning");
    //                 } else {
    //                     $("#verify-year").removeClass("input is-warning");
    //                 }

    //             });
    //         }  else {
    //             isAdult();
    //         } 
             
    //     }
    // }


    // function isAdult() {
    //     var ageLimit = moment().subtract(21, "years").calendar();
    //     var birthDate = age.month + " " + age.day + " " + age.year;
    //     var isAdult = moment(birthDate, "MM DD YYYY").isBefore(ageLimit, "day");

    //     if (isAdult) {
    //         $(".container-modal").removeClass("is-active");
    //     }
    // }



    // Get Method using spirit name or ingredient 
    
    $(".spirit").on("click", function () {
    var spirit = $(this).attr("id");
    var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + spirit;
    $.ajax({
        url: url,
        method: "GET" 
    }).then(function (response){
        console.log(response)
    })

    })


    // Get Method using cocktail name 
    $(".cocktail").on("click", function () {
    var cocktail = $(this).attr("id");
    var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + cocktail;
    $.ajax({
        url: url,
        method: "GET" 
    }).then(function (response){
        console.log(response)
    })
})


    // Get Method for random cocktail
    var url = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    $.ajax({
        url: url,
        method: "GET" 
    }).then(function (response){
        // console.log(response)
    })

    // add event listener for menu btns
    $(".spirit").on("click", function () {
        $("#home-pg").addClass("is-hidden");
        $("#type-pg").addClass("is-hidden");
        $("#fun-pg").addClass("is-hidden");
        $("#spirit-pg").removeClass("is-hidden");
    })

    $(".type").on("click", function () {
        $("#home-pg").addClass("is-hidden");
        $("#spirit-pg").addClass("is-hidden");
        $("#fun-pg").addClass("is-hidden");
        $("#type-pg").removeClass("is-hidden");
    })
    
    $(".fun").on("click", function () {
        $("#home-pg").addClass("is-hidden");
        $("#spirit-pg").addClass("is-hidden");
        $("#type-pg").addClass("is-hidden");
        $("#fun-pg").removeClass("is-hidden");
    })
    $(".home").on("click", function () {
        $("#fun-pg").addClass("is-hidden");
        $("#spirit-pg").addClass("is-hidden");
        $("#type-pg").addClass("is-hidden");
        $("#home-pg").removeClass("is-hidden");
    })



})


