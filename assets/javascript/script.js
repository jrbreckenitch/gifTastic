
var topics = ["soccer", "basketball", "football", "rugby", "skiing", "snowboarding", "skydiving", "skateboarding", "baseball"];

// var APIKey = "t49284Qc456TrOMPFFsGT2LaZs0FuKlI";

// var queryURL = "";

// Function for displaying movie data
function renderButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#sportButtons").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class
      a.addClass("sportChoice");
      // Adding a data-attribute with a value of the movie at index i
      a.attr("data-name", topics[i]);
      // Providing the button's text with a value of the movie at index i
      a.text(topics[i]);
      // Adding the button to the HTML
      $("#sportButtons").append(a);
    }
  }





$(document).ready(function() {

    renderButtons();

    $("#addSport").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();
        
        // This line will grab the text from the input box
        var newSport = $("#sportInput").val().trim();
        // The movie from the textbox is then added to our array
        topics.push(newSport);
        
        // calling renderButtons which handles the processing of our movie array
        renderButtons();
    });
});

$(".sportChoice").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var sport = $(this).attr("data-name");
    var APIKey = "t49284Qc456TrOMPFFsGT2LaZs0FuKlI";

    // Constructing a URL to search Giphy for the name of the person who said the quote
    // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    //   person + "&api_key=dc6zaTOxFJmzC&limit=10";
    var queryURL = $.get("http://api.giphy.com/v1/gifs/search?q=" + sport + " &api_key=" + APIKey + "&limit=10&rating=g");


    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div with the class "item"
            var gifDiv = $("<div class='item'>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var sportImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            sportImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(sportImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#sportsView").prepend(gifDiv);
          }
        }
      });

});






