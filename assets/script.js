var ageModal = $(".container-modal");
var birthYear = $("#verify-year");

$(document).ready(function () {
    $(ageModal).addClass("is-active");
    userAge();
    var age = {};
    
    function userAge () {
        var month = 0;
        var day = 0;
        var year = 0;

        $("#age-submit").on("click", function() {
            age[month] = $("#verify-month option:selected").text();
            age[day] = $("#verify-day option:selected").text();
            age[year] = $("#verify-year").val();
            
            check();
        });
    }

    function check() {
        if (age.month == "none" || age.day == "none" || age.year == "none") {
            $(".container-modal").addClass("has-background-grey");

            if (age.month == "none") {
                $("#verify-month").addClass("has-background-grey");
                $("#verify-month").on("change", function() {
                    if ($("#verify-month").text() == "none") {
                        $("#verify-month").addClass("has-background-grey");
                    } else {
                        $("#verify-month").removeClass("has-background-grey");
                    }

                });
            }   
            
            if (age.day == "none") {
                $("#verify-day").addClass("has-background-grey");
                $("#verify-day").on("change", function() {
                    if ($("#verify-day").text() == "none") {
                        $("#verify-day").addClass("has-background-grey");
                    } else {
                        $("#verify-day").removeClass("has-background-grey");
                    }

                });
            }   
             
            if (age.year == "none") {
                $("#verify-year").addClass("input is-warning");
                $("#verify-year").on("change", function() {
                    if ($("#verify-year").val() == "none") {
                         $("#verify-year").addClass("input is-warning");
                    } else {
                        $("#verify-year").removeClass("input is-warning");
                    }

                });
            }  else {
                isAdult();
            } 
             
        }
    }


    function isAdult() {
        var ageLimit = moment().subtract(21, "years").calendar();
        var birthDate = age.month + " " + age.day + " " + age.year;
        var isAdult = moment(birthDate, "MM DD YYYY").isBefore(ageLimit, "day");

        if (isAdult) {
            $(".container-modal").removeClass("is-active");
        }
    }










})
