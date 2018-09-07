var animals = ["Cat", "Dog", "Eagle", "Lion", "Dolphin", "Elephant", "Frog", "Turtle", "Rabbit", "Fox", "Falcon", "Wolf", "Tiger", "Squirrel", "Skunk", "Porcupine", "Ferret", "Lizard"];

function renderButtons() {

    $("#buttons-view").empty();


    for (var i = 0; i < animals.length; i++) {
        var animalButton = $("<button>");
        animalButton.addClass("animal-btn btn btn-success btn-sm");
        animalButton.attr("data-name", animals[i]);
        animalButton.text(animals[i]);
        $("#buttons-view").append(animalButton);
    }

}

function displayanimalInfo() {
    $("#gif-bucket").empty();

    var animal = $(this).attr("data-name");
    var apiKey = "BFkXA7DPTHoMxtYJztfpl36Xk7hHKwbj";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&api_key=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response)


        for (var i = 0; i < response.data.length; i++) {
            var animalDiv = $("<div class='animal'>");
            var rating = response.data[i].rating;
            var $rating = $('<p>').text("Rating: " + rating.toUpperCase())
            var gif = response.data[i].images.fixed_height_still.url;
            var $gif = $("<img class='gif'>").attr("src", gif)
            animalDiv.append($rating, $gif)
            animalDiv.append(animalDiv)
            $("#gif-bucket").append(animalDiv);
        }
            $(".animal").css("float", "left")
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", ".animal-btn", displayanimalInfo);

$(document).on("click", ".gif", function () {
    var src = $(this).attr("src");
    if ($(this).hasClass("playing")) {
        $(this).attr("src", src.replace(/\.gif/i, "_s.gif"))
        $(this).removeClass("playing");
    } else {
        $(this).addClass("playing");
        $(this).attr("src", src.replace(/\_s.gif/i, ".gif"))
    }
});

renderButtons();

$("#add-animal").on("click", function (event) {
    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    

    if (!animal == "") {
        animals.push(animal);
    }
    

    renderButtons();

    $("#animal-input").val("")
});

////////////////////////////////////////////////////////////////////////////////////////////////


