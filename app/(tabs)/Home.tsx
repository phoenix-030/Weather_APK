import { BlurView } from "expo-blur";
import * as Location from "expo-location";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  fetchWeather,
  fetchWeatherByCoords,
  type WeatherData,
} from "../../services/weatherApi";
import { saveToHistory } from "../../services/weatherHistory";

const Content = () => {
  const [refreshingState, setRefreshingState] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadWeather = useCallback(async (city: string) => {
    try {
      const data = await fetchWeather(city);
      setWeather(data);

      // Save to history
      saveToHistory(data).catch(console.error);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshingState(false);
    }
  }, []);

  // current location will be shw
  const loadLocationWeather = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn(
          "Location permission denied, falling back to default city",
        );
        setLoading(false);
        setRefreshingState(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const data = await fetchWeatherByCoords(
        location.coords.latitude,
        location.coords.longitude,
      );
      setWeather(data);
    } catch (err) {
      console.error("Error fetching location weather:", err);
    } finally {
      setLoading(false);
      setRefreshingState(false);
    }
  }, []);

  useEffect(() => {
    loadLocationWeather();
  }, [loadLocationWeather]);

  const onRefresh = () => {
    setRefreshingState(true);
    loadLocationWeather();
  };

  const handleSearch = (city: string) => {
    setLoading(true);
    loadWeather(city);
  };

  (global as any).searchWeather = handleSearch;

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={styles.container}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshingState}
            onRefresh={onRefresh}
            colors={["#fa0707ff"]}
            tintColor="#ffffffc4"
          />
        }
      >
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}

        {weather && (
          <View style={styles.maincontainer}>
            <View style={styles.card}>
              <Text style={styles.temperature}>{weather.current.temp}°c</Text>
              <Text style={styles.cityName}>{weather.current.city}</Text>
              <View style={styles.conditionContainer}>
                <Text style={styles.conditionIcon}>{weather.current.icon}</Text>
                <Text style={styles.conditionText}>
                  {weather.current.condition}
                </Text>
              </View>
              <View style={styles.highLowContainer}>
                <Text style={styles.highLowText}>
                  H: {weather.current.high}° • L: {weather.current.low}°
                </Text>
              </View>
            </View>

            <View style={styles.gridcard}>
              <BlurView intensity={15} tint="light" style={styles.carddetail}>
                <Text style={styles.title}>HUMIDITY</Text>
                <Text style={styles.value}>{weather.current.humidity}%</Text>
              </BlurView>
              <BlurView intensity={15} tint="light" style={styles.carddetail}>
                <Text style={styles.title}>UV INDEX</Text>
                <Text style={styles.value}>{weather.current.uv}</Text>
              </BlurView>
              <BlurView intensity={15} tint="light" style={styles.carddetail}>
                <Text style={styles.title}>WIND</Text>
                <Text style={styles.value}>{weather.current.wind} mph</Text>
              </BlurView>

              <BlurView intensity={15} tint="light" style={styles.carddetail}>
                <Text style={styles.title}>VISIBILITY</Text>
                <Text style={styles.value}>
                  {weather.current.visibility} mi
                </Text>
              </BlurView>
            </View>

            <BlurView intensity={15} tint="light" style={styles.hourMaincard}>
              <Text style={styles.hourtitle}>Hourly Forecast</Text>

              <View style={styles.insidecontainer}>
                {weather.hourly.map((h, i) => (
                  <View style={styles.items} key={i}>
                    <Text style={styles.time}>{h.time}</Text>
                    <Text style={styles.icon}>{h.icon}</Text>
                    <Text style={styles.temp}>{h.temp}°</Text>
                  </View>
                ))}
              </View>
            </BlurView>

            <BlurView intensity={15} tint="light" style={styles.weekMaincard}>
              <Text style={styles.weektitle}>7-DAY FORECAST</Text>

              <View style={styles.weekItems}>
                {weather.daily.map((d, i) => (
                  <View style={styles.weekItem} key={i}>
                    <Text style={styles.weekDay}>{d.day}</Text>
                    <Text style={styles.weekIcon}>{d.icon}</Text>
                    <Text style={styles.weekTemp}>
                      {d.high}° / {d.low}°
                    </Text>
                  </View>
                ))}
              </View>
            </BlurView>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  loader: {
    paddingVertical: 40,
  },
  maincontainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
  card: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 32,
    width: 342,
    height: 216,
  },
  temperature: {
    fontSize: 80,
    fontWeight: "200",
    color: "#fff",
  },
  cityName: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "400",
    marginTop: 5,
    marginBottom: 10,
  },
  conditionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  conditionIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  conditionText: {
    fontSize: 18,
    color: "#fff",
  },
  highLowContainer: {
    marginTop: 20,
  },
  highLowText: {
    fontSize: 16,
    color: "#fff",
  },

  gridcard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: 342,
    marginTop: 55,
  },
  carddetail: {
    width: 160,
    height: 100,
    backgroundColor: "rgba(223, 213, 213, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 15,
    overflow: "hidden",
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "500",
    marginBottom: 5,
  },
  value: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },

  //   --hourcardde
  hourMaincard: {
    width: 342,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.43)",
    borderRadius: 15,
    overflow: "hidden",
    padding: 20,
    marginTop: 20,
  },
  hourtitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    marginBottom: 15,
  },
  insidecontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  items: {
    alignItems: "center",
    flex: 1,
  },
  time: {
    fontSize: 12,
    color: "#fff",
    marginBottom: 8,
  },
  icon: {
    fontSize: 20,
    marginBottom: 8,
  },
  temp: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },

  weekMaincard: {
    width: 342,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.44)",
    borderRadius: 15,
    overflow: "hidden",
    padding: 20,
    marginTop: 20,
  },
  weektitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    marginBottom: 15,
  },
  weekItems: {
    flexDirection: "column",
    gap: 12,
  },
  weekItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  weekDay: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    flex: 1,
  },
  weekIcon: {
    fontSize: 24,
    flex: 1,
    textAlign: "center",
  },
  weekTemp: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
});

export default Content;
