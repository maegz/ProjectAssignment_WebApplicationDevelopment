// BING key: 6e0a34bcb1b64e449022c55f26f66813
// Giant Bomb key: b6a1aa5de5723bec079ca742a4dcdc29850cc623

"use strict";


$(document).ready(function() {
    // Start with fading in intro objects.
    $(".jumbotron").fadeIn(1500, function() {
        $("nav").fadeIn(1000);
    });

    // Clicking the button starts the loading image and sends the user input to the GiantBomb API.
    $("button").click(function() {
		$("#loadingImage").fadeIn();
        var userInput = $("input").val();
        API_getUserInput(userInput);
    });
    // If the user presses Enter, the button click function activates.
    $("input").keyup(function(event) {
        if (event.keyCode == 13) {
            $("button").click();
        }
    });

    // Remove information when clicking within the nav-tag area
    $("nav").mousedown(function() { $("#infoBox").fadeOut(); })
    // Show information about page when mouse hovers over the questionmark.
    $("#showBox").mouseenter(function(){ $("#infoBox").slideDown(); });
    // Remove information when mouse leaves the questionmark.
    $("#showBox").mouseleave(function(){ $("#infoBox").slideUp(); });
});


// Dynamically generated dropdown-list.
function showDropDownList(game) {
    $("#loadingImage").fadeOut();
    if (game.length === 0) {
        $("#navDropdownList").html("").append("<li>Sorry, couldn't find anything with that name. Try again...</li>").hide().slideDown();
    } else { // Clear the dropdown list each time the user searches for a new game.
        $("#navDropdownList").html("");
        for (var i in game) { // Add game-id and name to the list.
            $("#navDropdownList").append("<li id=" + game[i].id +">" + game[i].name + "</li>").hide().slideDown();
        }
        showBackgroundAndTitleText(game);
    }
};


function showBackgroundAndTitleText(game) {
    $("li").click(function() {
        // Hide or erase old information in order to create new.
        $("#navDropdownList").slideUp();
        $(".carousel-indicators").html("");
        $(".carousel-inner").html("");
        $("#loadingImage").fadeIn();
        // Get all objects in data-array
        for (var i in game) {
            if (game[i].id == this.id) {
                $(".titleText").html("<h2>" + game[i].name + "</h2>").hide();//.fadeIn(2000);
                $(".backgroundImage").css("background-image", "url(" + game[i].image.super_url + ")").hide();//.fadeIn(2000);
                API_getGameImages(game[i].id);
                // console.log(game[i].description);
                if (game[i].description != undefined && game[i].description.length > 50) {
                    $(".infoText").html("<h1><b>Game information from GiantBomb about " +
                        game[i].name + ":</b></h1><br>" + game[i].description).hide();//.children().hide();
                    $(".titleText").fadeIn(2000);
                    $(".backgroundImage").fadeIn(2000);
                    $(".infoText").show().children().hide();
                    $("h1").slideDown().nextUntil("h2").slideDown();
                    $("h2").slideDown();
                    $("h2").click(function() {
                        $(this).nextUntil("h2").slideToggle();
                    });
                } else { // If the game doesn't have a summary, use the Bing API for getting the first search site as a link.
                    API_getGameInfoIfNotExisting(game[i].name);
                }
                    /*--------------------------------------------
                    |                                            |
                    |               FUNKAR INTE JU!!!!!          |
                    |                                            |
                    --------------------------------------------*/
                                // var thisLink = $(".infoText a").attr("href");
                                // if (thisLink.indexOf("giantbomb") != -1) {
                                //     console.log("hej");
                                //     var newLink = thisLink.substring(2);
                                //     $(".infoText a").attr("href", "http//:" + newLink);
                                //     console.log(newLink);
                                // } else {
                                //     console.log("funkar ej");
                                // }
                                    // });
                                    // var theHref = $("a").attr("href");
                                    // console.log(theHref);
                                    // if (!theHref.contains("giantbomb")) {
                                    //     console.log("fwernuir");
                                    // }
                                    // $(this).attr("href", theHref + "?format=bbbb");
                                    // if ($("[href*='giantbomb']")) {
                                    //     console.log("hej");
                                    // }
                                    // $("[attribute*='value']")
                                    // if ($(this).contains('giantbomb')) {
                                    //     console.log($(this));
                                    //     console.log("hej");
                                    // }
                                    // var $addLastHref = $(this).attr("href");
                                    // $(this).attr("href", "http://www.giantbomb.com" + $addLastHref);
                                    // })
            }
        }
    });
}


function showImages(images) {
    for (var i in images) {
        if (images[i].super_url === undefined) {
            if (i == 0) {
                $(".carousel-indicators").append("<li data-target='#carousel-generic' data-slide-to=" + i + " class='active'></li>");
                $(".carousel-inner").append("<div class='item active'><img src=" + images[i].contentUrl + "><div>").hide().fadeIn(2000);
            } else {
                $(".carousel-indicators").append("<li data-target='#carousel-generic' data-slide-to=" + i + "></li>");
                $(".carousel-inner").append("<div class='item'><img src=" + images[i].contentUrl + "><div>");
                $("#carousel-generic").hide().fadeIn();
            }
        } else {
            if (i == 0) {
                $(".carousel-indicators").append("<li data-target='#carousel-generic' data-slide-to=" + i + " class='active'></li>");
                $(".carousel-inner").append("<div class='item active'><img src=" + images[i].super_url + "><div>").hide().fadeIn(2000);
            } else {
                $(".carousel-indicators").append("<li data-target='#carousel-generic' data-slide-to=" + i + "></li>");
                $(".carousel-inner").append("<div class='item'><img src=" + images[i].super_url + "><div>");
                $("#carousel-generic").hide().fadeIn();
            }
        }
    }
    $("#loadingImage").fadeOut(2000);
}



// api_key=UMH89mEtExmsh2p87keymPsDcroyp10qerijsnbcCdUmwMetfX
// $.getJSON("https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=name&limit=10&offset=0&order=release_dates.date%3Adesc&search=zelda",
