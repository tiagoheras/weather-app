import { API } from "./API";

const form = document.forms[0];
const temp = document.getElementById('temp');
const tempRange = document.getElementById('temp-range');
const description = document.getElementById('description');
const city = document.getElementById('city');
const hourly = document.getElementById('hourly');
const daily = document.getElementById('daily');

const toggleUnits = document.getElementById('toggle-units');
const toggleCheckbox = document.getElementById('toggle-checkbox');

const celsiusSpan = document.getElementById('celsius');
const farenheitSpan = document.getElementById('farenheit');

let weatherData;

function formatDescription(description) {
    const wordsArr = description.split(' ');

    const upperCaseArr = wordsArr.map(word => {
        const result = word.charAt(0).toUpperCase() + word.slice(1);
        return result;
    });

    return upperCaseArr.join(' ');
}

function setBackground() {

}

function displayData() {
    let unit = 'metric';

    if (toggleUnits.checked) {
        unit = 'imperial';
    }

    let data = weatherData[unit];

    temp.innerText = data.current.temp;
    tempRange.innerText = `${Math.round(data.daily[0].temp.min)}º - ${Math.round(data.daily[0].temp.max)}º`;
    description.innerText = formatDescription(data.current.weather[0].description);
    city.innerText = weatherData.city;

    hourly.innerHTML = '';
    data.hourly.forEach(hour => {
        const hourDiv = document.createElement('div');
        hourDiv.className = 'hour';
        hourDiv.innerHTML = `<p>${Math.round(hour.temp)}º</p><p>${hour.weather[0].main}</p>`
        hourly.appendChild(hourDiv);
    })


}

export default function loadContent() {

    navigator.geolocation.getCurrentPosition(async position => {
        const data = await API.getWeather(position.coords.latitude, position.coords.longitude);
        console.log(data);
        weatherData = data;
        displayData();
    })

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const { coords } = await API.getCoords(form.children[0].value);
        const data = await API.getWeather(coords.lat, coords.lon);
        weatherData = data;
        displayData();
    })

    toggleCheckbox.addEventListener('click', (e) => {
        e.preventDefault();
        toggleUnits.checked = !toggleUnits.checked;
        displayData();
    })
}
