import React from 'react';
import { MapPin, Cloud } from 'lucide-react';
import type { CurrentWeather } from '../types/weather';

interface OtherCitiesProps {
  cities: Array<{
    name: string;
    temp: number;
    condition: string;
    icon: string;
  }>;
  unit: 'C' | 'F';
  onCitySelect: (city: string) => void;
}

export const OtherCities: React.FC<OtherCitiesProps> = ({ cities, unit, onCitySelect }) => {
  return (
    <div className="other-cities">
      <div className="cities-header">
        <MapPin size={20} />
        <span>Other Cities</span>
      </div>
      
      <div className="cities-grid">
        {cities.map((city, index) => (
          <div 
            key={index}
            className="city-card"
            onClick={() => onCitySelect(city.name)}
          >
            <div className="city-info">
              <div className="city-name">{city.name}</div>
              <div className="city-temp">
                {Math.round(city.temp)}°{unit}
              </div>
            </div>
            <div className="city-condition">
              <Cloud size={24} />
              <span>{city.condition}</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .other-cities {
          margin: 2rem 0;
        }

        .cities-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .cities-header svg {
          color: #3b82f6;
        }

        .cities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .city-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 1.25rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .city-card:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.15);
        }

        .city-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .city-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: white;
        }

        .city-temp {
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
        }

        .city-condition {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.85rem;
        }

        .city-condition svg {
          color: #3b82f6;
        }

        @media (max-width: 768px) {
          .cities-grid {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 0.75rem;
          }

          .city-card {
            padding: 1rem;
          }

          .city-temp {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .cities-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }

          .city-card {
            padding: 0.875rem;
          }

          .city-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};
