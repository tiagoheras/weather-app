/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/API.js":
/*!*******************************!*\
  !*** ./src/components/API.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"API\": () => (/* binding */ API)\n/* harmony export */ });\nconst API_KEY = 'a94b98782a4ef17d021ef8a83abc3b4f';\r\n\r\nconst API = {\r\n    async getCoords(location) {\r\n        try {\r\n            const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`)\r\n            const jsonWeather = await weather.json();\r\n            return { coords: jsonWeather.coord };\r\n        } catch (err) {\r\n            console.error(err);\r\n        }\r\n    },\r\n    async getWeather(lat, lon) {\r\n        try {\r\n\r\n            const city = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)\r\n                .then(response => response.json())\r\n                .then(jsonResponse => jsonResponse.name);\r\n\r\n            const metricWeather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${API_KEY}`);\r\n            const imperialWeather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely&appid=${API_KEY}`);\r\n\r\n            const jsonWeathers = await Promise.all([metricWeather.json(), imperialWeather.json()]);\r\n\r\n            return {metric: jsonWeathers[0], imperial: jsonWeathers[1], city};\r\n        } catch (err) {\r\n            console.error(err);\r\n        }\r\n    },\r\n}\r\n\n\n//# sourceURL=webpack://weather-app/./src/components/API.js?");

/***/ }),

/***/ "./src/components/UI.js":
/*!******************************!*\
  !*** ./src/components/UI.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ loadContent)\n/* harmony export */ });\n/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./API */ \"./src/components/API.js\");\n\r\n\r\nconst form = document.forms[0];\r\nconst temp = document.getElementById('temp');\r\nconst tempRange = document.getElementById('temp-range');\r\nconst description = document.getElementById('description');\r\nconst city = document.getElementById('city');\r\nconst hourly = document.getElementById('hourly');\r\nconst daily = document.getElementById('daily');\r\n\r\nconst toggleUnits = document.getElementById('toggle-units');\r\nconst toggleCheckbox = document.getElementById('toggle-checkbox');\r\n\r\nconst celsiusSpan = document.getElementById('celsius');\r\nconst farenheitSpan = document.getElementById('farenheit');\r\n\r\nlet weatherData;\r\n\r\nfunction formatDescription(description) {\r\n    const wordsArr = description.split(' ');\r\n\r\n    const upperCaseArr = wordsArr.map(word => {\r\n        const result = word.charAt(0).toUpperCase() + word.slice(1);\r\n        return result;\r\n    });\r\n\r\n    return upperCaseArr.join(' ');\r\n}\r\n\r\nfunction setBackground() {\r\n\r\n}\r\n\r\nfunction displayData() {\r\n    let unit = 'metric';\r\n\r\n    if (toggleUnits.checked) {\r\n        unit = 'imperial';\r\n    }\r\n\r\n    let data = weatherData[unit];\r\n\r\n    temp.innerText = Math.round(data.current.temp) + 'º';\r\n    tempRange.innerText = `${Math.round(data.daily[0].temp.min)}º - ${Math.round(data.daily[0].temp.max)}º`;\r\n    description.innerText = formatDescription(data.current.weather[0].description);\r\n    city.innerText = weatherData.city;\r\n\r\n    hourly.innerHTML = '';\r\n    data.hourly.forEach(hour => {\r\n        const hourDiv = document.createElement('div');\r\n        hourDiv.className = 'hour';\r\n        hourDiv.innerHTML = `<p>${hour.weather[0].main}</p><p>${Math.round(hour.temp)}º</p><img src=\"../../Frame 1.svg\"/>`\r\n        hourly.appendChild(hourDiv);\r\n    })\r\n\r\n    daily.innerText = '';\r\n\r\n    data.daily.forEach(day => {\r\n        const dayDiv = document.createElement('div');\r\n        dayDiv.className = 'day';\r\n        dayDiv.innerHTML = `<p>${day.weather[0].main}</p><p>${Math.round(day.temp.min)}º-${Math.round(day.temp.max)}º</p><img src=\"../../Frame 1.svg\"/>`\r\n        daily.appendChild(dayDiv);\r\n    })\r\n\r\n}\r\n\r\nfunction loadContent() {\r\n\r\n    navigator.geolocation.getCurrentPosition(async position => {\r\n        const data = await _API__WEBPACK_IMPORTED_MODULE_0__.API.getWeather(position.coords.latitude, position.coords.longitude);\r\n        console.log(data);\r\n        weatherData = data;\r\n        displayData();\r\n    })\r\n\r\n    form.addEventListener('submit', async (e) => {\r\n        e.preventDefault();\r\n        const { coords } = await _API__WEBPACK_IMPORTED_MODULE_0__.API.getCoords(form.children[0].value);\r\n        const data = await _API__WEBPACK_IMPORTED_MODULE_0__.API.getWeather(coords.lat, coords.lon);\r\n        weatherData = data;\r\n        displayData();\r\n    })\r\n\r\n    toggleCheckbox.addEventListener('click', (e) => {\r\n        e.preventDefault();\r\n        toggleUnits.checked = !toggleUnits.checked;\r\n        displayData();\r\n    })\r\n}\r\n\n\n//# sourceURL=webpack://weather-app/./src/components/UI.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/UI */ \"./src/components/UI.js\");\n\r\n\r\n(0,_components_UI__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;