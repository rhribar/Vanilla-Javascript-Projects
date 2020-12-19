"use strict";

const API_KEY = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

/**
 * Arrow function structuring API GET call.
 * @param {text} city 
 */
const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

/**
 * Asynchronous function which accepts input location and fetches "weather" from API.
 * @param {text} city 
 */
async function getWeatherByLocation(city) {
    const response = await fetch(url(city), { origin: "cors" });
    const responseData = await response.json();
    throwAlert(responseData.main);
    // console.log(responseData, kelvinToCelsius(responseData.main.temp));
    //console.log(typeof responseData)
    addWeatherToPage(responseData);
}

/**
 * Function converting degrees Kelvin to degrees Celsius.
 * @param {number} degreesKelvin 
 */
function kelvinToCelsius(degreesKelvin) {
    return Math.round(degreesKelvin - 273.15);
}

/**
 * Displaying the queries on page.
 * @param {object} data 
 */
function addWeatherToPage(data) {
    
    const temp = kelvinToCelsius(data.main.temp);
    
    const weather = document.createElement("div");
    weather.classList.add('weather');

    weather.innerHTML = 
        `
        <h2>${temp} °C in ${search.value} <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
        `
        // <small>in ${search.value}<small>
    ;
    
    // For cleaning up the past querys.
    main.innerHTML = '';

    main.appendChild(weather);
}

/**
 * An event listener for submit button which prompts the query.
 * @param {number} degreesKelvin 
 */
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = search.value;

    if(location) {
        getWeatherByLocation(location);
    }
});

/**
 * Checking for valid user input.
 * @param {object} data_temp
 */
function throwAlert(data) {
    if(data === undefined) {
        alert("Hey, we currently do not have information for this location.\nPlease try again. :D");
    }
}

//getWeatherByLocation('Kamnik');