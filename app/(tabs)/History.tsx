import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  getHistory,
  type WeatherHistoryItem,
} from "../../services/weatherHistory";

const History = () => {
  const [history, setHistory] = useState<WeatherHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const historyData = await getHistory();
      setHistory(historyData);
    } catch (error) {
      console.error("Error loading history:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7)
      return date.toLocaleDateString("en-US", { weekday: "long" });
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Weather History</Text>

          {loading && (
            <Text style={styles.loadingText}>Loading history...</Text>
          )}

          {!loading && history.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No History Yet</Text>
              <Text style={styles.emptySubtitle}>
                Search for cities to build your weather history
              </Text>
            </View>
          )}

          {!loading &&
            history.length > 0 &&
            history.map((item) => (
              <BlurView
                key={item.id}
                intensity={15}
                tint="light"
                style={styles.card}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.dateSection}>
                    <Text style={styles.date}>
                      {formatDate(item.timestamp)}
                    </Text>
                    <Text style={styles.time}>
                      {formatTime(item.timestamp)}
                    </Text>
                  </View>
                  <Text style={styles.cityName}>{item.city}</Text>
                </View>

                <View style={styles.weatherMain}>
                  <View style={styles.tempSection}>
                    <Text style={styles.temp}>{item.temp}°</Text>
                    <Text style={styles.condition}>{item.condition}</Text>
                  </View>

                  <View style={styles.iconSection}>
                    <Text style={styles.weatherIcon}>{item.icon}</Text>
                  </View>
                </View>

                <View style={styles.details}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Humidity</Text>
                    <Text style={styles.detailValue}>{item.humidity}%</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Wind</Text>
                    <Text style={styles.detailValue}>{item.wind} mph</Text>
                  </View>
                </View>
              </BlurView>
            ))}
        </View>
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
  scrollView: {
    flexGrow: 1,
    paddingVertical: 0,
    marginTop: 60,
  },
  content: {
    width: "100%",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 50,
  },
  emptyState: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  dateSection: {
    flexDirection: "column",
  },
  date: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  time: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  cityName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FB923C",
  },
  weatherMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  tempSection: {
    flex: 1,
  },
  temp: {
    fontSize: 32,
    fontWeight: "300",
    color: "#fff",
  },
  condition: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 2,
  },
  iconSection: {
    alignItems: "center",
  },
  weatherIcon: {
    fontSize: 32,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    alignItems: "center",
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
});

export default History;
