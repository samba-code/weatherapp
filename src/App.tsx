import { useEffect, useState } from "react";

function padTime(num: Number) {
  return num.toString().padStart(2, "0");
}

const App = () => {
  const [weatherData, setWeatherData]: [any, any] = useState(null);

  useEffect(() => {
    console.log("loaded");
    const API_KEY = "88d2f0bf168b33ed4fa72f5eabbc8bdd";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${51.5072}&lon=${0.1276}&units=metric&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      });
  }, []);

  const sunriseEpochSeconds = weatherData?.sys?.sunrise;
  const sunsetEpochSeconds = weatherData?.sys?.sunset;

  const sunriseDate = new Date(sunriseEpochSeconds * 1000);
  const sunsetDate = new Date(sunsetEpochSeconds * 1000);

  const sunriseHours = sunriseDate.getHours();
  const sunriseMinutes = sunriseDate.getMinutes();

  const sunsetHours = sunsetDate.getHours();
  const sunsetMinutes = sunsetDate.getMinutes();

  const sunriseTime = `${padTime(sunriseHours)}:${padTime(sunriseMinutes)}`;

  const sunsetTime = `${padTime(sunsetHours)}:${padTime(sunsetMinutes)}`;

  return (
    <div className="App">
      <h1>Weather App</h1>
      <p>Current Weather: {weatherData?.weather?.[0]?.description}</p>
      <p>Current Temperature: {weatherData?.main?.temp}°</p>
      <p>Sunrise: {sunriseTime}</p>
      <p>Sunset: {sunsetTime}</p>
    </div>
  );
};

export default App;
