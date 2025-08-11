import { useQuery } from '@tanstack/react-query';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  icon: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  hourlyForecast: Array<{
    time: string;
    temperature: number;
    icon: string;
  }>;
}

export function useWeather() {
  return useQuery<WeatherData>({
    queryKey: ['/api/weather'],
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    staleTime: 2 * 60 * 1000, // Data is fresh for 2 minutes
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
