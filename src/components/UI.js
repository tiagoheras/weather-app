import { API } from "./API";

const form = document.forms[0];
const temp = document.getElementById('temp');
const city = document.getElementById('city');

function displayData(data) {
    let unit;
    if (data.unit === 'metric') {
        unit = 'C';
    } else {
        unit = 'F';
    }
    temp.innerText = data.current.temp + ' ' + 'º' + unit;
    city.innerText = data.city;
}

export default function loadContent() {
    navigator.geolocation.getCurrentPosition(async position => {
        const data = await API.getWeather(position.coords.latitude, position.coords.longitude);
        console.log(data);
    })

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const radio = document.querySelector('input[name="unit"]:checked');

        const {coords, city} = await API.getCoords(form.children[0].value);
        const data = await API.getWeather(coords.lat, coords.lon, radio.value);

        data.city = city;
        data.unit = radio.value;
        displayData(data);
    })
}
