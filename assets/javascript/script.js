
var topics = ["soccer", "basketball", "football", "rugby", "skiing", "snowboarding", "skydiving", "skateboarding", "baseball"];

function renderButtons() {
    $("#sportButtons").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>");
      a.addClass("sportChoice");
      a.attr("dataName", topics[i]);
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

    $("button").on("click", function() {
        var sport = $(this).attr("dataName");
        var queryURL = $.get("https://api.giphy.com/v1/gifs/search?q=" + sport + " &api_key=t49284Qc456TrOMPFFsGT2LaZs0FuKlI&rating=g&limit=10");
        queryURL.done(function(data) { console.log("success got data", data); console.log(data.meta.status) });

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
                sportImage.attr("src", results[i].images.fixed_height.url);
        
                gifDiv.append(p);
                gifDiv.append(sportImage);
                $("#sportsView").prepend(gifDiv);
            }
        }
        });
    });

});





