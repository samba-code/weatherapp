type Weather = {
  description: string;
};

export type WeatherData = {
  main: {
    temp: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  weather: Array<Weather>;
};

export type Location = {
  label: string;
  lat: number;
  lon: number;
};
