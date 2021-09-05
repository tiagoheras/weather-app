const API_KEY = 'a94b98782a4ef17d021ef8a83abc3b4f';

export const API = {
    async getCoords(location) {
        const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`)
        const jsonWeather = await weather.json();
        return {coords: jsonWeather.coord, city: jsonWeather.name};
    },
    async getWeather(lat, lon, unit = 'metric') {
        const weather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`)
        const jsonWeather = await weather.json();
        return jsonWeather;
    },
}
