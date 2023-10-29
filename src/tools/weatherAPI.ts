import { GeoPosition } from "../hooks/useGeo";
import { WeatherResponse } from "../interfaces/openweathermap";

const KEY = import.meta.env.REACT_APP_WEATHER_API || ""

export const fetchWeather = async (lo: GeoPosition): Promise<WeatherResponse> => {
  const URL = "https://api.openweathermap.org/data/2.5/forecast";

  const resp = await fetch(
    `${URL}?lat=${lo.lat}&lon=${lo.long}&cnt=7&appid=${KEY}&units=imperial`,
  );
  const json = await resp.json();
  return json;
};

export const mapIcon: Record<string, string> = {
  "": "./svg/clear-day.svg",
  "01d": "./svg/clear-day.svg",
  "01n": "./svg/clear-night.svg",
  "02d": "./svg/partly-cloudy-day.svg",
  "02n": "./svg/partly-cloudy-night.svg",
  "03d": "./svg/cloudy.svg",
  "03n": "./svg/cloudy.svg",
  "04d": "./svg/overcast-day.svg",
  "04n": "./svg/overcast-night.svg",
  "09d": "./svg/overcast-day.svg",
  "09n": "./svg/overcast-night-drizzle.svg",
  "10d": "./svg/overcast-day-rain.svg",
  "10n": "./svg/overcast-night-rain.svg",
  "11d": "./svg/thunderstorms-day.svg",
  "11n": "./svg/thunderstorms-night.svg",
  "13d": "./svg/snowflake.svg",
  "13n": "./svg/snowflake.svg",
  "50d": "./svg/mist.svg",
  "50n": "./svg/mist.svg",
}