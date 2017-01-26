# ProjectAssignment: Web Application Development
## Web application development with AJAX, JSON, jQuery, JS, HTML, CSS
<br>
* I am:
  * Maximilian Sundberg
  * [My LinkedIn-page](https://se.linkedin.com/in/maegz "Maegz LinkedIn")
* The course is:
  * Web application development at Lernia YHJUST16

### Link to live project:
<a href="https://maegz.github.io/ProjectAssignment_WebApplicationDevelopment/games.html">GitHub Pages</a>

### Short description of the project:
I've decided to create a game search-engine.
The user is supposed to search for a game, get alternatives that are related to the search
and then be able to get information about the games in text and images.
If the current query don't produce good enough results, another API takes action and gives
the user optional results.

### Technologies I've used:
* HTML5
* CSS
* Bootstrap
* JavaScript with jQuery
* Ajax

### APIs:
[GiantBomb](http://www.giantbomb.com/api/ "GiantBomb's API")
[Bing](https://www.microsoft.com/cognitive-services/en-us/bing-web-search-api/documentation "Bing's API")

### Work process:
First of all I had to find an interesting API that would appeal to me.
I checked through Mashape and finally stumbled on the IGDB API and directly thought it would fit.
It would be a challenge of different methods to take out all the different parts of the game info
and the styling could be done in so many different ways.

I started with a planning of the structure and design of the page, doing a rough HTML and CSS setup.
Then I took out the API parts with JavaScript and AJAX,
doing some checkups with console.log's to see the whole objects.
Starting to connect and tweeking all the variables with the DOM, a structure finally showed up.

I've been working for a desktop-view for the moment, but will adjust it for good mobile experience as well in the end.

I've noticed that some stuff are missing in the IGDB database, like summarys and screenshots, which can give the user an
unpleasant experience when trying to look up a game. This I will try to fix with either MediaWiki or some other API that I
find that can fulfill the searches.

## Update of the work process...
When the site was almost finished, I was still not satisfied with the result.
And I found a new API (GiantBomb) that was bigger and better. So I scraped of everything that had to do with the old API
and added the new one in the structure. Some endpoints had to be changed, but not too much.

Then I found out that a search through Bing Search was far easier to get to the correct information than using WikiPedia.
So I changed that code structure as well. Now it must all be good right?

No sir. When uploading the final result,
I noticed that "Mixed Content" was something that was not liked according to the console.
So now I'm officially stuck with that. I heard that it works if I upload everything to my own domain. Which I don't own.
Well, well. I know that it works quite good. Locally..
