import { useEffect, useState } from "react";

interface GeolocationState {
  lat: number | null;
  lon: number | null;
  loading: boolean;
  error: string | null;
  denied: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    lat: null,
    lon: null,
    loading: true,
    error: null,
    denied: false,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        lat: null,
        lon: null,
        loading: false,
        error: "Geolocation not supported",
        denied: true,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          loading: false,
          error: null,
          denied: false,
        });
      },
      (err) => {
        setState({
          lat: null,
          lon: null,
          loading: false,
          error: err.message,
          denied: err.code === err.PERMISSION_DENIED,
        });
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 },
    );
  }, []);

  return state;
}
