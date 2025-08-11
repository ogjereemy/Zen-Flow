import { motion } from 'framer-motion';
import { useWeather } from '@/hooks/useWeather';
import { Button } from '@/components/ui/button';
import { RefreshCw, MapPin } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const weatherEmojis: Record<string, string> = {
  'clear sky': '☀️',
  'few clouds': '🌤️',
  'scattered clouds': '⛅',
  'broken clouds': '☁️',
  'shower rain': '🌦️',
  'rain': '🌧️',
  'thunderstorm': '⛈️',
  'snow': '🌨️',
  'mist': '🌫️',
  default: '🌤️'
};

export default function WeatherMode() {
  const { data: weather, isLoading, error, refetch } = useWeather();

  const backgroundStyle = {
    background: 'linear-gradient(-45deg, hsl(200 98% 39%), hsl(200 90% 30%), hsl(200 98% 39%), hsl(200 90% 30%))',
    backgroundSize: '400% 400%',
    '--color-1': 'hsl(200 98% 39%)',
    '--color-2': 'hsl(200 90% 30%)',
    '--color-3': 'hsl(200 98% 39%)',
    '--color-4': 'hsl(200 90% 30%)'
  } as React.CSSProperties;

  const getWeatherIcon = (condition: string) => {
    return weatherEmojis[condition.toLowerCase()] || weatherEmojis.default;
  };

  if (error) {
    return (
      <div className="h-full relative overflow-hidden" style={backgroundStyle}>
        <div className="bg-gradient-animated absolute inset-0" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">❌</div>
            <div className="text-xl mb-4">Weather data unavailable</div>
            <div className="text-sm opacity-60 mb-6">
              Please check your internet connection or location permissions
            </div>
            <Button 
              onClick={() => refetch()} 
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
              data-testid="weather-retry"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative overflow-hidden" style={backgroundStyle}>
      <div className="bg-gradient-animated absolute inset-0" />
      
      {/* Floating cloud animations */}
      <div className="absolute inset-0 opacity-30">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-60"
            style={{
              width: `${5 + i}rem`,
              height: `${5 + i}rem`,
              top: `${25 + i * 20}%`,
              left: `${20 + i * 30}%`,
            }}
            animate={{ 
              x: [0, 50, 0],
              y: [0, -20, 0] 
            }}
            transition={{ 
              duration: 8 + i * 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex h-full items-center justify-between px-8">
        {isLoading ? (
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <Skeleton className="h-16 w-16 rounded-lg" />
              <div>
                <Skeleton className="h-16 w-32 mb-2" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
            <Skeleton className="h-4 w-48 mb-6" />
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
        ) : weather ? (
          <>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1"
            >
              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-6xl" data-testid="weather-icon">
                    {getWeatherIcon(weather.condition)}
                  </div>
                  <div>
                    <div className="text-6xl font-bold digital-glow text-white" data-testid="weather-temperature">
                      {Math.round(weather.temperature)}°
                    </div>
                    <div className="text-2xl opacity-80 text-white" data-testid="weather-condition">
                      {weather.condition}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-lg opacity-60 text-white">
                  <MapPin className="h-5 w-5" />
                  <span data-testid="weather-location">{weather.location}</span>
                </div>
              </div>
              
              <div className="glass-morphism rounded-2xl p-4">
                <div className="text-sm opacity-80 mb-3 text-white">Today's Details</div>
                <div className="grid grid-cols-2 gap-4 text-sm text-white">
                  <div className="flex justify-between">
                    <span className="opacity-80">Feels like</span>
                    <span data-testid="weather-feels-like">{Math.round(weather.feelsLike)}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Humidity</span>
                    <span data-testid="weather-humidity">{weather.humidity}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Wind</span>
                    <span data-testid="weather-wind">{Math.round(weather.windSpeed)} km/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">UV Index</span>
                    <span data-testid="weather-uv">{weather.uvIndex}</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-8 space-y-4"
            >
              {weather.hourlyForecast?.map((hour, index) => (
                <div key={index} className="glass-morphism rounded-xl p-3 text-center min-w-20" data-testid={`hourly-forecast-${index}`}>
                  <div className="text-xs opacity-60 text-white">{hour.time}</div>
                  <div className="text-lg my-1">{getWeatherIcon(hour.icon)}</div>
                  <div className="text-sm font-medium text-white">{Math.round(hour.temperature)}°</div>
                </div>
              ))}
            </motion.div>
          </>
        ) : null}
      </div>

      {/* Refresh Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-4 right-4"
      >
        <Button
          variant="ghost"
          className="w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full touch-feedback text-white"
          onClick={() => refetch()}
          data-testid="weather-refresh"
        >
          <RefreshCw className="h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
}
