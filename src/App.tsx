import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

function padTime(num: Number) {
  return num.toString().padStart(2, "0");
}

const App = () => {
  const [weatherData, setWeatherData]: [any, any] = useState(null);
  const [location, setLocation]: [any, any] = useState(null);
  const [locationOptions, setLocationOptions]: [any, any] = useState([]);
  const [locationOptionLabels, setLocationOptionLabels]: [any, any] = useState(
    []
  );

  useEffect(() => {
    console.log("load weather");
    const API_KEY = "88d2f0bf168b33ed4fa72f5eabbc8bdd";
    if (location) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location?.lat}&lon=${location?.lon}&units=metric&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setWeatherData(data);
        });
    }
  }, [location]);

  const makeLabel = (loc: any) => {
    return `${loc.name}, ${loc?.state ?? "no state"}, ${loc.country}`;
  };

  const handleInput = (e: any) => {
    console.log("e: ", e);
    const API_KEY = "88d2f0bf168b33ed4fa72f5eabbc8bdd";
    const input = e.target.value;
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((locationData) => {
        console.log("locations: ", locationData);

        if (Array.isArray(locationData)) {
          const locationLabels: Array<string> = locationData.map((loc) => {
            return makeLabel(loc);
          });
          let dedupedLabels = [...new Set(locationLabels)];

          const locationOptions: Array<string> = locationData.map((loc) => {
            return {
              ...loc,
              label: makeLabel(loc),
            };
          });

          setLocationOptions(locationOptions);
          setLocationOptionLabels(dedupedLabels);
        }
      });
  };

  const handleSelect = (e: any) => {
    console.log("select: ", e);
    const label = e.target.value;
    const selectedLocation = locationOptions.filter(
      (loc: any) => loc.label === label
    )[0];
    setLocation(selectedLocation);
  };

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

  console.log("locationOptions: ", locationOptions);

  return (
    <div className="App">
      <Typography variant="h3" component="h1">
        Weather App
      </Typography>

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={locationOptionLabels}
        sx={{ width: 500 }}
        onInput={handleInput}
        renderInput={(params) => (
          <TextField {...params} label="Enter Location" />
        )}
        onSelect={handleSelect}
      />
      {weatherData && (
        <Typography variant="body1">
          Current Weather: {weatherData?.weather?.[0]?.description}
          <br />
          Current Temperature: {weatherData?.main?.temp}°<br />
          Sunrise: {sunriseTime}
          <br />
          Sunset: {sunsetTime}
        </Typography>
      )}
    </div>
  );
};

export default App;
