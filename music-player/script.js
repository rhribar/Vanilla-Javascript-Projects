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
const timeControl = document.getElementsByClassName("time-control");
const timer = document.getElementById("timer");
const slider = document.getElementById("slider");
const plus = document.getElementById("plus");
const libraryDiv = document.getElementById("libraryDiv");
const listLU = document.getElementById("listLU");

var globalAudioEl;

const url = (search) => 
    `https://api.deezer.com/search?q=${search}`;

/**
 * Fetch data from Deezer API based on query.
 * @param {text} query 
 */
async function getQueryData(query) {
    pausePreviousMusic();

    const response = await fetch(url(query), {origin: "cors"});
    const responseData = await response.json();
    //console.log(responseData);
    image.style.animationPlayState = "paused";

    init(responseData);
}

/**
 * Pauses previous music.
 *  
 */
function pausePreviousMusic() {
    if(checkIfPromiseIsFullfilled()) {
        globalAudioEl.pause();
    }
}

/**
 * Initialize track.
 * @param {object} data 
 */
function init(data) {
    getSound(data);
    let image = getAlbumImage(data);
    displayAlbumImage(image);
    let songName = getSongName(data);
    displaySongName(songName);
    let artistName = getArtistName(data);
    displayArtistName(artistName);
    
}

/**
 * Get the sound from the API.
 * @param {object} data 
 */
function getSound(data) {
    let sound = data.data[0].preview;
    let audio = new Audio(sound);
    
    // I used scope properties of "var" keyword to know which audio is currently playing
    globalAudioEl = audio;
    return audio;
}

/**
 * Get album image from API.
 * @param {object} data 
 */
function getAlbumImage(data) {
    let albumImage = data.data[0].album.cover_big;
    return albumImage;
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
    return albumImage;
}

/**
 * Get song name.
 * @param {object} data 
 */
function getSongName(data) {
    let songName = data.data[0].title_short;
    return songName;
}

/**
 * Display song name.
 * @param {text} name 
 */
function displaySongName(name) {
    title.innerHTML = `${name}`;
}

/**
 * Get artist name.
 * @param {object} data 
 */
function getArtistName(data) {
    let artistName = data.data[0].artist.name;
    return artistName;
}

/**
 * Display the name of the artist.
 * @param {text} artistName
 */
function displayArtistName(artistName) {
    name.innerHTML = `${artistName}`; //name is the element
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
        play.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause" class="svg-inline--fa fa-pause fa-w-14 fa-2x play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path></svg>';
        image.style.animationPlayState = "running";
    } else {
        audio.pause();
        play.innerHTML = '<svg id="play" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" class="svg-inline--fa fa-play fa-w-14 fa play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>';
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
        mute.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-mute" class="svg-inline--fa fa-volume-mute fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-general-link"/><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-custom-link"/><style xmlns="" lang="en" type="text/css" id="dark-mode-custom-style"/><path fill="currentColor" d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z"/></svg>'
    } else {
        audio.muted = false;
        mute.innerHTML = '<svg id="mute" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-down" class="svg-inline--fa fa-volume-down fa-w-12 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M215.03 72.04L126.06 161H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V89.02c0-21.47-25.96-31.98-40.97-16.98zm123.2 108.08c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 229.28 336 242.62 336 257c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.87z"></path></svg>'
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

/**
 * Format the time - no music preview is longer than a minute.
 */
function formatTime(time) {
    if(time < 10) {
        return `0:0${time}`
    } else {
        return `0:${time}`;
    }
}

/**
 * Display the time - no music preview is longer than a minute.
 */
function displayTime() {
    if(checkIfPromiseIsFullfilled()) {
        let time = globalAudioEl.currentTime;
        time = time.toFixed();
        time = formatTime(time);
        timer.innerHTML = `${time}`;
        onEndSong();
    }
}

/**
 * What happens on end song.
 */
function onEndSong() {
    if(globalAudioEl.currentTime == globalAudioEl.duration) {
        image.style.animationPlayState = "paused";
        play.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause" class="svg-inline--fa fa-pause fa-w-14 fa-2x play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path></svg>';
    }
}

setInterval(displayTime, 1000);

/**
 * Check if the promise was fullfilled.
 */
function checkIfPromiseIsFullfilled() {
    if(globalAudioEl !== undefined) {
        return globalAudioEl;
    }
}

/**
 * Add song to library.
 */
function addSongToLibrary() {
    let songEl = document.createElement("li");
    if (!search.value) {
        search.value = "Beaver Creek";
    }
    songEl.innerText = search.value;
    listLU.appendChild(songEl);
    playLibrarySong(songEl)
    //console.log(search.value);
}

/**
 * Event handler when user presses on plus sign.
 */
plus.addEventListener('click', () => {
    addSongToLibrary();
});

/**
 * Event handler when user presses library element.
 */
function playLibrarySong(song) {
    song.addEventListener('click', () => {
        console.log(song.innerText);
        getQueryData(song.innerText);
    });
}