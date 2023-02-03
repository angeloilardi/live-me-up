$.ajax({
    url: "https://rest.bandsintown.com/artists/coldplay/events?app_id=codingbootcamp",
    method: "GET"
}

).then(function (response) {
    console.log(response);
});

// $.ajax({
//     url: "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=iron%20maiden&type=video&videoEmbeddable=true&videoSyndicated=true&key=AIzaSyC6tz12qE2uvycQZzznGBNEfScpOSlCJAE",
//     method: "GET"
//   }).then(function (response) {
//     console.log(response);
//     console.log(response.items[0].id.videoId);
//     // $("body").html(`<iframe width="560" height="315" src="https:/www.youtube.com/embed/${response.items[0].id.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`)
//   })

// const video = $('#youtube-video')[0];
// function searchForVideo() {
//     const apiKey = 'AIzaSyC6tz12qE2uvycQZzznGBNEfScpOSlCJAE';
//     let searchQuery = $('#band-name').val(); // Hetting a value from the text input field
//     // To make this url friendly replacing spaces with + symbols
//     searchQuery = searchQuery.replace(' ', '+');
//     if (searchQuery.length == 0) {
//         return; // If no band name then stop
//     }
//     //videoSyndicated=true
//     //videoEmbeddable=true
//     //videoLicense=youtube
//     //videoLicense=creativeCommon (this seems to work)
//     $.ajax({
//         url: `https://youtube.googleapis.com/youtube/v3/search?type=video&q=${searchQuery}&key=${apiKey}`,
//         method: "GET"
//     }).then(function (response) {
//         // Adding video to website
//         const videoId = response.items[0].id.videoId;
//         openVideo(videoId);
//     });
// }
// function openVideo(videoId) {
//     video.width = 560;
//     video.height = 315;
//     video.src = `https://www.youtube-nocookie.com/embed/${videoId}?controls=0`;
// }
// function closeVideo() {
//     video.width = 0;
//     video.height = 0;
//     video.src = '';
// }


function searchForSong (){
    let searchQuery = $("#band-name").val();
    const settings = {
        
        "async": true,
        "crossDomain": true,
        "url": `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchQuery}`,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "19e961b6d4mshcb2069c12dfc362p11fe14jsn8dd0f5850428",
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        let player = $("<div>")
        
        let audio = $("<audio>").attr({
            src: response.data[0].preview,
            controls: "controls",
            autoplay: "autoplay",
            type: "audio/mpeg"
        });
        $(player).html(audio)
        $("body").prepend(player)
    });
}



function artistSearch (artist){
    $.ajax({
        url: `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`,
        method: "GET",
        //error 404 handling
        error: function (xhr, thrownError){
            $(".eventList").empty();
            if (xhr.status == 404) {
                $(".eventList").html(`<h3 class="mx-auto">Ermm, we couldn't find that. Wanna give it another try?</h3>`).addClass("row align-items-center")
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
        if (response.length === 0) {
            $(".eventList").html(`<h3 class="mx-auto">Sorry, no results for this artist :/</h3>`).addClass("row align-items-center");
            //calls function to display results
        } else { showEvents (response, 0)   
        }       
    })
}
    

function showEvents (response, counter) {
    $(".eventList").empty();
    let resultsHeading = $("<h4>").text(`UPCOMING EVENTS FOR ${response[0].artist.name}`).addClass("row mb-4");
    $(".eventList").append(resultsHeading);
    // for each event found
    for (let i = counter; i < response.length; i++){
        // gets the date and changes the format
        let date = moment((response[i].datetime), "YYYY-MM-DD").format("DD/MM/YYYY");
        // gets the city
        let city = response[i].venue.city;
        // gets the country
        let country = response[i].venue.country;
        // gets the name of the venue
        let venue = response[i].venue.name;
        //creates a row for the event
        let eventRow = $("<div>").addClass("row align-items-center");
        // builds the event text
        let eventContent = $("<h5>").text(`${date} - ${city} - ${country}`);
        // the venue name with a smaller font
        let eventVenue = $("<h6>").text(`${venue}`).addClass("p-2");
        // gets link to the tickets
        let getTicketsBtn = $("<button>").addClass("ml-auto").append((`<a target="_blank" href = ${response[i].url}>Get Tickets</a>`));
        //heading for event resulsts
         
        $(eventRow).append(eventContent, eventVenue, getTicketsBtn);
        $(".eventList").append(eventRow);
        
    }
}
artistSearch ("destroyer")