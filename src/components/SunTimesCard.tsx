import React from 'react';
import { Sunrise, Sunset, Clock } from 'lucide-react';
import type { CurrentWeather } from '../types/weather';

interface SunTimesCardProps {
  weather: CurrentWeather;
}

export const SunTimesCard: React.FC<SunTimesCardProps> = ({ weather }) => {
  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const calculateDayLength = () => {
    if (!weather.sunrise || !weather.sunset) return '0h 0m';
    
    const sunrise = new Date(weather.sunrise);
    const sunset = new Date(weather.sunset);
    const diff = sunset.getTime() - sunrise.getTime();
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="sun-times-card">
      <div className="sun-times-header">
        <span>Sunrise & Sunset</span>
      </div>
      
      <div className="sun-times-content">
        <div className="sun-time-item">
          
          <div className="sun-time-info">
            <div className="sun-time-label">Sunrise</div>
            <div className="sun-time-value">
              {weather.sunrise ? formatTime(weather.sunrise) : '--:--'}
            </div>
          </div>
        </div>

        <div className="sun-time-item">
         
          <div className="sun-time-info">
            <div className="sun-time-label">Sunset</div>
            <div className="sun-time-value">
              {weather.sunset ? formatTime(weather.sunset) : '--:--'}
            </div>
          </div>
        </div>

        <div className="day-length">
          <div className="day-length-header">
            <span>Day Length</span>
          </div>
          <div className="day-length-value">
            {calculateDayLength()}
          </div>
        </div>
      </div>

     
    </div>
  );
};
