function displayTime() {
    let now = new Date();
    let days = [
        `Sunday`,
        `Monday`,
        `Tuesday`,
        `Wednesday`,
        `Thursday`,
        `Friday`,
        `Saturday`
    ];
    let day = days[now.getDay()];
    let hour = now.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let miniute = now.getMinutes();
    if (miniute < 10) {
        miniute = `0${miniute}`;
    }
    let date = `${day} ${hour}:${miniute}`;
    return date;
}

let date = document.querySelector("#current-time");
date.innerHTML = displayTime();

function displayWeather(response) {
    document.querySelector(
        "#current-city"
    ).innerHTML = `${response.data.name},${response.data.sys.country}`;
    document.querySelector("#celsius-temperature").innerHTML = Math.round(
        response.data.main.temp
    );
    document.querySelector("#description").innerHTML =
        response.data.weather[0].description;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
        response.data.wind.speed
    );
}

function searchCity(city) {
    let apiEndpiont = `https://api.openweathermap.org/data/2.5/weather?`;
    let apiKey = `c8a77112b2faf6684bb4b21a0aa778ae`;
    let units = `metric`;
    let apiUrl = `${apiEndpiont}q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeather);
}

function submit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", submit);

function currentPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiEndpiont = `https://api.openweathermap.org/data/2.5/weather?`;
    let apiKey = `c8a77112b2faf6684bb4b21a0aa778ae`;
    let units = `metric`;
    let apiUrl = `${apiEndpiont}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeather);
}

function userLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(currentPosition);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", userLocation);
