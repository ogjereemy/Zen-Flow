import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  icon: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number | null;
  hourlyForecast: Array<{
    time: string;
    temperature: number;
    icon: string;
  }>;
}

interface Coordinates {
  lat: number;
  lon: number;
}

export function useWeather() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.log('Geolocation error, using default location:', error.message);
          // Keep coordinates as null to use default San Francisco location
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 5 * 60 * 1000 // Cache for 5 minutes
        }
      );
    }
  }, []);

  const queryParams = coordinates 
    ? `?lat=${coordinates.lat}&lon=${coordinates.lon}` 
    : '';

  return useQuery<WeatherData>({
    queryKey: ['/api/weather', coordinates],
    queryFn: async () => {
      const response = await fetch(`/api/weather${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      return response.json();
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    staleTime: 2 * 60 * 1000, // Data is fresh for 2 minutes
    retry: 2,
  });
}

export function useGeolocation() {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 5 * 60 * 1000 // Cache for 5 minutes
    });
  });
}
