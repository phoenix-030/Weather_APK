import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  fetchWeatherByCoords,
  searchCities,
  type CitySearchResult,
  type WeatherData,
} from "../services/weatherApi";

type SearchInputProps = {
  isVisible: boolean;
  onClose: () => void;
  onSearch?: (text: string) => void;
};

const SearchInput = ({ isVisible, onClose, onSearch }: SearchInputProps) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<CitySearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<{
    [key: string]: WeatherData;
  }>({});

  useEffect(() => {
    const performSearch = async () => {
      if (searchText.length >= 2) {
        setLoading(true);
        const results = await searchCities(searchText);
        setSearchResults(results);

        // fetch
        const weatherPromises = results.slice(0, 3).map(async (city) => {
          try {
            const weather = await fetchWeatherByCoords(city.lat, city.lon);
            return { key: `${city.name}-${city.country}`, weather };
          } catch {
            return null;
          }
        });

        const weatherResults = await Promise.all(weatherPromises);
        const newWeatherData: { [key: string]: WeatherData } = {};
        weatherResults.forEach((result) => {
          if (result) {
            newWeatherData[result.key] = result.weather;
          }
        });

        setWeatherData(newWeatherData);
        setLoading(false);
      } else {
        setSearchResults([]);
        setWeatherData({});
      }
    };

    const timeoutId = setTimeout(performSearch, 500);
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  if (!isVisible) return null;

  const handleSearch = (overrideText?: string) => {
    const text = overrideText ?? searchText;
    if (onSearch) {
      onSearch(text);
    }
    onClose();
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.searchContainer}>
        <View style={styles.searchHeader}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <AntDesign name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Search Location</Text>
          <TouchableOpacity
            onPress={() => handleSearch()}
            style={styles.searchButton}
          >
            <AntDesign name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <AntDesign
            name="search"
            size={20}
            color="#888"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter city name..."
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
            onSubmitEditing={() => handleSearch()}
          />
        </View>

        <View style={styles.suggestions}>
          {loading && <Text style={styles.suggestionTitle}>Searching...</Text>}

          {!loading && searchText.length < 2 && (
            <>
              <Text style={styles.suggestionTitle}>
                Start typing to see real-time weather
              </Text>
              <Text style={styles.hintText}>
                Search for any city worldwide to see current weather conditions
              </Text>
            </>
          )}

          {!loading && searchResults.length > 0 && (
            <>
              <Text style={styles.suggestionTitle}>
                Real-time Weather Results
              </Text>
              {searchResults.slice(0, 3).map((city) => {
                const weather = weatherData[`${city.name}-${city.country}`];
                return (
                  <TouchableOpacity
                    key={`${city.name}-${city.country}`}
                    style={styles.weatherSuggestionItem}
                    onPress={() => {
                      handleSearch(`${city.name}, ${city.country}`);
                    }}
                  >
                    <View style={styles.weatherContent}>
                      <View style={styles.citySection}>
                        <AntDesign name="environment" size={16} color="#888" />
                        <View style={styles.cityInfo}>
                          <Text style={styles.suggestionText}>{city.name}</Text>
                          <Text style={styles.countryText}>{city.country}</Text>
                        </View>
                      </View>

                      {weather && (
                        <View style={styles.weatherSection}>
                          <Text style={styles.weatherTemp}>
                            {weather.current.temp}°
                          </Text>
                          <Text style={styles.weatherIcon}>
                            {weather.current.icon}
                          </Text>
                          <Text style={styles.weatherCondition}>
                            {weather.current.condition}
                          </Text>
                        </View>
                      )}

                      {!weather && (
                        <View style={styles.weatherSection}>
                          <Text style={styles.loadingText}>Loading...</Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </>
          )}

          {!loading && searchText.length >= 2 && searchResults.length === 0 && (
            <Text style={styles.suggestionTitle}>No cities found</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    zIndex: 1000,
  },
  searchContainer: {
    paddingTop: 80,
    paddingHorizontal: 20,
    flex: 1,
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  searchButton: {
    padding: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#fff",
    fontSize: 16,
  },
  suggestions: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 16,
    color: "#888",
    marginBottom: 15,
    fontWeight: "500",
  },
  hintText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 20,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  cityInfo: {
    flex: 1,
    marginLeft: 15,
  },
  suggestionText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  weatherSuggestionItem: {
    flexDirection: "column",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  weatherContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  citySection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  weatherSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  weatherTemp: {
    fontSize: 24,
    fontWeight: "300",
    color: "#fff",
  },
  weatherIcon: {
    fontSize: 20,
  },
  weatherCondition: {
    fontSize: 14,
    color: "#ccc",
    maxWidth: 100,
    textAlign: "right",
  },
  loadingText: {
    fontSize: 14,
    color: "#888",
  },
  countryText: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
});

export default SearchInput;
