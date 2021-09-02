//***Date

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let currentDate = document.querySelector("h2.date");
currentDate.innerHTML = `${day}, ${hour}:${minute}`;

//***Form
function citySearched(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchCity");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  searchCity(searchInput.value);
}

function searchCity(city) {
  let apiKey = "5b7438cdfc6f92bfe624b6f60dd02829";
  let units = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let cityForm = document.querySelector("form");
cityForm.addEventListener("submit", citySearched);

//*** Weather API

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${temperature}°C`;
  let searchedDesc = response.data.weather[0].description;
  let searchedDescription = document.querySelector("#temp-description");
  searchedDescription.innerHTML = searchedDesc;
  let searchedW = response.data.wind.speed;
  let searchedWind = document.querySelector("#wind");
  searchedWind.innerHTML = `Wind speed: ${searchedW} km/h`;
  let searchedHum = response.data.main.humidity;
  let searchedHumidity = document.querySelector("#humidity");
  searchedHumidity.innerHTML = `Humidity: ${searchedHum}%`;
}

let apiKey = "5b7438cdfc6f92bfe624b6f60dd02829";
let units = "metric";
let city = document.querySelector("#searchCity");

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
cityForm.addEventListener("submit", axios.get(apiUrl).then(showTemperature));

//*** Current location

function showWeather(response) {
  let cityName = response.data.name;
  let currentCityName = document.querySelector("h1");
  currentCityName.innerHTML = cityName;
  let cityTemp = Math.round(response.data.main.temp);
  let currentCityTemp = document.querySelector("#current-temperature");
  currentCityTemp.innerHTML = `${cityTemp}°C`;
  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#temp-description");
  currentDescription.innerHTML = description;
  let wind = response.data.wind.speed;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind speed: ${wind} km/h`;
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
}

function retrievePosition(position) {
  let apiKey = "5b7438cdfc6f92bfe624b6f60dd02829";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

let buttonLocation = document.querySelector("#current-location");
buttonLocation.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(retrievePosition)
);
