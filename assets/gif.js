
var adventureTimeArray = ["Finn the Human", "Princess Bubblegum", "Marceline the Vampire Queen", "Marshall Lee the Vampire King", "Jake the dog", "BMO", "Hunson Abadeer", "The Lich Adventure Time", "Cake the cat", "Prince Gumball", "Ice King"]
var input = "";

function searchFromButton() {
    var input = $("#search-input").val().trim();
    if (input == "") {
        alert("Please type a word")
    }
    if (adventureTimeArray.indexOf(input) != -1) {
        alert("Come on! Think of something")
    }
    else {
        search(input);
        addBttn(input);
    }


}

function search(input) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .done(function (response) {
            //empties div for new selection to append
            $("#adventureTime").empty();

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var resultsDiv = $("<div>");

                //shows clean rated gifs
                var rating = results[i].rating;
                var pRate = $("<p>").text("Rating: " + rating);
               
                //fixes the gifs to populate still
                var urlPlay = results[i].images.fixed_height.url;
                var urlStill = results[i].images.fixed_height_still.url;
                //adding the attributes to populate gifs paused, and control them later
                var inputImage = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlPlay).attr("data-state", "still");
                //old code that was inputed before adding the click pause function below
                //inputImage.attr("src", results[i].images.fixed_height.url);
                resultsDiv.append(pRate).append(inputImage).addClass("col-4");

                $("#adventureTime").append(resultsDiv);

            }
            //on click of gif will play, click again will pause again
            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
}
function addBttn(input) {
    var adventurebttns = $("<button>");
    adventurebttns.attr("onclick", "search(this.value)");
    adventurebttns.attr("src", input);
    adventurebttns.attr("value", input);
    adventurebttns.text(input);
    adventurebttns.attr("style","margin: 5px");
    adventurebttns.addClass("btn btn-dark");
    //.addClass("col");
    $("#adventureTimeButtons").append(adventurebttns);


}
function popluateBttns() {
    for (var i = 0; i < adventureTimeArray.length; i++) {
        addBttn(adventureTimeArray[i]);
    }
}
popluateBttns();


