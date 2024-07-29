function fetchWeather() {
    const location = document.getElementById('locationSelect').value;
    const weatherInfoDiv = document.getElementById('weatherInfo');
    weatherInfoDiv.innerHTML = '';

    if (!location) {
        weatherInfoDiv.innerHTML = '<p>Please select a location.</p>';
        return;
    }

    const apiKey = '8c8856b407f921be30fd504901ef1b98'; // Your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const cityName = data.name;
            const weatherInfo = `
                <h3>Weather in ${cityName}</h3>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${description}</p>
            `;
            weatherInfoDiv.innerHTML = weatherInfo;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfoDiv.innerHTML = `<p>Error fetching weather data: ${error.message}. Please try again later.</p>`;
        });
}
