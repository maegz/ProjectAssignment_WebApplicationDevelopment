"use strict";


// Use the GiantBomb API to get the user input-name, & show all the results similar to that name (maximum 10).
function API_getUserInput(input) {
    $.ajax({
        type: "GET",
        url: "https://www.giantbomb.com/api/search/?api_key=b6a1aa5de5723bec079ca742a4dcdc29850cc623&format=jsonp&json_callback=myCallback&resources=game&query=" + input,
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        jsonpCallback: "myCallback",
        success: function(data) {
            console.log(data.results);
            // console.log(data.results);
            showDropDownList(data.results);
        },
        error: function(err) {
            console.log(err);
        }
    });
}


// Use the GiantBomb API to get the images from the gameID.
function API_getGameImages(gameID) {
    $.ajax({
        type: "GET",
        url: "https://www.giantbomb.com/api/game/" + gameID + "/?api_key=b6a1aa5de5723bec079ca742a4dcdc29850cc623&format=jsonp&json_callback=myCallback",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        jsonpCallback: "myCallback",
        success: function(data) {
            console.log(data);
            var gameImages = data.results.images;
            if (gameImages.length === 0) {
                API_getGameImagesFromWebSearch();
            } else {
                showImages(gameImages);
            }
        },
        error: function(err) { console.log(err); }
    });
}


// Use the Bing API to get the first (game name + wikipedia) result as a link.
function API_getGameInfoIfNotExisting(gameName) {
    $.ajax({
        url: "https://api.cognitive.microsoft.com/bing/v5.0/search?q=" + gameName + "+wikipedia&mkt=en-us",
        type: "GET",
        dataType: "json",
        success: function(data) {
            var urlPage = data.webPages.value[0].url;
            console.log(data.webPages);
            $(".infoText").html("<h1>Sorry, the summary of this game doesn't exist on GiantBomb.</h1><br><a id='infoLink' " +
            "href=" + urlPage + ">Click here for more info on another page</a>").hide().fadeIn(3000);
            // If the user wants to be redirected to another page, the user must first accept it in a popup-window.
            $("#infoLink").click(function() {
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


// Use the Bing API to find the first 10 images of (game title + gameplay) results.
function API_getGameImagesFromWebSearch() {
    $.ajax({
        url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=" + $(".titleText").text() + "+gameplay&count=10&aspect=wide&size=large",
        type: "GET",
        dataType: "json",
        success: function(data) {
            $(".backgroundImage").css("background-image", "url(" + data.value[0].contentUrl + ")").hide().fadeIn(2000);
            console.log(data.value);
            showImages(data.value);
        },
        error: function(err) { console.log(err); },
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Ocp-Apim-Subscription-Key", "6e0a34bcb1b64e449022c55f26f66813");
        }
    })
}
