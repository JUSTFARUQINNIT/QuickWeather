import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  Wind,
} from "lucide-react";
import type { WeatherCondition } from "../types/weather";

const iconMap: Record<WeatherCondition, React.ElementType> = {
  clear: Sun,
  "partly-cloudy": CloudSun,
  cloudy: Cloud,
  drizzle: CloudDrizzle,
  rainy: CloudRain,
  stormy: CloudLightning,
  snowy: CloudSnow,
  foggy: CloudFog,
  windy: Wind,
};

interface WeatherIconProps {
  condition: WeatherCondition;
  size?: number;
  className?: string;
}

export function WeatherIcon({
  condition,
  size = 64,
  className = "",
}: WeatherIconProps) {
  const Icon = iconMap[condition] || Cloud;
  return (
    <Icon
      size={size}
      className={`weather-icon ${className}`}
      strokeWidth={1.5}
    />
  );
}
