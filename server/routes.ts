import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Weather API proxy endpoint
  app.get("/api/weather", async (req, res) => {
    try {
      const { lat, lon } = req.query;
      const apiKey = process.env.OPENWEATHER_API_KEY || process.env.WEATHER_API_KEY || "demo_key";
      
      // Default to San Francisco if no coordinates provided
      const latitude = lat || "37.7749";
      const longitude = lon || "-122.4194";
      
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      
      if (!weatherResponse.ok) {
        throw new Error(`Weather API error: ${weatherResponse.status}`);
      }
      
      const weatherData = await weatherResponse.json();
      
      // Fetch hourly forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      
      let hourlyForecast = [];
      if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json();
        hourlyForecast = forecastData.list.slice(0, 5).map((item: any) => ({
          time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            hour12: true 
          }),
          temperature: item.main.temp,
          icon: item.weather[0].main.toLowerCase()
        }));
      }
      
      const response = {
        location: `${weatherData.name}, ${weatherData.sys.country}`,
        temperature: weatherData.main.temp,
        condition: weatherData.weather[0].description,
        icon: weatherData.weather[0].main.toLowerCase(),
        feelsLike: weatherData.main.feels_like,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed * 3.6, // Convert m/s to km/h
        uvIndex: 5, // UV index requires separate API call in OpenWeather
        hourlyForecast
      };
      
      res.json(response);
    } catch (error) {
      console.error("Weather API error:", error);
      res.status(500).json({ 
        error: "Failed to fetch weather data",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
