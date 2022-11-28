import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { WeatherData, Location } from "./types";

import {
  makeTimeFromUnix,
  makeLabel,
  weatherDataURL,
  locationDataURL,
} from "./utils/utils";
import WeatherPanel from "./components/WeatherPanel/WeatherPanel";
import Container from "@mui/material/Container";

const App = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [locationOptions, setLocationOptions] = useState<Array<Location>>([]);
  const [locationOptionLabels, setLocationOptionLabels] = useState<
    Array<string>
  >([]);

  useEffect(() => {
    document.title = "Weather App";
  }, []);

  useEffect(() => {
    if (location) {
      fetch(weatherDataURL(location?.lat, location?.lon))
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
        });
    }
  }, [location]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    fetch(locationDataURL(input))
      .then((response) => response.json())
      .then((locationData) => {
        if (Array.isArray(locationData)) {
          const locationLabels: Array<string> = locationData.map((loc) => {
            return makeLabel(loc);
          });
          let dedupedLabels = [...new Set(locationLabels)];
          const locationOptions: Array<Location> = locationData.map((loc) => {
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

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const label = e.target.value;
    const selectedLocation = locationOptions.filter(
      (loc: Location) => loc.label === label
    )[0];
    setLocation(selectedLocation);
  };

  const sunriseTime = weatherData
    ? makeTimeFromUnix(weatherData.sys.sunrise)
    : "";
  const sunsetTime = weatherData
    ? makeTimeFromUnix(weatherData.sys.sunset)
    : "";

  return (
    <Container sx={{ padding: 5 }}>
      <Typography variant="h3" component="h1" mb={3}>
        Weather App
      </Typography>

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={locationOptionLabels}
        sx={{ maxWidth: 500 }}
        onInput={handleInput}
        renderInput={(params) => (
          <TextField {...params} label="Enter Location" />
        )}
        onSelect={handleSelect}
      />
      {weatherData && (
        <WeatherPanel
          description={weatherData?.weather?.[0]?.description}
          temperature={weatherData?.main?.temp}
          sunrise={sunriseTime}
          sunset={sunsetTime}
        />
      )}
    </Container>
  );
};

export default App;
