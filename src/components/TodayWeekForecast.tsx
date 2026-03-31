import React from "react";
import { Cloud, Droplets, Wind } from "lucide-react";
import type { ForecastDay } from "../types/weather";

interface TodayWeekForecastProps {
  forecast: ForecastDay[];
  unit: "C" | "F";
}

export const TodayWeekForecast: React.FC<TodayWeekForecastProps> = ({
  forecast,
  unit,
}) => {
  const getHighLow = (day: ForecastDay) => {
    const high = unit === "C" ? day.highC : day.highF;
    const low = unit === "C" ? day.lowC : day.lowF;
    return { high: Math.round(high), low: Math.round(low) };
  };

  const hourlyForecast = [
    { time: "12 AM", temp: 18, icon: "cloud" },
    { time: "3 AM", temp: 17, icon: "cloud" },
    { time: "6 AM", temp: 16, icon: "partly-cloudy" },
    { time: "9 AM", temp: 19, icon: "sun" },
    { time: "12 PM", temp: 23, icon: "sun" },
  ];

  return (
    <div className="forecast-content">
      {/* Hourly Forecast */}
      <div className="hourly-forecast">
        <h3 className="hourly-title">Today / Week Forecast</h3>
        <div className="hourly-scroll">
          {hourlyForecast.map((hour, index) => (
            <div key={index} className="hour-item">
              <div className="hour-time">{hour.time}</div>
              <div className="hour-icon">
                <Cloud size={20} />
              </div>
              <div className="hour-temp">{hour.temp}°</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tomorrow Summary */}
      {forecast.length > 0 && (
        <div className="tomorrow-content">

          <div className="tomorrow-title">
            <h3>Tomorrow</h3>
            <span>{forecast[0].conditionLabel}</span>
          </div>
          
          <div className="tomorrow-details">
            <div className="detail-item">
              <Droplets size={16} />
              <span>{forecast[0].humidity}%</span>
            </div>
            <div className="detail-item">
              <Wind size={16} />
              <span>{forecast[0].windSpeed} km/h</span>
            </div>
          </div>

          <div>
            <Cloud size={60} color="#4a90e2" />
          </div>
        </div>
      )}
    </div>
  );
};
