import type { WeatherCondition } from "../types/weather";

interface BackgroundTheme {
  gradient: string;
  overlayOpacity: number;
}

const dayThemes: Record<WeatherCondition, BackgroundTheme> = {
  clear: {
    gradient: "linear-gradient(180deg, #4a90e2 0%, #87ceeb 40%, #b8d4f0 100%)",
    overlayOpacity: 0,
  },
  "partly-cloudy": {
    gradient: "linear-gradient(180deg, #5a9be6 0%, #8eb8d9 50%, #c4d4e0 100%)",
    overlayOpacity: 0.05,
  },
  cloudy: {
    gradient: "linear-gradient(180deg, #7a8ea0 0%, #9eaebb 50%, #bcc8d4 100%)",
    overlayOpacity: 0.1,
  },
  drizzle: {
    gradient: "linear-gradient(180deg, #5a7a8a 0%, #7a9aaa 50%, #98b0bc 100%)",
    overlayOpacity: 0.15,
  },
  rainy: {
    gradient: "linear-gradient(180deg, #3d5a6e 0%, #5a7a8e 50%, #7a98a8 100%)",
    overlayOpacity: 0.2,
  },
  stormy: {
    gradient: "linear-gradient(180deg, #2a3a4a 0%, #3d4e5e 50%, #556a78 100%)",
    overlayOpacity: 0.3,
  },
  snowy: {
    gradient: "linear-gradient(180deg, #a8b8c8 0%, #c8d4e0 50%, #e0e8f0 100%)",
    overlayOpacity: 0.05,
  },
  foggy: {
    gradient: "linear-gradient(180deg, #8a9aaa 0%, #a8b4c0 50%, #c4ccd6 100%)",
    overlayOpacity: 0.15,
  },
  windy: {
    gradient: "linear-gradient(180deg, #5a8ab0 0%, #7aaac8 50%, #a0c4d8 100%)",
    overlayOpacity: 0.05,
  },
};

const nightThemes: Record<WeatherCondition, BackgroundTheme> = {
  clear: {
    gradient: "linear-gradient(180deg, #0a1628 0%, #1a2a4a 40%, #2a3a5a 100%)",
    overlayOpacity: 0,
  },
  "partly-cloudy": {
    gradient: "linear-gradient(180deg, #101e34 0%, #1e2e48 50%, #2e3e58 100%)",
    overlayOpacity: 0.05,
  },
  cloudy: {
    gradient: "linear-gradient(180deg, #1a2432 0%, #2a3444 50%, #3a4454 100%)",
    overlayOpacity: 0.1,
  },
  drizzle: {
    gradient: "linear-gradient(180deg, #141e2a 0%, #1e2a3a 50%, #283444 100%)",
    overlayOpacity: 0.15,
  },
  rainy: {
    gradient: "linear-gradient(180deg, #0e1822 0%, #182432 50%, #223040 100%)",
    overlayOpacity: 0.2,
  },
  stormy: {
    gradient: "linear-gradient(180deg, #080e18 0%, #101820 50%, #182028 100%)",
    overlayOpacity: 0.3,
  },
  snowy: {
    gradient: "linear-gradient(180deg, #1e2a3a 0%, #2e3a4e 50%, #3e4a5e 100%)",
    overlayOpacity: 0.05,
  },
  foggy: {
    gradient: "linear-gradient(180deg, #1a222e 0%, #28303e 50%, #363e4c 100%)",
    overlayOpacity: 0.15,
  },
  windy: {
    gradient: "linear-gradient(180deg, #0e1a2a 0%, #1a2a40 50%, #263a52 100%)",
    overlayOpacity: 0.05,
  },
};

export function getBackgroundTheme(
  condition: WeatherCondition,
  isDay: boolean,
): BackgroundTheme {
  const themes = isDay ? dayThemes : nightThemes;
  return themes[condition] || themes.clear;
}

export function getTextColor(isDay: boolean): string {
  return isDay ? "#1e2a3a" : "#e8edf2";
}

export function getMutedColor(isDay: boolean): string {
  return isDay ? "#6b7c93" : "#8a9ab0";
}

export function getGlassBg(isDay: boolean): string {
  return isDay ? "rgba(255, 255, 255, 0.72)" : "rgba(20, 30, 50, 0.72)";
}

export function getGlassBorder(isDay: boolean): string {
  return isDay ? "rgba(255, 255, 255, 0.35)" : "rgba(60, 80, 110, 0.35)";
}
