document.addEventListener("DOMContentLoaded", () => {
  const weatherFeed = document.querySelector(".weather-text");
  const predictedReadings = document.querySelector(".reading-container .reading-panel:nth-child(1)");

  const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=8.4966&longitude=4.5421&hourly=relative_humidity_2m,soil_moisture_1_to_3cm&daily=apparent_temperature_max,apparent_temperature_min,precipitation_sum,rain_sum,precipitation_hours,precipitation_probability_max&timezone=Africa%2FCairo";

  async function fetchWeatherData() {
      try {
          const response = await fetch(apiUrl);
          if (!response.ok) throw new Error("Weather data not available");
          
          const data = await response.json();
          
          // Extract relevant data
          const temperature = data.daily.apparent_temperature_max[0];
          const humidity = data.hourly.relative_humidity_2m[0];
          const soilMoisture = data.hourly.soil_moisture_1_to_3cm[0] * 100; // Convert to percentage
          
          // Update Live Weather Feed
          weatherFeed.innerHTML = `Live weather feed from Ilorin • Temperature: ${temperature}°C • Humidity: ${humidity}% • Soil Moisture: ${soilMoisture.toFixed(1)}%`;

          // Update Predicted Readings
          predictedReadings.innerHTML = `
              <h3>Predicted Reading</h3>
              <div class="reading-item"><span>Temperature</span><span>${temperature}°C</span></div>
              <div class="reading-item"><span>Humidity</span><span>${humidity}%</span></div>
              <div class="reading-item"><span>Soil Moisture</span><span>${soilMoisture.toFixed(1)}%</span></div>
          `;

      } catch (error) {
          console.error("Error fetching weather data:", error);
      }
  }

  fetchWeatherData();
});
