import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navigation } from "lucide-react";
import { toast } from "sonner";
// import logo from "./assets/logo.png";
import { AppLayout } from "./components/AppLayout";
import { ErrorState } from "./components/ErrorState";
import { ForecastCard } from "./components/ForecastCard";
import { LoadingState } from "./components/LoadingState";
import { SearchBar } from "./components/SearchBar";
import { UnitToggle } from "./components/UnitToggle";
import { WeatherAdvice } from "./components/WeatherAdvice";
import { WeatherCard } from "./components/WeatherCard";
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

  const bgTheme = weather
    ? getBackgroundTheme(weather.condition, weather.isDay)
    : {
        gradient: "linear-gradient(180deg, #e8f0fe, #b8d4f0)",
        overlayOpacity: 0,
      };
  const isDay = weather?.isDay ?? true;

  return (
    <AppLayout
      // logoSrc={logo}
      // title="QuickWeather"
      headerRight={<UnitToggle unit={unit} onToggle={setUnit} />}
      footerText="Powered by OpenWeatherMap · Real-time weather data"
      style={{
        background: bgTheme.gradient,
        ["--dynamic-text" as any]: getTextColor(isDay),
        ["--dynamic-muted" as any]: getMutedColor(isDay),
        ["--dynamic-glass-bg" as any]: getGlassBg(isDay),
        ["--dynamic-glass-border" as any]: getGlassBorder(isDay),
      }}
    >
      <SearchBar
        onSearch={fetchByCity}
        onSelectCoords={(lat, lon) => fetchByCoords(lat, lon)}
      />
      {geo.loading && !weather && <LoadingState />}
      {loading && !weather && !geo.loading && <LoadingState />}
      {error && !weather && (
        <ErrorState message={error} onRetry={handleRetry} />
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
                <Navigation size={14} />
                <span>Based on your location</span>
              </motion.div>
            )}
            <WeatherCard data={weather} unit={unit} />
            <WeatherAdvice
              condition={weather.condition}
              tempC={weather.tempC}
            />
            <ForecastCard forecast={forecast} unit={unit} />
          </motion.div>
        </AnimatePresence>
      )}

      {loading && weather && (
        <div className="loading-overlay">
          <LoadingState />
        </div>
      )}
    </AppLayout>
  );
};

export default Home;
