import { useEffect, useState } from "react";
import { requestLocation } from "../tools/location";
import { fetchWeather } from "../tools/weatherAPI";
import { WeatherResponse } from "../interfaces/openweathermap";
import { useToast } from "@chakra-ui/react";

export interface GeoPosition {
  lat: number;
  long: number;
}

export const useGeo = (): [GeoPosition | null, WeatherResponse | null] => {
  const [geo, setGeo] = useState<GeoPosition | null>(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const toast = useToast()

  useEffect(() => {
    console.log(`geo changes ${JSON.stringify(geo)}`)
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
      const resp = requestLocation()
      toast.promise(resp, {
        success: (r) => {
          localStorage.setItem('location', JSON.stringify(r))
          setGeo(r);
          return { title: `You're at ${r.lat}, ${r.long}`, description: 'Looks great' }
        },
        error: () => {
          const nyc = { lat: 40.776676, long: -73.971321 }
          localStorage.setItem('location', JSON.stringify(nyc))
          setGeo(nyc);
          return { title: 'Permission denied', description: "Unable to access location", }
        },
        loading: { title: 'Where are you...', description: 'Please wait' },
      })


    })();
  }, []);

  return [geo, weather];
};
