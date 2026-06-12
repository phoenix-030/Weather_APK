import AsyncStorage from "@react-native-async-storage/async-storage";
import { type WeatherData } from "./weatherApi";

export interface WeatherHistoryItem {
  id: string;
  city: string;
  temp: number;
  condition: string;
  icon: string;
  humidity: number;
  wind: number;
  timestamp: number;
  date: string;
}

const STORAGE_KEY = "weatherHistory";
const MAX_HISTORY_ITEMS = 50;

export const saveToHistory = async (
  weatherData: WeatherData,
): Promise<void> => {
  try {
    const historyItem: WeatherHistoryItem = {
      id: `${weatherData.current.city}-${Date.now()}`,
      city: weatherData.current.city,
      temp: weatherData.current.temp,
      condition: weatherData.current.condition,
      icon: weatherData.current.icon,
      humidity: weatherData.current.humidity,
      wind: weatherData.current.wind,
      timestamp: Date.now(),
      date: new Date().toISOString(),
    };

    const existingHistory = await getHistory();
    const updatedHistory = [historyItem, ...existingHistory].slice(
      0,
      MAX_HISTORY_ITEMS,
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Error saving to history:", error);
  }
};

export const getHistory = async (): Promise<WeatherHistoryItem[]> => {
  try {
    const storedHistory = await AsyncStorage.getItem(STORAGE_KEY);
    return storedHistory ? JSON.parse(storedHistory) : [];
  } catch (error) {
    console.error("Error getting history:", error);
    return [];
  }
};

export const clearHistory = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing history:", error);
  }
};

export const deleteHistoryItem = async (id: string): Promise<void> => {
  try {
    const existingHistory = await getHistory();
    const updatedHistory = existingHistory.filter((item) => item.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Error deleting history item:", error);
  }
};
