
var topics = ["soccer", "basketball", "football", "rugby", "skiing", "snowboarding", "skydiving", "skateboarding", "baseball"];

function renderButtons() {
    $("#sportButtons").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>");
      a.addClass("sportChoice");
      a.attr("data-name", topics[i]);
      a.text(topics[i]);
      $("#sportButtons").append(a);
    }
  }


$(document).ready(function() {
    renderButtons();

    $("#addSport").on("click", function(event) {
        event.preventDefault();
        var newSport = $("#sportInput").val().trim();
        topics.push(newSport);
        renderButtons();
    });

    $(".sportChoice").on("click", function() {
        $("#sportsView").empty();
        var sport = $(this).attr("data-name");
        // var queryURL = $.get("https://api.giphy.com/v1/gifs/search?q=" + sport + " &api_key=t49284Qc456TrOMPFFsGT2LaZs0FuKlI&rating=g&limit=10");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + " &api_key=t49284Qc456TrOMPFFsGT2LaZs0FuKlI&rating=g&limit=10";

        // queryURL.done(function(data) { console.log("success got data", data); console.log(data.meta.status) });

        $.ajax({
            url: queryURL,
            method: "GET"
            
        })
        .then(function(response) {
            var results = response.data;
            console.log(queryURL);
            console.log(response);
        
            for (var i = 0; i < results.length; i++) {


                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var sportImage = $("<img>");

                    sportImage.addClass(".gif");

                    sportImage.attr("src", results[i].images.fixed_height_still.url);

                    sportImage.attr("data-still", results[i].images.fixed_height_still.url);
                    sportImage.attr("data-animate", results[i].images.fixed_height.url);
                    sportImage.attr("data-state", "still")
                     
                    gifDiv.append(sportImage);
                    gifDiv.append(p);
                    $("#sportsView").prepend(gifDiv);
                }
        }
        });


    });

    $(".gif").on("click", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

});





