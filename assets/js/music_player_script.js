// Save references to DOM elements
const musicPlayer = $('.deezer-player');
const artistImg = $('.artist-picture');
const musicContainer = $('.music-container');
// Hetting a value from the text input field
let searchQueryInput = $('#artist-search');

// The searchForSong function takes a music, searches the Deezer API for it, 
// and then passes the data to open music player
function searchForSong() {
    // To make this url friendly replacing spaces with "+" symbols
    searchQuery = searchQueryInput.val().replace(" ", "+");

    // If no band name then stop
    if (searchQuery.length == 0) {
        return;
    }

    // Variable that contains parameters to take data from Deezer API
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchQuery}`,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "716bcda1abmsh8b4deea09171930p1b9e62jsn48f9207d0b91",
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
        }
    }

    // API call to take the data from deezer server
    $.ajax(settings).done(function (response) {
        if (!response.data || response.data.length <= 0) {
            musicContainer.html('<h3 class="mx-auto">Sorry, no results for this artist :/</h3>');
            // If no data returned from deezer then end this function
            return;
        }

        // Variable that keeps the way to take music album of selected artist
        const albumPreview = response.data[0].album.id;
        // Keeps the way to take artist picture from the Deezer
        const artistPictureDeezer = response.data[0].artist.picture_medium;

        // Remove old iframe element and picture before adding new one
        artistImg.empty();
        musicPlayer.empty();
        // Call openPlayer function to play selected artist album
        openPlayer(albumPreview);
        // Adding artist picture from Deezer
        displayArtistPicture(artistPictureDeezer);
    });
}

// Function that open music player to play selected artist album
function openPlayer(albumPreview) {
    // Setting up player parameters
    const url = `https://widget.deezer.com/widget/dark/album/${albumPreview}?tracklist=false`;
    musicPlayer.append(`<iframe title="deezer-widget" src="${url}" width="100%" height="250" frameborder="0" allowtransparency="true" allow="encrypted-media; clipboard-write"></iframe>`);
}

// Adding selected artist' picture on the page
function displayArtistPicture(artistPictureDeezer) {
    artistImg.append(`<img class="picture rounded" src="${artistPictureDeezer}"> </img>`);
}

$("#search-btn").on("click", searchForSong)