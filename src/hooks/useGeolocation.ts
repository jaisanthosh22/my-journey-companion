import { useEffect, useRef, useState } from "react";

type LatLng = [number, number];

interface GeolocationState {
  currentPos: LatLng | null;
  lastPos: LatLng | null;
  error: string | null;
}

export function useGeolocation(): GeolocationState {
  const [currentPos, setCurrentPos] = useState<LatLng | null>(null);
  const [lastPos, setLastPos] = useState<LatLng | null>(null);
  const [error, setError] = useState<string | null>(null);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setError("Geolocation is not supported in this browser.");
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const coords: LatLng = [pos.coords.latitude, pos.coords.longitude];
        setCurrentPos((prev) => {
          if (prev) {
            setLastPos(prev);
          }
          return coords;
        });
        setError(null);
      },
      (err) => {
        setError(err.message || "Failed to get location.");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10_000,
        timeout: 20_000,
      }
    );

    return () => {
      if (watchIdRef.current != null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return { currentPos, lastPos, error };
}

