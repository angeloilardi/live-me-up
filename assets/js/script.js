let currentPage = 0;
results = [];

function artistSearch(artist) {
    $.ajax({
        url: `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`,
        method: "GET",
        //error 404 handling
        error: function (xhr, thrownError) {
            $(".event-container").empty();
            if (xhr.status == 404) {
                $(".event-container").html(`<h3 class="mx-auto">Ermm, we couldn't find that. Wanna give it another try?</h3>`)
                //.toggleClass("row align-items-center")
            }
        }
    }

    ).then(function (response) {
    results = response;
        
        // message if the are no results
        console.log(results);
        $("html, body").animate({
            scrollTop: $(".event-container").offset().top
        })

        if (response.length === 0) {
            $(".event-container").html(`<h3 class="mx-auto">Sorry, no results for this artist :/</h3>`)
            //.addClass("row align-items-center");
            //calls function to display results
        } else {
            currentPage = 1
            showEvents(results, 0, currentPage * 10);
            searchForSong();
        }
    })
}


function showEvents(results, start, finish) {
    $(".event-container").empty();
    let resultsHeading = $("<h4>").text(`UPCOMING EVENTS FOR ${results[0].artist.name}`).addClass("row m-4");
    $(".event-container").append(resultsHeading);
    // for each event found
    for (let i = start; i < finish; i++) {

        // gets the date and changes the format
        let date = moment((results[i].datetime), "YYYY-MM-DD").format("DD/MM/YYYY");
        // gets the city
        let city = results[i].venue.city;
        // gets the country
        let country = results[i].venue.country;
        // gets the name of the venue
        let venue = results[i].venue.name;
        //creates a row for the event
        let eventRow = $("<div>").addClass("row align-items-center p-2");
        // builds the event text
        let eventContent = $("<h5>").text(`${date} - ${city} - ${country}`);
        // the venue name with a smaller font
        let eventVenue = $("<h6>").text(`${venue}`).addClass("p-2");
        // gets link to the tickets
        let getTicketsBtn = $("<button>").addClass("ml-auto").append((`<a target="_blank" href = ${results[i].url}>Get Tickets</a>`));
        //heading for event resulsts
        

        $(eventRow).append(eventContent, eventVenue, getTicketsBtn);
        $(".event-container").append(eventRow);
    }
    let nextBtn = $("<button>").attr({
        type: 'submit',
        id: 'next-btn'
    })
    .html(`<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>`);
    let previousBtn = $("<button>").attr("type", "submit").html(`<i class="fa fa-chevron-circle-left" aria-hidden="true"></i>`);

    if (results.length > start +10){
        $(".event-container").append(nextBtn);
        $("#next-btn").on("click", function (event) {
            event.preventDefault();
            currentPage++;
            console.log("what?");
            showEvents(results, currentPage * 10 - 10, currentPage * 10);
        });
        
    }

    
}


$("#search-btn").on("click", function () {
    let searchEntry = $("#artist-search").val();
    console.log(searchEntry);
    artistSearch(searchEntry);
});

