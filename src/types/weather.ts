export type WeatherCondition =
  | "clear"
  | "partly-cloudy"
  | "cloudy"
  | "drizzle"
  | "rainy"
  | "stormy"
  | "snowy"
  | "foggy"
  | "windy";

export interface CurrentWeather {
  city: string;
  country: string;
  tempC: number;
  tempF: number;
  feelsLikeC: number;
  feelsLikeF: number;
  condition: WeatherCondition;
  conditionLabel: string;
  humidity: number;
  windSpeed: number;
  windKph?: number;
  windMph?: number;
  visibility: number;
  pressure: number;
  uvIndex?: number;
  sunrise?: string;
  sunset?: string;
  iconCode: string;
  isDay: boolean;
  localTime: string;
  timezone: string;
  lat: number;
  lon: number;
}

export interface ForecastDay {
  day: string;
  date: string;
  condition: WeatherCondition;
  conditionLabel: string;
  iconCode: string;
  highC: number;
  lowC: number;
  highF: number;
  lowF: number;
  humidity: number;
  windSpeed: number;
}

export interface CitySuggestion {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}
