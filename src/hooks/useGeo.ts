import { useEffect, useState } from "react";
import { requestLocation } from "../tools/location";
import { fetchWeather } from "../tools/weatherAPI";
import { WeatherResponse } from "../interfaces/openweathermap";

export interface GeoPosition {
  lat: number;
  long: number;
}

export const useGeo = (): [GeoPosition | null, WeatherResponse | null] => {
  const [geo, setGeo] = useState<GeoPosition | null>(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  useEffect(() => {
    console.log(`geo changes ${geo}`)
    if (geo) fetchWeather(geo).then((data) => setWeather(data));
  }, [geo]);

  useEffect(() => {
    (async () => {
      console.log("requesting geoLocation");
      const resp = await requestLocation();
      setGeo(resp);
    })();
  }, []);

  return [geo, weather];
};
