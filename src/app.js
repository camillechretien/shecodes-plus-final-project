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
  let searchedDesc = response.data.weather[0].description;
  let searchedDescription = document.querySelector("#temp-description");
  let searchedW = response.data.wind.speed;
  let searchedWind = document.querySelector("#wind");
  let searchedHum = response.data.main.humidity;
  let searchedHumidity = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = `${temperature}`;
  searchedDescription.innerHTML = searchedDesc;
  searchedWind.innerHTML = `Wind speed: ${searchedW} km/h`;
  searchedHumidity.innerHTML = `Humidity: ${searchedHum}%`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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
  let cityTemp = Math.round(response.data.main.temp);
  let currentCityTemp = document.querySelector("#current-temperature");
  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#temp-description");
  let wind = response.data.wind.speed;
  let currentWind = document.querySelector("#wind");
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");

  currentCityName.innerHTML = cityName;
  currentCityTemp.innerHTML = `${cityTemp}`;
  currentDescription.innerHTML = description;
  currentWind.innerHTML = `Wind speed: ${wind} km/h`;
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
