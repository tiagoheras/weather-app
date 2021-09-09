const API_KEY = 'a94b98782a4ef17d021ef8a83abc3b4f';

export const API = {
    async getCoords(location) {
        try {
            const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`)
            const jsonWeather = await weather.json();
            return { coords: jsonWeather.coord };
        } catch (err) {
            console.error(err);
        }
    },
    async getWeather(lat, lon) {
        try {

            const city = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
                .then(response => response.json())
                .then(jsonResponse => jsonResponse.name);

            const metricWeather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${API_KEY}`);
            const imperialWeather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely&appid=${API_KEY}`);

            const jsonWeathers = await Promise.all([metricWeather.json(), imperialWeather.json()]);

            return {metric: jsonWeathers[0], imperial: jsonWeathers[1], city};
        } catch (err) {
            console.error(err);
        }
    },
}
