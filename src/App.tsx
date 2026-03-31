import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { MainLayout } from "./components/MainLayout";
import { CurrentWeatherCard } from "./components/CurrentWeatherCard";
import { TodayHighlights } from "./components/TodayHighlights";
import { TodayWeekForecast } from "./components/TodayWeekForecast";
import { SunTimesCard } from "./components/SunTimesCard";
import { OtherCities } from "./components/OtherCities";
import { ErrorState } from "./components/ErrorState";
import { LoadingState } from "./components/LoadingState";
import { useGeolocation } from "./hooks/useGeolocation";
import {
  fetchCurrentWeather,
  fetchCurrentWeatherByCoords,
  fetchForecast,
  fetchForecastByCoords,
} from "./services/weatherService";
import {
  getBackgroundTheme,
  getGlassBg,
  getGlassBorder,
  getMutedColor,
  getTextColor,
} from "./utils/backgrounds";
import type { CurrentWeather, ForecastDay } from "./types/weather";

const Home = () => {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchedCity, setSearchedCity] = useState<string | null>(null);

  const geo = useGeolocation();

  const fetchByCity = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city),
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
      setSearchedCity(city);
    } catch (err: any) {
      setError(err.message);
      toast.error("Weather fetch failed", { description: err.message });
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchByCoords = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchCurrentWeatherByCoords(lat, lon),
        fetchForecastByCoords(lat, lon),
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
      setSearchedCity(weatherData.city);
    } catch (err: any) {
      setError(err.message);
      toast.error("Weather fetch failed", { description: err.message });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (geo.loading) return;
    if (geo.lat !== null && geo.lon !== null) {
      fetchByCoords(geo.lat, geo.lon);
    } else {
      fetchByCity("New York");
    }
  }, [geo.loading, geo.lat, geo.lon, fetchByCity, fetchByCoords]);

  const handleRetry = () => {
    if (searchedCity) {
      fetchByCity(searchedCity);
    } else if (geo.lat !== null && geo.lon !== null) {
      fetchByCoords(geo.lat, geo.lon);
    } else {
      fetchByCity("New York");
    }
  };

  const handleCitySelect = (city: string) => {
    fetchByCity(city);
  };

  // Mock other cities data
  const otherCities = [
    { name: "London", temp: 15, condition: "Cloudy", icon: "cloud" },
    { name: "Tokyo", temp: 22, condition: "Clear", icon: "sun" },
    { name: "Paris", temp: 18, condition: "Rainy", icon: "rain" },
    { name: "Sydney", temp: 12, condition: "Windy", icon: "wind" },
  ];

  const bgTheme = weather
    ? getBackgroundTheme(weather.condition, weather.isDay)
    : {
        gradient: "linear-gradient(180deg, #e8f0fe, #b8d4f0)",
        overlayOpacity: 0,
      };
  const isDay = weather?.isDay ?? true;

  return (
    <div
      className="app-wrapper"
      style={{
        background: bgTheme.gradient,
        ["--dynamic-text" as any]: getTextColor(isDay),
        ["--dynamic-muted" as any]: getMutedColor(isDay),
        ["--dynamic-glass-bg" as any]: getGlassBg(isDay),
        ["--dynamic-glass-border" as any]: getGlassBorder(isDay),
      }}
    >
      <MainLayout
        unit={unit}
        onUnitToggle={setUnit}
        onSearch={handleCitySelect}
      >
        {(geo.loading || loading || error) && !weather && (
          <div className="loading-main">
            {geo.loading && <LoadingState />}
            {loading && !geo.loading && <LoadingState />}
            {error && <ErrorState message={error} onRetry={handleRetry} />}
          </div>
        )}
        {weather && !loading && (
          <AnimatePresence mode="wait">
            <motion.div
              key={weather.city}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="weather-content"
            >
              {geo.lat !== null && !searchedCity && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="location-badge"
                >
                  📍 Based on your location
                </motion.div>
              )}
              <div className="weather-content-left">
                <CurrentWeatherCard
                  weather={weather}
                  unit={unit}
                  onUnitToggle={setUnit}
                />
                <div className="sun-forecast_main">

                <TodayWeekForecast forecast={forecast} unit={unit} />
                <SunTimesCard weather={weather} />
                </div>

              </div>

              <div className="weather-content-left">
                <TodayHighlights weather={weather} unit={unit} />
                {/* <OtherCities
                  cities={otherCities}
                  unit={unit}
                  onCitySelect={handleCitySelect}
                  /> */}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {loading && weather && (
          <div className="loading-overlay">
            <LoadingState />
          </div>
        )}
      </MainLayout>
    </div>
  );
};

export default Home;
