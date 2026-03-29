import type {
  CitySuggestion,
  CurrentWeather,
  ForecastDay,
  WeatherCondition,
} from "../types/weather";

const API_KEY =
  import.meta.env.VITE_OPENWEATHER_API_KEY ||
  "";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

function mapCondition(
  weatherId: number,
  windSpeed: number,
): { condition: WeatherCondition; label: string } {
  if (weatherId >= 200 && weatherId < 300)
    return { condition: "stormy", label: "Thunderstorm" };
  if (weatherId >= 300 && weatherId < 400)
    return { condition: "drizzle", label: "Drizzle" };
  if (weatherId >= 500 && weatherId < 600)
    return { condition: "rainy", label: "Rainy" };
  if (weatherId >= 600 && weatherId < 700)
    return { condition: "snowy", label: "Snowy" };
  if (weatherId >= 700 && weatherId < 800)
    return { condition: "foggy", label: "Foggy" };
  if (weatherId === 800) {
    if (windSpeed > 10) return { condition: "windy", label: "Windy" };
    return { condition: "clear", label: "Clear Sky" };
  }
  if (weatherId === 801)
    return { condition: "partly-cloudy", label: "Partly Cloudy" };
  if (weatherId >= 802) return { condition: "cloudy", label: "Cloudy" };
  return { condition: "clear", label: "Clear" };
}

function cToF(c: number): number {
  return Math.round((c * 9) / 5 + 32);
}

function formatLocalTime(dtUnix: number, timezoneOffset: number): string {
  const utcMs = dtUnix * 1000;
  const localMs = utcMs + timezoneOffset * 1000;
  const d = new Date(localMs);
  const hours = d.getUTCHours();
  const minutes = d.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const h = hours % 12 || 12;
  const m = minutes.toString().padStart(2, "0");
  return `${h}:${m} ${ampm}`;
}

function getTimezoneLabel(offset: number): string {
  const hours = Math.floor(Math.abs(offset) / 3600);
  const sign = offset >= 0 ? "+" : "-";
  return `UTC${sign}${hours}`;
}

function checkApiKey(): void {
  if (!API_KEY) {
    throw new Error(
      "OpenWeatherMap API key is not configured. Please set VITE_OPENWEATHER_API_KEY in your environment.",
    );
  }
}

export async function fetchCurrentWeather(
  query: string,
): Promise<CurrentWeather> {
  checkApiKey();
  const res = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=metric`,
  );
  if (!res.ok) {
    if (res.status === 404)
      throw new Error("City not found. Please try a different search.");
    if (res.status === 401)
      throw new Error("Invalid API key. Please check your configuration.");
    throw new Error("Failed to fetch weather data. Please try again.");
  }
  const data = await res.json();
  return parseCurrentWeather(data);
}

export async function fetchCurrentWeatherByCoords(
  lat: number,
  lon: number,
): Promise<CurrentWeather> {
  checkApiKey();
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  );
  if (!res.ok)
    throw new Error("Failed to fetch weather data for your location.");
  const data = await res.json();
  return parseCurrentWeather(data);
}

function parseCurrentWeather(data: any): CurrentWeather {
  const { condition, label } = mapCondition(
    data.weather[0].id,
    data.wind.speed,
  );
  const iconCode = data.weather[0].icon;
  const isDay = iconCode.endsWith("d");
  const tempC = Math.round(data.main.temp);
  const feelsLikeC = Math.round(data.main.feels_like);

  return {
    city: data.name,
    country: data.sys.country,
    tempC,
    tempF: cToF(tempC),
    feelsLikeC,
    feelsLikeF: cToF(feelsLikeC),
    condition,
    conditionLabel: label,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6),
    visibility: Math.round((data.visibility || 10000) / 1000),
    pressure: data.main.pressure,
    iconCode,
    isDay,
    localTime: formatLocalTime(data.dt, data.timezone),
    timezone: getTimezoneLabel(data.timezone),
    lat: data.coord.lat,
    lon: data.coord.lon,
  };
}

export async function fetchForecast(query: string): Promise<ForecastDay[]> {
  checkApiKey();
  const res = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=metric`,
  );
  if (!res.ok) return [];
  const data = await res.json();
  return parseForecast(data);
}

export async function fetchForecastByCoords(
  lat: number,
  lon: number,
): Promise<ForecastDay[]> {
  checkApiKey();
  const res = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  );
  if (!res.ok) return [];
  const data = await res.json();
  return parseForecast(data);
}

function parseForecast(data: any): ForecastDay[] {
  const dailyMap = new Map<
    string,
    {
      temps: number[];
      conditions: { id: number; icon: string; label: string }[];
      humidity: number[];
      wind: number[];
      dt: number;
    }
  >();

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  for (const item of data.list) {
    const date = item.dt_txt.split(" ")[0];
    if (date === todayStr) continue;

    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        temps: [],
        conditions: [],
        humidity: [],
        wind: [],
        dt: item.dt,
      });
    }
    const entry = dailyMap.get(date)!;
    entry.temps.push(item.main.temp);
    entry.conditions.push({
      id: item.weather[0].id,
      icon: item.weather[0].icon,
      label: item.weather[0].description,
    });
    entry.humidity.push(item.main.humidity);
    entry.wind.push(item.wind.speed);
  }

  const days: ForecastDay[] = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (const [date, entry] of dailyMap) {
    if (days.length >= 5) break;

    const d = new Date(date);
    const highC = Math.round(Math.max(...entry.temps));
    const lowC = Math.round(Math.min(...entry.temps));
    const midCondition =
      entry.conditions[Math.floor(entry.conditions.length / 2)];
    const { condition, label } = mapCondition(midCondition.id, 0);

    days.push({
      day: dayNames[d.getUTCDay()],
      date,
      condition,
      conditionLabel: label,
      iconCode: midCondition.icon,
      highC,
      lowC,
      highF: cToF(highC),
      lowF: cToF(lowC),
      humidity: Math.round(
        entry.humidity.reduce((a, b) => a + b, 0) / entry.humidity.length,
      ),
      windSpeed: Math.round(
        (entry.wind.reduce((a, b) => a + b, 0) / entry.wind.length) * 3.6,
      ),
    });
  }

  return days;
}

export async function fetchCitySuggestions(
  query: string,
): Promise<CitySuggestion[]> {
  if (!API_KEY || query.trim().length < 2) return [];
  try {
    const res = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`,
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((item: any) => ({
      name: item.name,
      country: item.country,
      state: item.state,
      lat: item.lat,
      lon: item.lon,
    }));
  } catch {
    return [];
  }
}
