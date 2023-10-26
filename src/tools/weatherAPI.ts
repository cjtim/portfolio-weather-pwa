import { GeoPosition } from "../hooks/useGeo";

const KEY = "fd402495d0ff2bc9c1686d43df42fa67";

export const fetchWeather = async (lo: GeoPosition) => {
  const URL = "https://api.openweathermap.org/data/2.5/forecast";

  const resp = await fetch(
    `${URL}?lat=${lo.lat}&lon=${lo.long}&cnt=7&appid=${KEY}`,
  );
  const json = await resp.json();
  console.log(json);
  return json;
};
