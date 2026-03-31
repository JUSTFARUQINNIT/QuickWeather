import React from "react";
import { Cloud, MapPin } from "lucide-react";
import type { CurrentWeather } from "../types/weather";
import { UnitToggle } from "./UnitToggle";
import { motion } from "framer-motion";
import { WeatherAdvice } from "../components/WeatherAdvice";

interface CurrentWeatherCardProps {
  weather: CurrentWeather;
  unit: "C" | "F";
  onUnitToggle: (unit: "C" | "F") => void;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  weather,
  unit,
  onUnitToggle,
}) => {
  const temp = unit === "C" ? weather.tempC : weather.tempF;
  const feelsLike = unit === "C" ? weather.feelsLikeC : weather.feelsLikeF;

  return (
    <div className="current-weather-card">
      <div className="weather-header">
        <div className="weather-header-left">
          <MapPin size={20} />
          <div className="location-info">
            <h2 className="city-name">{weather.city}</h2>
            <div className="country">{weather.country}</div>
          </div>
        </div>
        <div className="weather-header-right">
          <UnitToggle unit={unit} onToggle={onUnitToggle} />
        </div>
      </div>

      <div className="weather-now">
        <p>Weather</p>
        <span>Now</span>
      </div>

      <section className="temperature-section">
        <div className="temperature-section-left">
          <h2>
            {" "}
            {Math.round(temp)}°{unit}
          </h2>
          <p>
            Feels like {Math.round(feelsLike)}°{unit}
          </p>
        </div>

        <div className="temperature-section-right">
          <div className="weather-icon">
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Cloud size={100} />
            </motion.div>
          </div>
          <section className="high-low">
            <p> High: {Math.round(temp + 3)}°</p>
            <p> Low: {Math.round(temp - 3)}°</p>
          </section>
        </div>
      </section>
      <motion.div
        key={weather.condition}
        animate={{ x: [0, 20, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
      >
        <WeatherAdvice condition={weather.condition} tempC={weather.tempC} />
      </motion.div>
    </div>
  );
};
