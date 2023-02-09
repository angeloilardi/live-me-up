$(document).ready(function () {
    // variable to keep track of the results beng shown
    let currentPage = 0;
    //global variable for the API response
    results = [];
    //back to search button
    let backToSearch = $("<a>").text("Back to search").addClass("mt-3 text-decoration-none alert-link")
    .on("click", function scrollUp(){
        $("html, body").animate({
            scrollTop: "0"
        })
    })

    function artistSearch(artist) {
        $.ajax({
            url: `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`,
            method: "GET",
            //error 404 handling
            error: function (xhr, thrownError) {
                $(".event-container").empty();
                if (xhr.status == 404) {
                    $("html, body").animate({
                        scrollTop: $(".event-container").offset().top
                    })
                    $(".event-container").html(`<h3 class="mx-auto">Ermm, we couldn't find that. Wanna give it another try?</h3>`).append(backToSearch);
                }
            }
        }).then(function (response) {
            results = response;
            $("#artist-search").val('')
            // scrolls down to the results
            $("html, body").animate({
                scrollTop: $(".event-container").offset().top
            })
            // message if the are no results
            if (response.length === 0) {
                $(".event-container").html(`<h3 class="mx-auto">Sorry, no upcoming events for ${artist} :/</h3>`).append(backToSearch)
            } else {
                currentPage = 1;
                showEvents(results, 0, currentPage * 10);
                searchForSong();
                let history = localStorage.getItem('history');
                if (history === null) currentHistory = []
                else currentHistory = JSON.parse(localStorage.getItem('history'));
                console.log(currentHistory);
                console.log(artist);
                console.log(currentHistory);
                if (currentHistory.indexOf(artist) === -1) {
                    currentHistory.push(artist);
                    localStorage.setItem('history', JSON.stringify(currentHistory));
                }
                $("#artist-search").autocomplete({
                    source: JSON.parse(localStorage.getItem('history'))
                })
            }
        })
    }

    // function that shows the event results
    function showEvents(results, start, finish) {
        $(".event-container").empty();
        //$(".event-container").css({ '&::before': { 'background-image': 'url(' + results[0].artist.image_url + ')', 'content': '', 'position': 'absolute', 'background-repeat': 'no-repeat', 'top': '0', 'bottom': '0', 'left': '0', 'right': 0, 'background-size': 'cover', 'opacity': '0.2' } });
        //heading for event results
        let resultsHeading = $("<h4>").text(`UPCOMING EVENTS FOR ${results[0].artist.name}`).addClass("row mb-5 text-uppercase justify-content-center");
        $(".event-container").css({ color: "white" });
        $(".event-container").append(resultsHeading);
        // for each event found
        for (let i = start; i < finish && i < results.length; i++) {
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
            let eventVenue = $("<h6>").text(`${venue}`).addClass("p-2 font-italic");
            // gets link to the tickets
            let getTicketsBtn = $("<button>").addClass("ml-auto btn btn-light").append((`<a target="_blank" class = "text-decoration-none" href = ${results[i].url}>Get Tickets</a>`));
            $(eventRow).append(eventContent, eventVenue, getTicketsBtn);
            $(".event-container").append(eventRow);
        }
        let resultsDetails = $("<div>").addClass("row mt-3 result-details");
        $(".event-container").append(resultsDetails);

        if (results.length > currentPage * 10) {
            $(resultsDetails).html(`<p>Showing ${(currentPage * 10) - 9} - ${(currentPage * 10)} of ${results.length}</p>`)
        } else if (results.length < currentPage * 10) { $(resultsDetails).html(`<p>Showing ${(currentPage * 10 - 9)} - ${results.length} of ${results.length}</p>`) };

        //button to show more results
        let nextBtn = $("<button>").attr({
            type: 'submit',
            id: 'next-btn'
        })
            .html(`<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>`)
            .addClass("browse-buttons ml-auto rounded-circle btn btn-outline-primary")

        //button to show previous results
        let previousBtn = $("<button>")
            .attr({
                type: "submit",
                id: 'prev-btn'
            })
            .html(`<i class="fa fa-chevron-circle-left" aria-hidden="true"></i>`)
            .addClass("browse-buttons ml-auto rounded-circle btn btn-outline-primary");

        // these two if statements show next or previous buttons accordin to the number of results remaining

        if (currentPage > 1) {
            $(".result-details").append(previousBtn);
            $("#prev-btn").on("click", function (event) {
                event.preventDefault();
                currentPage--;
                showEvents(results, currentPage * 10 - 10, currentPage * 10);
            });
        }

        if (results.length > start + 10) {
            $(".result-details").append(nextBtn);
            $("#next-btn").on("click", function (event) {
                event.preventDefault();
                currentPage++;
                showEvents(results, currentPage * 10 - 10, currentPage * 10);
            });
        }

        $(".event-container").append(backToSearch);
        $(backToSearch).on("click", function scrollUp(){
            $("html, body").animate({
                scrollTop: "0"
            })
        })

    };

    //event listener for the search button
    $("#search-btn").on("click", function () {
        let searchEntry = $("#artist-search").val();
        artistSearch(searchEntry);
    });

    $("#artist-search").autocomplete({
        source: JSON.parse(localStorage.getItem('history'))
    });

    $("#artist-search").keypress(function (event) {
        if (event.keyCode === 13) {
            artistSearch($("#artist-search").val());
            searchForSong();
        }
    })
});



