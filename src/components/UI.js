import { API } from "./API";
import * as Icons from '../../icons.json';

const form = document.forms[0];
const temp = document.getElementById('temp');
const tempRange = document.getElementById('temp-range');
const description = document.getElementById('description');
const city = document.getElementById('city');
const hourly = document.getElementById('hourly');
const daily = document.getElementById('daily');
const main = document.getElementById('main');
const moreInfo = document.querySelectorAll('p[class="info"]');

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

async function setBackground(data) {
    try {
        let gif;
        if (data.current.weather[0].main === 'Clear') {
            gif = await fetch("https://api.giphy.com/v1/gifs?api_key=HnHhNyWMc7PBnflGNPlbNBPbvQtuNS1B&ids=uOuiK4F5zZkZ2");
        } else if (data.current.weather[0].main === 'Clouds') {
            gif = await fetch("https://api.giphy.com/v1/gifs?api_key=HnHhNyWMc7PBnflGNPlbNBPbvQtuNS1B&ids=VIEb9thuxuGcSzqHmb");

        } else if (data.current.weather[0].main === 'Rain') {
            gif = await fetch("https://api.giphy.com/v1/gifs?api_key=HnHhNyWMc7PBnflGNPlbNBPbvQtuNS1B&ids=t7Qb8655Z1VfBGr5XB");

        }
        const jsongif = await gif.json();
        main.style.backgroundImage = `url(${jsongif.data[0].images.original.url})`;
    } catch (err) {
        console.error(err)
    }
}

function chooseIcon(weather, dark) {
    if (dark === true) {
        if (weather === 'Clouds') {
            return Icons["cloudy-night"];
        } else if (weather === 'Clear') {
            return Icons.moon;
        }
    }
    if (weather === 'Clouds') {
        return Icons.clouds;
    } else if (weather === 'Clear') {
        return Icons.clear
    } else if (weather === 'Rain') {
        return Icons.rain;
    }
}

function createHours(data) {
    data.hourly.forEach((hour, index) => {
        if (index >= 12) null;
        else {
            const today = new Date();
            const time = new Date(today.setHours(today.getHours() + index + 1));
            const hourDiv = document.createElement('div');
            hourDiv.className = 'hour';
            hourDiv.innerHTML = `<p>${time.getHours()}:00</p>${time > new Date(data.current.sunset * 1000) ? chooseIcon(hour.weather[0].main, true) : chooseIcon(hour.weather[0].main, false)}<p>${Math.round(hour.temp)}º</p>`;
            hourly.appendChild(hourDiv);
        }
    });
}

function createDays(data) {
    data.daily.forEach((day, index) => {
        if (index >= 7) null;
        else {
            const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const today = new Date();

            // Create different weekdays based on index and using today as reference
            const weekDay = new Date(today.setDate(today.getDate() + index + 1));
            const weekDayArray = weekDay.toDateString().split(' ');

            //Remove day abbreviation
            weekDayArray.shift();

            //Remove year
            weekDayArray.pop();

            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            dayDiv.innerHTML = `<p>${weekDays[weekDay.getDay()]}, ${weekDayArray.join(' ')}</p>${chooseIcon(day.weather[0].main)}<p>${Math.round(day.temp.min)}º-${Math.round(day.temp.max)}º</p>`
            daily.appendChild(dayDiv);
        }
    })
}

function displayData() {
    let unit = 'metric';
    let degSymbol = ' ºC';
    let speedSymbol = ' kmh';

    if (toggleUnits.checked) {
        unit = 'imperial';
        degSymbol = ' ºF';
        speedSymbol = ' mph';
    }

    let data = weatherData[unit];

    console.log(data.current.sunset);

    if (Date.now() > new Date(data.current.sunset * 1000)) {
        document.body.className = 'dark';
    }

    temp.innerText = Math.round(data.current.temp) + degSymbol;
    tempRange.innerText = `${Math.round(data.daily[0].temp.min)}º - ${Math.round(data.daily[0].temp.max)}º`;
    description.innerText = formatDescription(data.current.weather[0].description);
    city.innerText = weatherData.city;

    moreInfo.forEach(infoDiv => {
        const info = Math.round(data.current[infoDiv.id]);
        if (infoDiv.id === 'sunrise' || infoDiv.id === 'sunset') {
            const sunMove = new Date((data.current[infoDiv.id] + data.timezone_offset) * 1000);
            infoDiv.innerText = `${sunMove.getUTCHours()}:${sunMove.getMinutes()}`;
        } else if (infoDiv.id === 'humidity') {
            infoDiv.innerText = info + '%';
        } else if (infoDiv.id === 'wind_speed') {
            infoDiv.innerText = info + speedSymbol;
            infoDiv.previousElementSibling.style.transform = `rotate(${data.current.wind_deg}deg)`;
        } else if (infoDiv.id === 'feels_like') {
            infoDiv.innerText = info + degSymbol;
        } else {
            infoDiv.innerText = info;
        }
    })

    hourly.innerHTML = '';
    createHours(data);

    daily.innerText = '';
    createDays(data);

    setBackground(data);

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
        console.log(data);
        displayData();
    })

    toggleCheckbox.addEventListener('click', (e) => {
        e.preventDefault();
        toggleUnits.checked = !toggleUnits.checked;
        displayData();
    })
}
