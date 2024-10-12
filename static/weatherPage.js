const apiKey = "4d8b2ea36c189247d37edce656183f72"; 

const searchBar = document.querySelector(".search-bar");
const currentTemperature = document.querySelector(".temperature");
const currentHumidity = document.querySelector(".humidity");
const currentWindSpeed = document.querySelector(".wind-speed");
const currentWeatherIcon = document.querySelector(".weather-icon");
const weeklyForecast = document.querySelector(".cards");

searchBar.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    const query = searchBar.value;
    getWeatherData(query);
  }
});

async function getWeatherData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
  );
  const data = await response.json();
  if (data.cod === "404") {
    alert("City not found");
  } else {
    displayCurrentWeather(data);
    displayWeeklyForecast(data);
  }
}

function displayCurrentWeather(data) {
  const current = data.list[0];
  currentTemperature.textContent = `${Math.round(current.main.temp)}°C`;
  currentHumidity.textContent = `Humidity: ${current.main.humidity}%`;
  currentWindSpeed.textContent = `Wind Speed: ${current.wind.speed} m/s`;
  currentWeatherIcon.style.backgroundImage = `url(http://openweathermap.org/img/w/${current.weather[0].icon}.png)`;

}

function displayWeeklyForecast(data) {
  weeklyForecast.innerHTML = "";
  for (let i = 0; i < data.list.length; i += 8) {
    const daily = data.list[i];
    const card = document.createElement("div");
    card.classList.add("card-container");
    const date = document.createElement("p");
    date.classList.add("card-date");
    date.textContent = new Date(daily.dt_txt).toLocaleDateString("en-US", {
      weekday: "long",
    });
    const icon = document.createElement("div");
    icon.classList.add("card-icon");
    icon.style.backgroundImage = `url(http://openweathermap.org/img/w/${daily.weather[0].icon}.png)`;
  
    const dataContainer = document.createElement("div");
    dataContainer.classList.add("card-data");
    const temp = document.createElement("p");
    temp.textContent = `${Math.round(daily.main.temp)}°C`;
    const humidity = document.createElement("p");
    humidity.textContent = `Humidity: ${daily.main.humidity}%`;
    const windSpeed = document.createElement("p");
    windSpeed.textContent = `Wind Speed: ${daily.wind.speed} m/s`;
    dataContainer.appendChild(temp);
    dataContainer.appendChild(humidity);
    dataContainer.appendChild(windSpeed);
    card.appendChild(date);
    card.appendChild(icon);
    card.appendChild(dataContainer);
    weeklyForecast.appendChild(card);
  }
}
