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
    if (geo) fetchWeather(geo).then((data) =>
      setWeather(data)
    );
  }, [geo]);

  useEffect(() => {
    (async () => {
      // cache 
      try {
        const cache = localStorage.getItem('location')
        if (cache) {
          const json = JSON.parse(cache)
          if (json.lat && json.long) {
            setGeo(json)
          } else {
            throw new Error('Invalid json')
          }
        }
      } catch (e) {
        localStorage.removeItem('location')
      }

      console.log("requesting geoLocation");
      const resp = await requestLocation();
      localStorage.setItem('location', JSON.stringify(resp))
      setGeo(resp);
    })();
  }, []);

  return [geo, weather];
};
