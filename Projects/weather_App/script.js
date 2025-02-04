document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
    
    const API_KEY = "4545593ac56b61a37c58854c845e254f";

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if(!city) return;  // as empty string consider false in javascript

        /** 
         * Always Remember:->
         * whenever you are making call (or request) on somebody else server always remember that:
         * 1) The server may throw some error.
         * 2) server (or DataBase) is always in another continent.
         * 
         * means making web request is not immediate response
         */
        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }

    });

    async function fetchWeatherData(city) {
        // gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE", response);

        if(!response.ok) {
            throw new Error(" City Not Found");
        }
        const data = await response.json();
        return data;
    }
    
    function displayWeatherData(data) {
        // display
        //console.log(data);

        console.log(data);
        const {name, main, weather} = data;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature : ${main.temp}`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

        // unlock the display
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    function showError() {
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }

    

});