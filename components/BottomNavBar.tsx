import { router, usePathname } from "expo-router";
import React from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BottomNavBar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "Home" && pathname === "/") return true;
    return pathname.includes(path);
  };

  const getIconColor = (path: string) => (isActive(path) ? "#FF9500" : "white");

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.replace("/(tabs)/Home")}
      >
        <MaterialCommunityIcons 
          name="weather-lightning-rainy" 
          size={24} 
          color={getIconColor("Home")} 
          style={styles.navIcon} 
        />
        <Text style={[styles.navText, isActive("Home") && styles.activeText]}>
          Weather
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.replace("/(tabs)/radar")}
      >
        <Feather 
          name="map" 
          size={24} 
          color={getIconColor("radar")} 
          style={styles.navIcon} 
        />
        <Text style={[styles.navText, isActive("radar") && styles.activeText]}>
          Radar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.replace("/(tabs)/History")}
      >
        <MaterialCommunityIcons 
          name="history" 
          size={24} 
          color={getIconColor("History")} 
          style={styles.navIcon} 
        />
        <Text style={[styles.navText, isActive("History") && styles.activeText]}>
          History
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.replace("/(tabs)/Alerts")}
      >
        <AntDesign 
          name="alert" 
          size={24} 
          color={getIconColor("Alerts")} 
          style={styles.navIcon} 
        />
        <Text style={[styles.navText, isActive("Alerts") && styles.activeText]}>
          Alerts
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(30, 30, 30, 1)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: "100%",
    margin: 9,
    marginBottom: 20,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: "#888",
   
  },
  activeText: {
    color: "#fafafaff",
     fontWeight: "500",
  },
});

export default BottomNavBar;
