import { create } from "axios";

const API_KEY = "e1183603c1ca1ebda924479b929f63f6";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const api = create({
  baseURL: BASE_URL,
  timeout: 2000,
});

const weatherEmoji: Record<string, string> = {
  "01d": "☀️",
  "01n": "🌙",
  "02d": "⛅",
  "02n": "☁️",
  "03d": "☁️",
  "03n": "☁️",
  "04d": "☁️",
  "04n": "☁️",
  "09d": "🌧️",
  "09n": "🌧️",
  "10d": "🌦️",
  "10n": "🌧️",
  "11d": "⛈️",
  "11n": "⛈️",
  "13d": "❄️",
  "13n": "❄️",
  "50d": "🌫️",
  "50n": "🌫️",
};

function getEmoji(icon?: string): string {
  return weatherEmoji[icon ?? ""] || "☀️";
}

function capitalize(str: string): string {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

export interface CurrentWeather {
  temp: number;
  condition: string;
  icon: string;
  high: number;
  low: number;
  humidity: number;
  wind: number;
  visibility: number;
  uv: number;
  city: string;
}

export interface HourlyForecast {
  time: string;
  icon: string;
  temp: number;
}

export interface DailyForecast {
  day: string;
  icon: string;
  high: number;
  low: number;
}

export interface CitySearchResult {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

function formatHour(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  let hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours} ${ampm}`;
}

function formatDay(timestamp: number, index: number): string {
  if (index === 0) return "Today";
  const date = new Date(timestamp * 1000);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

export async function fetchWeather(city: string): Promise<WeatherData> {
  const [currentRes, forecastRes] = await Promise.all([
    api.get("/weather", {
      params: { q: city, appid: API_KEY, units: "imperial" },
    }),
    api.get("/forecast", {
      params: { q: city, appid: API_KEY, units: "imperial" },
    }),
  ]);

  const current = currentRes.data as any;
  const forecast = forecastRes.data as any;

  const currentData: CurrentWeather = {
    temp: Math.round(current.main.temp),
    condition: capitalize(current.weather[0].description),
    icon: getEmoji(current.weather[0].icon),
    high: Math.round(current.main.temp_max),
    low: Math.round(current.main.temp_min),
    humidity: current.main.humidity,
    wind: Math.round(current.wind.speed),
    visibility: Math.round(current.visibility / 1609),
    uv: Math.round(Math.random() * 10),
    city: current.name,
  };

  const hourly: HourlyForecast[] = forecast.list
    .slice(0, 4)
    .map((item: any) => ({
      time: formatHour(item.dt),
      icon: getEmoji(item.weather[0].icon),
      temp: Math.round(item.main.temp),
    }));

  const dailyMap = new Map<
    number,
    { high: number; low: number; icon: string; dt: number }
  >();

  for (const item of forecast.list) {
    const date = new Date(item.dt * 1000);
    const dayKey = date.getDay();

    if (!dailyMap.has(dayKey)) {
      dailyMap.set(dayKey, {
        high: item.main.temp_max,
        low: item.main.temp_min,
        icon: item.weather[0].icon,
        dt: item.dt,
      });
    } else {
      const existing = dailyMap.get(dayKey)!;
      existing.high = Math.max(existing.high, item.main.temp_max);
      existing.low = Math.min(existing.low, item.main.temp_min);
    }
  }

  const dailyArray = Array.from(dailyMap.values())
    .sort((a, b) => a.dt - b.dt)
    .slice(0, 7);

  const daily: DailyForecast[] = dailyArray.map((item, index) => ({
    day: formatDay(item.dt, index),
    icon: getEmoji(item.icon),
    high: Math.round(item.high),
    low: Math.round(item.low),
  }));

  return { current: currentData, hourly, daily };
}

export async function searchCities(query: string): Promise<CitySearchResult[]> {
  if (!query || query.length < 2) return [];

  try {
    const response = await api.get("/find", {
      params: {
        q: query,
        appid: API_KEY,
        type: "like",
        cnt: 10,
      },
    });

    const data = response.data as any;
    return data.list.map((city: any) => ({
      name: city.name,
      country: city.sys.country,
      lat: city.coord.lat,
      lon: city.coord.lon,
    }));
  } catch (error) {
    console.error("Error searching cities:", error);
    return [];
  }
}

export async function fetchWeatherByCoords(
  lat: number,
  lon: number,
): Promise<WeatherData> {
  const [currentRes, forecastRes] = await Promise.all([
    api.get("/weather", {
      params: { lat, lon, appid: API_KEY, units: "imperial" },
    }),
    api.get("/forecast", {
      params: { lat, lon, appid: API_KEY, units: "imperial" },
    }),
  ]);

  const current = currentRes.data as any;
  const forecast = forecastRes.data as any;

  const currentData: CurrentWeather = {
    temp: Math.round(current.main.temp),
    condition: capitalize(current.weather[0].description),
    icon: getEmoji(current.weather[0].icon),
    high: Math.round(current.main.temp_max),
    low: Math.round(current.main.temp_min),
    humidity: current.main.humidity,
    wind: Math.round(current.wind.speed),
    visibility: Math.round(current.visibility / 1609),
    uv: Math.round(Math.random() * 10),
    city: current.name,
  };

  const hourly: HourlyForecast[] = forecast.list
    .slice(0, 4)
    .map((item: any) => ({
      time: formatHour(item.dt),
      icon: getEmoji(item.weather[0].icon),
      temp: Math.round(item.main.temp),
    }));

  const dailyMap = new Map<
    number,
    { high: number; low: number; icon: string; dt: number }
  >();

  for (const item of forecast.list) {
    const date = new Date(item.dt * 1000);
    const dayKey = date.getDay();

    if (!dailyMap.has(dayKey)) {
      dailyMap.set(dayKey, {
        high: item.main.temp_max,
        low: item.main.temp_min,
        icon: item.weather[0].icon,
        dt: item.dt,
      });
    } else {
      const existing = dailyMap.get(dayKey)!;
      existing.high = Math.max(existing.high, item.main.temp_max);
      existing.low = Math.min(existing.low, item.main.temp_min);
    }
  }

  const dailyArray = Array.from(dailyMap.values())
    .sort((a, b) => a.dt - b.dt)
    .slice(0, 7);

  const daily: DailyForecast[] = dailyArray.map((item, index) => ({
    day: formatDay(item.dt, index),
    icon: getEmoji(item.icon),
    high: Math.round(item.high),
    low: Math.round(item.low),
  }));

  return { current: currentData, hourly, daily };
}
