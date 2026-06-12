import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Settings() {
  const [temperatureUnit, setTemperatureUnit] = useState<
    "celsius" | "fahrenheit"
  >("fahrenheit");
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [historyCount, setHistoryCount] = useState(0);

  useEffect(() => {
    loadSettings();
    loadHistoryCount();
  }, []);

  const loadSettings = async () => {
    try {
      const unit = await AsyncStorage.getItem("temperatureUnit");
      const notif = await AsyncStorage.getItem("notifications");
      const refresh = await AsyncStorage.getItem("autoRefresh");
      if (unit) setTemperatureUnit(unit as "celsius" | "fahrenheit");
      if (notif !== null) setNotifications(JSON.parse(notif));
      if (refresh !== null) setAutoRefresh(JSON.parse(refresh));
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const loadHistoryCount = async () => {
    try {
      const history = await AsyncStorage.getItem("weatherHistory");
      if (history) {
        const parsed = JSON.parse(history);
        setHistoryCount(parsed.length);
      }
    } catch (error) {
      console.error("Error loading history count:", error);
    }
  };

  const saveSetting = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving setting:", error);
    }
  };

  const toggleTemperatureUnit = async () => {
    const newUnit = temperatureUnit === "fahrenheit" ? "celsius" : "fahrenheit";
    setTemperatureUnit(newUnit);
    await AsyncStorage.setItem("temperatureUnit", newUnit);
  };

  const toggleNotifications = async () => {
    const newValue = !notifications;
    setNotifications(newValue);
    await saveSetting("notifications", newValue);
  };

  const toggleAutoRefresh = async () => {
    const newValue = !autoRefresh;
    setAutoRefresh(newValue);
    await saveSetting("autoRefresh", newValue);
  };

  const clearAllHistory = () => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to delete all weather history? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("weatherHistory");
              setHistoryCount(0);
              Alert.alert("Success", "All history has been cleared.");
            } catch (error) {
              console.error("Error clearing history:", error);
              Alert.alert("Error", "Failed to clear history.");
            }
          },
        },
      ],
    );
  };

  const SettingItem = ({
    icon,
    title,
    subtitle,
    action,
    rightElement,
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    action?: () => void;
    rightElement?: React.ReactNode;
  }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={action}
      disabled={!action}
    >
      <View style={styles.settingLeft}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <View>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightElement && <View style={styles.settingRight}>{rightElement}</View>}
    </TouchableOpacity>
  );



  
  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.headerTitle}>Settings</Text>

          <BlurView intensity={30} style={styles.section}>
            <Text style={styles.sectionTitle}>Units</Text>
            <SettingItem
              icon="🌡️"
              title="Temperature Unit"
              subtitle={
                temperatureUnit === "fahrenheit"
                  ? "Fahrenheit (°F)"
                  : "Celsius (°C)"
              }
              action={toggleTemperatureUnit}
              rightElement={
                <View style={styles.toggleBadge}>
                  <Text style={styles.toggleBadgeText}>
                    {temperatureUnit === "fahrenheit" ? "°F" : "°C"}
                  </Text>
                </View>
              }
            />
          </BlurView>

          <BlurView intensity={30} style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <SettingItem
              icon="🔔"
              title="Notifications"
              subtitle="Get weather alerts and updates"
              rightElement={
                <Switch
                  value={notifications}
                  onValueChange={toggleNotifications}
                  trackColor={{ false: "#767577", true: "#4A90D9" }}
                  thumbColor={notifications ? "#fff" : "#f4f3f4"}
                />
              }
            />
            <SettingItem
              icon="🔄"
              title="Auto Refresh"
              subtitle="Automatically refresh weather data"
              rightElement={
                <Switch
                  value={autoRefresh}
                  onValueChange={toggleAutoRefresh}
                  trackColor={{ false: "#767577", true: "#4A90D9" }}
                  thumbColor={autoRefresh ? "#fff" : "#f4f3f4"}
                />
              }
            />
          </BlurView>

          <BlurView intensity={30} style={styles.section}>
            <Text style={styles.sectionTitle}>Data Management</Text>
            <SettingItem
              icon="📜"
              title="Clear Weather History"
              subtitle={`${historyCount} items stored`}
              action={clearAllHistory}
              rightElement={
                <View style={styles.clearButton}>
                  <Text style={styles.clearButtonText}>Clear</Text>
                </View>
              }
            />
            <SettingItem
              icon="🗑️"
              title="Reset All Settings"
              action={() => {
                Alert.alert(
                  "Reset Settings",
                  "Reset all settings to default?",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Reset",
                      style: "destructive",
                      onPress: async () => {
                        await AsyncStorage.multiRemove([
                          "temperatureUnit",
                          "notifications",
                          "autoRefresh",
                        ]);
                        setTemperatureUnit("fahrenheit");
                        setNotifications(true);
                        setAutoRefresh(false);
                        Alert.alert("Success", "Settings reset to default.");
                      },
                    },
                  ],
                );
              }}
            />
          </BlurView>

          <BlurView intensity={30} style={styles.section}>
            <Text style={styles.sectionTitle}>App Info</Text>
            <SettingItem icon="📱" title="Version" subtitle="1.0.0" />
            <SettingItem icon="🔧" title="Build" subtitle="Release" />
          </BlurView>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  scrollView: {
    flexGrow: 1,
    paddingVertical: 20,
    marginTop: 60,
  },
  content: {
    width: "100%",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  section: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255,255,255,0.6)",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  settingSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    marginTop: 2,
  },
  settingRight: {
    marginLeft: 12,
  },
  toggleBadge: {
    backgroundColor: "rgba(74, 144, 217, 0.3)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  toggleBadgeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  clearButton: {
    backgroundColor: "rgba(255, 59, 48, 0.3)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  clearButtonText: {
    color: "#FF3B30",
    fontWeight: "600",
    fontSize: 14,
  },
});
