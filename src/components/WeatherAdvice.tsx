import { motion } from "framer-motion";
import type { WeatherCondition } from "../types/weather";
import { getWeatherAdvice } from "../utils/weatherAdvice";

interface WeatherAdviceProps {
  condition: WeatherCondition;
  tempC: number;
}

export function WeatherAdvice({ condition, tempC }: WeatherAdviceProps) {
  const advice = getWeatherAdvice(condition, tempC);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="weather-advice"
    >
      <span className="weather-advice__emoji">{advice.emoji}</span>
      <span className="weather-advice__text">{advice.text}</span>
    </motion.div>
  );
}
