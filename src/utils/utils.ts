import { Location } from "../types";

export const padTime = (num: Number) => num.toString().padStart(2, "0");

export const makeTimeFromUnix = (seconds: number) => {
  const date = new Date(seconds * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${padTime(hours)}:${padTime(minutes)}`;
};

export const makeLabel = (loc: Location) => {
  return `${loc.name}, ${loc?.state ?? "no state"}, ${loc.country}`;
};

const WEATHER_KEY = "88d2f0bf168b33ed4fa72f5eabbc8bdd";

export const weatherDataURL = (lat: number, lon: number) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_KEY}`;

export const locationDataURL = (input: string) =>
  `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${WEATHER_KEY}`;
