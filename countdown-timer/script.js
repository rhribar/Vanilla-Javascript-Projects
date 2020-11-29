
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

const christmas = "25 Dec 2020"; // change this line for countdown to other date

function countdown() {
    const christmasDate = new Date(christmas);
    const currentDate = new Date();

    const totalSeconds = (christmasDate - currentDate) / 1000;

    const days = calculateDays(totalSeconds);
    const hours = calculateHours(totalSeconds);
    const minutes = calculateMinutes(totalSeconds);
    const seconds = calculateSeconds(totalSeconds);
    
    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(minutes);
    secondsEl.innerHTML = formatTime(seconds);

    console.log(days, hours, minutes, seconds);
}
// setting up an initial call
countdown();

/**
 * Displays zero besides an one digit time variable.
 * 
 * @param time 
 */
function formatTime(time) {
    return time < 10 ? (`0${time}`) : time;
}

setInterval(countdown, 1000);

/**
 * Calculates days based on seconds.
 * 
 * @param seconds 
 */
function calculateDays(seconds) {
    return Math.floor(seconds / 3600 / 24);
}

/**
 * Calculates hours based on seconds.
 * 
 * @param seconds 
 */
function calculateHours(seconds) {
    return Math.floor(seconds / 3600) % 24;
}

/**
 * Calculates minutes based on seconds.
 * 
 * @param seconds 
 */
function calculateMinutes (seconds) {
    return Math.floor(seconds / 60) % 60;
}

/**
 * Calculates rounded seconds.
 * 
 * @param seconds 
 */
function calculateSeconds (seconds) {
    return Math.floor(seconds % 60);
}