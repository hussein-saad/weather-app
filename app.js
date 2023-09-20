async function getWeather(city){
    try {
        const url = " http://api.weatherapi.com/v1/current.json?";
        const key = "fb755edadfe74b4c876110230231909";
        const weather = await fetch(`${url}key=${key}&q=${city}`,{
            mode: "cors",
        });
        const weatherData = await weather.json();
        return weatherData;
    } catch (error) {
        console.log(error);
    }    
}

function createWeatherCard(weatherData) {
    const weatherCard = document.createElement("div");
    weatherCard.classList.add("weather-card");

    const cityElement = document.createElement("h2");
    cityElement.textContent = weatherData.location.name;

    const temperatureElement = document.createElement("p");
    temperatureElement.textContent = `Temperature: ${weatherData.current.temp_c}°C`;

    const conditionElement = document.createElement("p");
    conditionElement.textContent = `Condition: ${weatherData.current.condition.text}`;

    const windSpeedElement = document.createElement("p");
    windSpeedElement.textContent = `Wind Speed: ${weatherData.current.wind_kph} km/h`;

    const humidityElement = document.createElement("p");
    humidityElement.textContent = `Humidity: ${weatherData.current.humidity}%`;

    weatherCard.appendChild(cityElement);
    weatherCard.appendChild(temperatureElement);
    weatherCard.appendChild(conditionElement);
    weatherCard.appendChild(windSpeedElement);
    weatherCard.appendChild(humidityElement);

    const weatherContainer = document.getElementById("weatherContainer");
    weatherContainer.appendChild(weatherCard);
}

function restartWeatherCard() {
    const weatherContainer = document.getElementById("weatherContainer");
    weatherContainer.innerHTML = "";
}


async function displayWeatherData(){
    const search = document.getElementById("searchButton");
    search.addEventListener("click", async () => {
        const city = document.getElementById("cityInput").value;
        if (city === "") 
            return;
        const weatherData = await getWeather(city);
        if (!weatherData) {
            alert("Something went wrong");
            return;
        }
        restartWeatherCard();
        createWeatherCard(weatherData);
    });
}

displayWeatherData();