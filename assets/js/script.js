function artistSearch (){
    $.ajax({
        url: `https://rest.bandsintown.com/artists/beyonce/events?app_id=codingbootcamp`,
        method: "GET"
    }
    
    ).then(function (response) {
        console.log(response);
        let numOfEvents = response.length;
        console.log(numOfEvents);
        let currentlyDisplayed = 0
        if (numOfEvents === 0) {
            return //add content for no results found
        } else { showEvents (response, 0)   
        }
    //     if (numOfEvents > 10){
    // let showMoreButton = $("<button>").text("Show more")
    
    //     }
        
    });
}
    

function showEvents (response, counter) {
    for (let i = counter; i < response.length; i++){
        let date = response[i].datetime;
        let rightDate = moment(date, "YYYY-MM-DD").format("DD/MM/YYYY")
        let city = response[i].venue.city;
        let country = response[i].venue.country;
        let venue = response[i].venue.name;
        let eventRow = $("<div>").addClass("row align-items-center")
        let eventContent = $("<h5>").text(`${rightDate} - ${city} - ${country}`);
        eventContent.addClass()
        let eventVenue = $("<h6>").text(`${venue}`).addClass("p-2");
        let getTicketsBtn = $("<button>").addClass("ml-auto").append((`<a target="_blank" href = ${response[i].url}>Get Tickets</a>`))
        $(eventRow).append(eventContent, eventVenue, getTicketsBtn)
        $(".eventList").append(eventRow);
        
    }
}

artistSearch()