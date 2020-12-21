//"use strict";

const search = document.getElementById("search-input");
const form = document.getElementById("form");
const image = document.getElementById("img_album");
const title = document.getElementById("title");
const name = document.getElementById("name");
const play = document.getElementById("play");
const mute = document.getElementById("mute");
const goBack = document.getElementById("goBack");
const goForward = document.getElementById("goForward");
const animationDiv = document.getElementsByClassName("rotateSong");

var globalAudioEl;

const url = (search) => 
    `https://api.deezer.com/search?q=${search}`;


/**
 * Fetch data from Deezer API based on query.
 * @param {text} query 
 */
async function getQueryData(query) {
    if(globalAudioEl !== undefined) {
        globalAudioEl.pause();
    }
    const response = await fetch(url(query), {origin: "cors"});
    const responseData = await response.json();
    //console.log(responseData);
    
    image.style.animationPlayState = "paused";

    init(responseData);
}

/**
 * Initialize track.
 * @param {object} data 
 */
function init(data) {
    getSound(data);
    getAlbumImage(data);
    getSongName(data);
    getArtistName(data)
}

/**
 * Get the sound from the API.
 * @param {object} data 
 */
function getSound(data) {
    let sound = data.data[0].preview;
    let audio = new Audio(sound);
    
    // I used this to know which audio is currently playing
    globalAudioEl = audio;
}

/**
 * Get album image from API.
 * @param {object} data 
 */
function getAlbumImage(data) {
    let albumImage = data.data[0].album.cover_big;
    displayAlbumImage(albumImage);
}

/**
 * Display album image.
 * @param {object} data 
 */
function displayAlbumImage(imageURL) {
    let albumImage = new Image();
    albumImage.src = imageURL;

    // replace image
    image.innerHTML = "";
    image.appendChild(albumImage);
}

/**
 * Get song name.
 * @param {object} data 
 */
function getSongName(data) {
    let songName = data.data[0].title_short;
    displaySongName(songName);
}

/**
 * Display song name.
 * @param {text} name 
 */
function displaySongName(name) {
    title.innerHTML = `
    ${name}
    `
}

/**
 * Get artist name.
 * @param {object} data 
 */
function getArtistName(data) {
    let artistName = data.data[0].artist.name;
    displayArtistName(artistName);
}

/**
 * Display the name of the artist.
 * @param {text} artistName
 */
function displayArtistName(artistName) {
    name.innerHTML = `
    ${artistName}
    `
}

getQueryData("Beaver Creek");

/**
 * Event handler: Perform query on submiting the form.
 */
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const music = search.value;

    if(music) {
        getQueryData(music);
    }
});

/**
 * Event handler: Perform pause and play on click.
 */
play.addEventListener('click', () => {
    let audio = globalAudioEl;

    if(audio.paused){
        audio.play();
        play.innerHTML = "Pause";
        image.style.animationPlayState = "running";
    } else {
        audio.pause();
        play.innerHTML = "Play";
        image.style.animationPlayState = "paused";
    }
});

/**
 * Event handler: Perform mute/unmute on click.
 */
mute.addEventListener('click', () => {
    
    let audio = globalAudioEl;

    if(!audio.muted) {
        audio.muted = true;
    } else {
        audio.muted = false;
    }
});

/**
 * Event handler: Go back seconds after click.
 */
goBack.addEventListener('click', () => {

    globalAudioEl.currentTime -= 5;

});

/**
 * Event handler: Go forward seconds after click.
 */
goForward.addEventListener('click', () => {

    globalAudioEl.currentTime += 5;

});





