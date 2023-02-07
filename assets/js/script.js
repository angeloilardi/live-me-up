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
        // commenting the next few lines as they're not in use right now
        let numOfEvents = response.length;
        console.log(numOfEvents);
        let currentlyDisplayed = 0
        // message if the are no results
        console.log(response);
        if (response.length === 0) {
            $(".event-container").html(`<h3 class="mx-auto">Sorry, no results for this artist :/</h3>`)
                .addClass("row align-items-center");
            //calls function to display results
        } else {
            showEvents(response, 0)
        }
    })
}


function showEvents(response, counter) {
    $(".event-container").empty();
    let resultsHeading = $("<h4>").text(`UPCOMING EVENTS FOR ${response[0].artist.name}`).addClass("row m-4");
    $(".event-container").append(resultsHeading);
    // for each event found
    for (let i = counter; i < response.length; i++) {
        // gets the date and changes the format
        let date = moment((response[i].datetime), "YYYY-MM-DD").format("DD/MM/YYYY");
        // gets the city
        let city = response[i].venue.city;
        // gets the country
        let country = response[i].venue.country;
        // gets the name of the venue
        let venue = response[i].venue.name;
        //creates a row for the event
        let eventRow = $("<div>").addClass("row align-items-center p-2");
        // builds the event text
        let eventContent = $("<h5>").text(`${date} - ${city} - ${country}`);
        // the venue name with a smaller font
        let eventVenue = $("<h6>").text(`${venue}`).addClass("p-2");
        // gets link to the tickets
        let getTicketsBtn = $("<button>").addClass("ml-auto").append((`<a target="_blank" href = ${response[i].url}>Get Tickets</a>`));
        //heading for event resulsts

        $(eventRow).append(eventContent, eventVenue, getTicketsBtn);
        $(".event-container").append(eventRow);

    }
}


$("#search-btn").on("click", function () {
    let searchEntry = $("#artist-search").val();
    console.log(searchEntry);
    artistSearch(searchEntry);
})

// Ivanna JS 

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
        // commenting the next few lines as they're not in use right now
        // let numOfEvents = response.length;
        //console.log(numOfEvents);
        // let currentlyDisplayed = 0
        // message if the are no results
        console.log(response);
        $("html, body").animate({
            scrollTop: $(".event-container").offset().top
        })
        
        if (response.length === 0) {
            $(".event-container").html(`<h3 class="mx-auto">Sorry, no results for this artist :/</h3>`)
            //.addClass("row align-items-center");
            //calls function to display results
        } else {
            showEvents(response, 0)
        }
    })
}


function showEvents(response, counter) {
    $(".event-container").empty();
    let resultsHeading = $("<h4>").text(`UPCOMING EVENTS FOR ${response[0].artist.name}`).addClass("row m-4");
    $(".event-container").append(resultsHeading);
    // for each event found
    for (let i = counter; i < response.length; i++) {
        // gets the date and changes the format
        let date = moment((response[i].datetime), "YYYY-MM-DD").format("DD/MM/YYYY");
        // gets the city
        let city = response[i].venue.city;
        // gets the country
        let country = response[i].venue.country;
        // gets the name of the venue
        let venue = response[i].venue.name;
        //creates a row for the event
        let eventRow = $("<div>").addClass("row align-items-center p-2");
        // builds the event text
        let eventContent = $("<h5>").text(`${date} - ${city} - ${country}`);
        // the venue name with a smaller font
        let eventVenue = $("<h6>").text(`${venue}`).addClass("p-2");
        // gets link to the tickets
        let getTicketsBtn = $("<button>").addClass("ml-auto").append((`<a target="_blank" href = ${response[i].url}>Get Tickets</a>`));
        //heading for event resulsts

        $(eventRow).append(eventContent, eventVenue, getTicketsBtn);
        $(".event-container").append(eventRow);

    }
}


$("#search-btn").on("click", function () {
    let searchEntry = $("#artist-search").val();
    console.log(searchEntry);
    artistSearch(searchEntry);
})