import { useCallback, useEffect, useState } from "react";
import { requestLocation } from "../tools/location";
import { fetchWeather } from "../tools/weatherAPI";

export interface GeoPosition {
  lat: number;
  long: number;
}

export const useGeo = () => {
  const [geo, setGeo] = useState<GeoPosition | null>(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (geo) fetchWeather(geo).then((data) => setWeather(data));
  }, [geo]);

  useEffect(() => {
    (async () => {
      console.log("requesting geoLocation");
      const resp = await requestLocation();
      console.log(resp);
      setGeo(resp);
    })();
  }, []);

  return [geo, weather];
};
