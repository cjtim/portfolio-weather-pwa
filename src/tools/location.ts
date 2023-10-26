import { GeoPosition } from "../hooks/useGeo";

export const requestLocation = (): Promise<GeoPosition> => {
  return new Promise<GeoPosition>((res, rej) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        res({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      (err) => {
        rej(err);
      },
    );
  });
};
