"use strict";

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

let globalAudioEl;

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
    
    image.style.animationPlayState = "paused";

    init(responseData);
}

getQueryData("Beaver Creek");

/**
 * Pauses previous music.
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
    let audio = getSound(data);
    updateTime(audio);

    let image = getAlbumImage(data);
    displayAlbumImage(image);

    let songName = getSongName(data);
    displaySongName(songName);

    let artistName = getArtistName(data);
    displayArtistName(artistName);

    initSlider();
}


/**
 * Get the sound from the API.
 * @param {object} data 
 */
function getSound(data) {
    let sound = data.data[0].preview;
    let audio = new Audio(sound);
    
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

form.addEventListener('submit', (e) => {handleSubmit(e)});
play.addEventListener('click', () => {handlePlayBtn(globalAudioEl)});
mute.addEventListener('click', () => {handleMuteBtn(globalAudioEl)});
goBack.addEventListener('click', () => {handleBackward(globalAudioEl)});
goForward.addEventListener('click', () => {handleForward(globalAudioEl)});
plus.addEventListener('click', () => {addSongToLibrary()});

/**
 * Handle submitting of the form.
 */
function handleSubmit(e) {
    e.preventDefault();
    const music = search.value;
    if(music) {
        getQueryData(music);
    }
}


/**
 * Handle pause and play.
 */
function handlePlayBtn(audio) {
    if(audio.paused){
        audio.play();
        play.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause" class="svg-inline--fa fa-pause fa-w-14 fa-2x play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path></svg>';
        image.style.animationPlayState = "running";
    } else {
        audio.pause();
        play.innerHTML = '<svg id="play" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" class="svg-inline--fa fa-play fa-w-14 fa play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>';
        image.style.animationPlayState = "paused";
    }
}

/**
 * Handle mute/unmute.
 */
function handleMuteBtn(audio) {
    if(!audio.muted) {
        audio.muted = true;
        mute.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-mute" class="svg-inline--fa fa-volume-mute fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-general-link"/><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-custom-link"/><style xmlns="" lang="en" type="text/css" id="dark-mode-custom-style"/><path fill="currentColor" d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z"/></svg>'
    } else {
        audio.muted = false;
        mute.innerHTML = '<svg id="mute" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-down" class="svg-inline--fa fa-volume-down fa-w-12 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M215.03 72.04L126.06 161H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V89.02c0-21.47-25.96-31.98-40.97-16.98zm123.2 108.08c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 229.28 336 242.62 336 257c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.87z"></path></svg>'
    }
}

/**
 * Handles moving backward.
 */
function handleBackward(audio) {
    audio.currentTime -= 5;
}

/**
 * Handles moving forward.
 */
function handleForward(audio) {
    audio.currentTime += 5;
}

/**
 * Format the time - no music preview is longer than a minute.
 */
function formatTime(time) {
    return time < 10 ? `0:0${time}` : `0:${time}`;
}

/**
 * Handle end of song.
 */
function onEndSong() {
    /* console.log(globalAudioEl.currentTime, globalAudioEl.duration); */
    if(globalAudioEl.currentTime == globalAudioEl.duration) {
        image.style.animationPlayState = "paused";
        play.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause" class="svg-inline--fa fa-pause fa-w-14 fa-2x play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path></svg>';
    }
}

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
    search.value = "";
}

/**
 * Event handler when user presses library element.
 */
function playLibrarySong(song) {
    song.addEventListener('click', () => {getQueryData(song.innerText)});
}


/**
 * Display the time - no music preview is longer than a minute.
 */
 function updateTime(audio) {
    audio.addEventListener('timeupdate', () => {
        let currentTime = Math.floor(audio.currentTime);
        const duration = Math.floor(audio.duration);
        
        updateSlider(duration, currentTime);

        onEndSong();

        currentTime = formatTime(currentTime);    
        timer.innerHTML = `${currentTime}`;
    });
}

function updateSlider(duration, currentTime) {
    let step = calculateSliderStep(duration, currentTime);

    updateSliderHandle(step);
    updateSliderPath(step);
}

function updateSliderPath(step) {
    let activepath = document.getElementsByClassName("activepath")[0];

    activepath.setAttributeNS(null, "width", step + HANDLER_RADIUS * 2);
}

function updateSliderHandle(step) {
    let handle = document.getElementsByClassName("handle")[0];

    handle.setAttributeNS(null, "cx", step);
}

function calculateSliderStep(duration, currentTime) {
    let step = (SLIDER_WIDTH - HANDLER_RADIUS * 2) / duration * currentTime;

    return step;
}

let container = document.getElementById("slider");
const SLIDER_WIDTH = 300;
const STROKE_WIDTH = 5;
const HANDLER_RADIUS = (STROKE_WIDTH / 2) + 2;

function initSlider() {

    checkRootSVG(container);
    
    let svg = document.getElementsByClassName("sliderSVG")[0];
    console.log(2);

    let checkHandleEl = document.getElementsByClassName("handle")[0];

    if(checkHandleEl === null || checkHandleEl === undefined) {
        let path = drawPath();
        svg.appendChild(path);

        let activePath = drawActivePath();
        svg.appendChild(activePath);

        let handle = drawHandle();
        svg.appendChild(handle);
    }
    
    initSliderEventHandlers();
}

const SVG_NS = "http://www.w3.org/2000/svg";

function checkRootSVG(container) {
    let svg = document.getElementsByClassName("sliderSVG")[0];

    console.log(svg);
    console.log(1);

    if (svg === null || svg === undefined) {
        svg = createRootSVG();
        container.appendChild(svg);
    }
}

function checkHandle(container) {
    let handle = document.getElementsByClassName("handle")[0];

    /* console.log(svg);
    console.log(1);
 */
    if (svg === null || svg === undefined) {
        svg = createRootSVG();
        container.appendChild(svg);
    }
}

function createRootSVG() {
    const svg = document.createElementNS(SVG_NS, "svg");

    svg.setAttributeNS(null, "class", "sliderSVG");
    svg.setAttributeNS(null, "width", SLIDER_WIDTH);
    svg.setAttributeNS(null, "height", 40);
    svg.setAttributeNS(null, "style", "background-color:none");
    svg.setAttributeNS(null, "viewBox", `0 ${-HANDLER_RADIUS * 2} ${SLIDER_WIDTH} 50`);

    return svg;
}

function createCircleSVG(cx, cy, r, fill) {
    const circle = document.createElementNS(SVG_NS, "circle");

    circle.setAttributeNS(null, 'cx', cx);
    circle.setAttributeNS(null, 'cy', cy);
    circle.setAttributeNS(null, 'r', r);
    circle.setAttributeNS(null, "fill", fill);

    return circle;
}

function drawPath() {
    const path = document.createElementNS(SVG_NS, "rect");

    path.setAttributeNS(null, 'x', -HANDLER_RADIUS);
    path.setAttributeNS(null, 'y', -HANDLER_RADIUS);
    path.setAttributeNS(null, 'width', SLIDER_WIDTH);
    path.setAttributeNS(null, "height", HANDLER_RADIUS * 2);
    path.setAttributeNS(null, "fill", "#e0e0e0");
    path.setAttributeNS(null, "rx", HANDLER_RADIUS);

    return path;
}

function drawHandle() {
    const handle = createCircleSVG(0, 0, HANDLER_RADIUS * 1.5, "#646464");

    handle.setAttributeNS(null, 'class', 'handle');

    return handle;
}

let isDragging = false;

function initSliderEventHandlers() {
    window.addEventListener("mousemove", e => { onDrag(e); });
    window.addEventListener("mouseup", e => { endDrag(e); });
    window.addEventListener("mouseleave", e => endDrag(e));

    window.addEventListener("touchmove", e => {handleTouch(e); });
    window.addEventListener("touchcancel", e => handleTouch(e));
    window.addEventListener("touchend", e => handleTouch(e));

    container.addEventListener("mousedown", (e)=> startDrag(e));
}

function startDrag(e) {
    e.preventDefault();
    handleClick(e);
    isDragging = true;
}

function onDrag(e) {
    e.preventDefault();
    if(isDragging) { handleClick(e); }
}

function endDrag(e) {
    e.preventDefault();
    if(isDragging) { isDragging = false; }
}

function screenToSVG(e) {
    e.preventDefault();
    
    let svg = document.getElementsByClassName("sliderSVG")[0];

    let svgPoint = svg.createSVGPoint();
    [svgPoint.x, svgPoint.y] = [e.clientX, e.clientY];
    let transform = svgPoint.matrixTransform(svg.getScreenCTM().inverse());

    return {
        x: transform.x,
        y: transform.y
    }
}

function handleClick(e) {
    let coord = screenToSVG(e);
    coord.x = canMove(coord.x);

    setTrackTimeOnClick(coord.x);
    updateSliderHandle(coord.x)
}

function setTrackTimeOnClick(x) {
    globalAudioEl.currentTime = x / (SLIDER_WIDTH - HANDLER_RADIUS * 2) * globalAudioEl.duration;
}

function canMove(x) {
    return x < 0 ? x = 0 : x = x;
}

function drawActivePath() {
    const path = document.createElementNS(SVG_NS, "rect");

    path.setAttributeNS(null, 'x', -HANDLER_RADIUS);
    path.setAttributeNS(null, 'y', -HANDLER_RADIUS);
    path.setAttributeNS(null, 'width', 0);
    path.setAttributeNS(null, "height", HANDLER_RADIUS * 2);
    path.setAttributeNS(null, "fill", "#32CD32");
    path.setAttributeNS(null, "rx", HANDLER_RADIUS);
    path.setAttributeNS(null, 'class', 'activepath');

    return path;
}


// simulate mouse events
function handleTouch(e) {
    const touches = e.changedTouches;

    // Ignore multi-touch
    if (touches.length > 1) return;

    const touch = touches[0];
    const events = ["touchstart", "touchmove", "touchend", "touchcancel"];
    const mouseEvents = ["mousedown", "mousemove", "mouseup", "mouseleave"];
    const ev = events.indexOf(e.type);

    if (ev === -1) return;

    const type = e.type === events[2] && lastTouchType === events[0] ? 'click' : mouseEvents[ev];
    const simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
        touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);

    touch.target.dispatchEvent(simulatedEvent);
    e.preventDefault();
    lastTouchType = e.type;
};