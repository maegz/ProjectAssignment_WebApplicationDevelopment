


// SKAFFA WIKIPEDIA-API för info om spelet
// "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=" + liName;


"use strict";


$(document).ready(function() {
    $("button").click(function() {
        var userInput = $("input").val();
        getUserInput(userInput);
    });
});

// Get top 10 games connected with the users input.
function getUserInput(input) {
    $.ajax({
        // Get users input for the API URL to get games.
        url: "https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=*&search=" + input, // The URL to the API.
        type: 'GET', // The HTTP Method
        data: {}, // Additional parameters here
        dataType: 'json',
        // If it works, each object appends to the list-element with the ID and Name.
        success: function(data) {
            console.log(data);
            // Clear the dropdown list each time the user searches for a new game.
            $("ul").html("");
            // Add game-id and name to the list.
            for (var i in data) {
                $("ul").append("<li id=" + data[i].id +">" + data[i].name + "</li>").hide().slideDown();
            }
            $("li").click(function() {
                $("ul").slideUp();
                $(".carousel-indicators").html("");
                $(".carousel-inner").html("");
                // Get all objects in data-array
                for (var i in data) {
                    // If the arrays id-object is the same as the clicked li-id..
                    if (data[i].id == this.id) {
                        $(".mainText").html(data[i].name);
                        $(".backgroundImage").css("background-image", "url(https://images.igdb.com/igdb/image/upload/" + data[i].screenshots[0].cloudinary_id + ".png)").hide().fadeIn(1000);
                        // Get all the objects in the screenshots-array. Add them to the carousel.
                        for (var j in data[i].screenshots) {
                            if (j == 0) {
                                $(".carousel-indicators").append("<li data-target='#carousel-generic' data-slide-to=" + j + " class='active'></li>");
                                $(".carousel-inner").append("<div class='item active'><img src='https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/" + data[i].screenshots[j].cloudinary_id + ".jpg'><div>");
                            } else {
                                $(".carousel-indicators").append("<li data-target='#carousel-generic' data-slide-to=" + j + "></li>");
                                $(".carousel-inner").append("<div class='item'><img src='https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/" + data[i].screenshots[j].cloudinary_id + ".jpg'><div>");
                            }

                        }
                        // If the game doesn't have a summary, print out a different text.
                        if (data[i].summary === undefined) {
                            $(".infoText").html("Sorry, the summary of this game doesn't exist on IGDB. :(").hide().slideDown();
                        } else {
                            $(".infoText").html(data[i].summary).hide().slideDown();
                        }
                    }
                }
            });
            // getChosenGameImage();
        },
        error: function(err) { alert(err); },
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "UMH89mEtExmsh2p87keymPsDcroyp10qerijsnbcCdUmwMetfX"); // Enter here your Mashape key
        }
    });
}


// Create click-function for each list-object.
function getChosenGameImage() {
    $("li").click(function() {
        var liID = this.id;
        var liName = this.innerHTML;
        // Get clicked object for the API URL to get images.
        $.ajax({
            url: "https://igdbcom-internet-game-database-v1.p.mashape.com/games/" + this.id + "?fields=screenshots",
            type: "GET",
            data: {},
            dataType: "json",
            // If it works, get the specific ID (hash) for the image. Append to the div-element.
            success: function(data) {
                if (data[0].screenshots !== undefined) {
                    var imageHash = data[0].screenshots[0].cloudinary_id;
                    for (var i in data[0].screenshots) {
                        $(".screenshots").append("<img src='https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/" + data[0].screenshots[i].cloudinary_id + ".jpg'/>");
                        // var imageUrl = "https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/" + imageHash + ".jpg";
                    }
                    var backgroundImage = "https://images.igdb.com/igdb/image/upload/" + imageHash + ".png";
                    $(".mainText").css("padding", "4em").html("<h1>" + liName + "</h1>" /*<img id=img" + liID + " src=" + imageUrl + ">"*/).hide().fadeIn(1500);
                                                //  The%20Witcher%203:%20Wild%20Hunt
                    // Change all whitespace to "%20" for the HTML-search.
                    var infoTextCorrector = liName.replace(/\s/g, "%20");
                    $(".infoText").html("<a>Click Here!</a>");
                    var gameInfoTextAll = "https://en.wikipedia.org/w/api.php?format=json&srwhat=nearmatch&action=query&prop=extracts&exintro=&explaintext=&titles=" + infoTextCorrector;

                    $(".infoText").click(function() {
                        $.ajax({
                            url: gameInfoTextAll,
                            type: "GET",
                            data: {},
                            dataType: "jsonp",
                            success: function(data) {
                                var gameID = data.query.pages;
                                for (var i in gameID) {
                                    $(".infoText").html(gameID[i].extract).hide();
                                    console.log(gameID[i].extract);
                                }
                                $(".infoText").slideDown();
                            },
                            error: function(err) { alert(err); }
                        });
                    });


                    $("ul").slideUp().empty();
                    // $(".mainText").append("<h1>" + data[0].name + "</h1><img id=img" + liID + " src=" + imageUrl + ">").hide().fadeIn(1500);
                    $(".backgroundImage").css("background-image", "url(" + backgroundImage + ")").hide().fadeIn(1000);
                    // If the ID doesn't contain images, print it out for the user.
                } else {
                    $(".mainText").css("padding", "5em").html("<p><br>Sorry, no screenshots available!</p>").hide().fadeIn(1500);
                }
            },
            error: function(err) { alert(err); },
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-Mashape-Authorization", "UMH89mEtExmsh2p87keymPsDcroyp10qerijsnbcCdUmwMetfX"); // Enter here your Mashape key
            }
        });
    });
}
// api_key=UMH89mEtExmsh2p87keymPsDcroyp10qerijsnbcCdUmwMetfX
// $.getJSON("https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=name&limit=10&offset=0&order=release_dates.date%3Adesc&search=zelda",
