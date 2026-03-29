import { motion } from "framer-motion";
import type { ForecastDay } from "../types/weather";
import { WeatherIcon } from "../components/WeatherIcon";

interface ForecastCardProps {
  forecast: ForecastDay[];
  unit: "C" | "F";
}

export function ForecastCard({ forecast, unit }: ForecastCardProps) {
  if (forecast.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="forecast-section"
    >
      <h2 className="forecast-title">{forecast.length}-Day Forecast</h2>
      <div className="glass-card forecast-list" style={{ padding: "0.5rem 0" }}>
        {forecast.map((day, i) => {
          const high = unit === "C" ? day.highC : day.highF;
          const low = unit === "C" ? day.lowC : day.lowF;

          return (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="forecast-day"
            >
              <span className="forecast-day__name">{day.day}</span>
              <div className="forecast-day__icon-wrap">
                <WeatherIcon condition={day.condition} size={22} />
                <span className="forecast-day__condition">
                  {day.conditionLabel}
                </span>
              </div>
              <div className="forecast-day__temps">
                <span className="forecast-day__low">{low}°</span>
                <span className="forecast-day__bar" />
                <span className="forecast-day__high">{high}°</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
