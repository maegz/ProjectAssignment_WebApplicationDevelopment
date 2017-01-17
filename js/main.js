// BING key: 6e0a34bcb1b64e449022c55f26f66813

"use strict";


$(document).ready(function() {
    $("button").click(function() {
		$("img").fadeIn();
        var userInput = $("input").val();
        showUserInput(userInput);
    });

    // If the user presses Enter, the button click function activates.
    $("input").keyup(function(event) {
        if (event.keyCode == 13) {
            $("button").click();
        }
    });
});

// Get top 10 games connected with the users input.
function showUserInput(input) {
    $.ajax({
        // Get users input for the API URL to get games.
        url: "https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=*&search=" + input,
        type: 'GET',
        dataType: 'json',
        // If it works, each object appends to the list-element with the ID and Name.
        success: function(data) {
			$("img").fadeOut();
            if (data.length === 0) {
                $("ul").html("").append("<li>Sorry, couldn't find anything with that name. Try again...</li>").hide().slideDown();
                console.log("Sorry, couldn't find anything with that name.");
            } else {
                // Clear the dropdown list each time the user searches for a new game.
                $("ul").html("");
                // Add game-id and name to the list.
                for (var i in data) {
                    $("ul").append("<li id=" + data[i].id +">" + data[i].name + "</li>").hide().slideDown();
                }
                // Clicking on list-items.
                $("li").click(function() {
                    // Hide or erase old information in order to create new.
                    $("ul").slideUp();
                    $(".carousel-indicators").html("");
                    $(".carousel-inner").html("");
                    $("img").fadeIn();
                    // Get all objects in data-array
                    for (var i in data) {
                        // If the arrays id-object is the same as the clicked li-id..
                        if (data[i].id == this.id) {
                            $(".mainText").html("<h2>" + data[i].name + "</h2>").hide().fadeIn(2000);
                            getImages();
                            $("img").fadeOut();
                            if (data[i].summary != undefined) {
                                $(".infoText").html("<h2>Summary from IGDB:</h2><br>" + data[i].summary).hide().fadeIn(2000);
                            // If the game doesn't have a summary, use the Bing API for getting the first search site as a link.
                            } else {
                                getGameInfoIfNotExistingOnIGDB();
                            }
                        }
                    }
                });
            }
        },
        error: function(err) { alert(err); },
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "UMH89mEtExmsh2p87keymPsDcroyp10qerijsnbcCdUmwMetfX"); // Enter here your Mashape key
        }
    });
}

function getImages() {
    $.ajax({
        url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=" + $(".mainText").text() + "+gameplay&count=10&aspect=wide&size=large",
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log(data);
            $(".backgroundImage").css("background-image", "url(" + data.value[0].contentUrl + ")").hide().fadeIn(2000);
            $("#carousel-generic").hide().fadeIn(2000);
            console.log(data.value);
            for (var i in data.value) {
                if (i == 0) {
                    $(".carousel-indicators").append("<li data-target='#carousel-generic' data-slide-to=" + i + " class='active'></li>");
                    $(".carousel-inner").append("<div class='item active'><img src=" + data.value[i].contentUrl + "><div>").hide().fadeIn(2000);
                } else {
                    $(".carousel-indicators").append("<li data-target='#carousel-generic' data-slide-to=" + i + "></li>");
                    $(".carousel-inner").append("<div class='item'><img src=" + data.value[i].contentUrl + "><div>");
                }
            }
        },
        error: function(err) { console.log(err); },
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Ocp-Apim-Subscription-Key", "6e0a34bcb1b64e449022c55f26f66813"); // Enter here your Mashape key
        }
    })
}

function getGameInfoIfNotExistingOnIGDB() {
    $.ajax({
        url: "https://api.cognitive.microsoft.com/bing/v5.0/search?q=" + $(".mainText").text() + "+wikipedia&mkt=en-us",
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log(data.webPages.value[0].url);
            $(".infoText").html("<h2>Sorry, the summary of this game doesn't exist on IGDB.</h2><br><a id='infoLink' href=" + data.webPages.value[0].url + ">Click here for more info on another page</a>").hide().fadeIn(3000);
            // If the user wants to be redirected to another page, the user must first accept it in a popup-window.
            $("#infoLink").click(function() {
                console.log("hej");
                window.onbeforeunload = function() {
                    window.onbeforeunload = null;
                    return "Bye";
                };
            });
        },
        error: function(err) { console.log(err); },
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Ocp-Apim-Subscription-Key", "eab7bca2c7ec405eb83dcb524eb3cc76");
        }
    })
}


// api_key=UMH89mEtExmsh2p87keymPsDcroyp10qerijsnbcCdUmwMetfX
// $.getJSON("https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=name&limit=10&offset=0&order=release_dates.date%3Adesc&search=zelda",
