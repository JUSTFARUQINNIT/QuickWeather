import type { WeatherCondition } from "../types/weather";

interface WeatherAdvice {
  emoji: string;
  text: string;
}

export function getWeatherAdvice(
  condition: WeatherCondition,
  tempC: number,
): WeatherAdvice {
  if (tempC >= 40)
    return {
      emoji: "🥵",
      text: "Extreme heat! Stay indoors and drink plenty of water.",
    };
  if (tempC <= -10)
    return { emoji: "🥶", text: "Extremely cold! Bundle up in heavy layers." };

  switch (condition) {
    case "stormy":
      return {
        emoji: "⛈️",
        text: "Thunderstorm expected. Stay indoors if possible.",
      };
    case "rainy":
      return { emoji: "☔", text: "Don't forget your umbrella today!" };
    case "drizzle":
      return { emoji: "🌂", text: "Light rain - a light jacket should do." };
    case "snowy":
      return {
        emoji: "🧣",
        text: "Snowy conditions - wear warm layers and boots.",
      };
    case "foggy":
      return { emoji: "🌫️", text: "Low visibility - drive carefully." };
    case "windy":
      return { emoji: "💨", text: "Strong winds today. Secure loose items." };
    case "cloudy":
    case "partly-cloudy":
      if (tempC > 30)
        return { emoji: "😎", text: "Warm and overcast - stay hydrated." };
      if (tempC < 10)
        return { emoji: "🧥", text: "Cool and cloudy - wear a jacket." };
      return { emoji: "⛅", text: "Comfortable weather with some clouds." };
    case "clear":
      if (tempC > 30)
        return {
          emoji: "🧴",
          text: "Hot and sunny - wear sunscreen and stay cool.",
        };
      if (tempC < 10)
        return { emoji: "🧥", text: "Clear but chilly - bring a jacket." };
      return {
        emoji: "☀️",
        text: "Beautiful day! Great for outdoor activities.",
      };
    default:
      return { emoji: "🌤️", text: "Have a great day!" };
  }
}
