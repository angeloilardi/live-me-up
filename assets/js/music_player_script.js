// Save references to DOM elements
const selectedArtist = $('#deezer-song')[0];
// Hetting a value from the text input field
let searchQueryInput = $('#song-name'); 

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
        // Variable that keeps the way to take music album of selected artist
        const albumPreview = response.data[0].album.id;
        // Call openPlayer function to play selected artist album
        openPlayer(albumPreview);
    });
}

// Function that open music player to play selected artist album
function openPlayer(albumPreview) {
    // Setting up player parameters
    selectedArtist.width = '300';
    selectedArtist.height = '360';
    selectedArtist.src = `https://widget.deezer.com/widget/dark/album/${albumPreview}?tracklist=false`
}

// Function that close the music player when press the button
function closePlayer() {
    selectedArtist.width = '0';
    selectedArtist.height = '0';
    selectedArtist.src = '';
}