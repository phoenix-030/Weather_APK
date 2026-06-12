import { BlurView } from "expo-blur";
import React from "react";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const Alerts = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Weather Alerts</Text>

          <BlurView intensity={15} tint="light" style={styles.alertCard}>
            <View style={styles.alertHeader}>
              <Text style={styles.alertType}>⚠️ Severe Weather</Text>
              <Text style={styles.alertTime}>2 hours ago</Text>
            </View>
            <Text style={styles.alertTitle}>Thunderstorm Warning</Text>
            <Text style={styles.alertDescription}>
              Severe thunderstorms expected in your area between 4 PM - 8 PM.
              Heavy rain and strong winds possible.
            </Text>
          </BlurView>

          <BlurView intensity={15} tint="light" style={styles.alertCard}>
            <View style={styles.alertHeader}>
              <Text style={styles.alertType}>🌡️ Temperature</Text>
              <Text style={styles.alertTime}>5 hours ago</Text>
            </View>
            <Text style={styles.alertTitle}>Heat Advisory</Text>
            <Text style={styles.alertDescription}>
              High temperatures expected tomorrow. Stay hydrated and avoid
              prolonged outdoor activities.
            </Text>
          </BlurView>

          <BlurView intensity={15} tint="light" style={styles.alertCard}>
            <View style={styles.alertHeader}>
              <Text style={styles.alertType}>🌧️ Rain</Text>
              <Text style={styles.alertTime}>1 day ago</Text>
            </View>
            <Text style={styles.alertTitle}>Flash Flood Watch</Text>
            <Text style={styles.alertDescription}>
              Heavy rainfall may cause flooding in low-lying areas. Monitor
              conditions and be prepared to move to higher ground.
            </Text>
          </BlurView>

          <View style={styles.noAlerts}>
            <Text style={styles.noAlertsText}>
              No active alerts in your area
            </Text>
          </View>
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
    paddingTop: 50,
  },
  content: {
    alignItems: "center",
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  alertCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 15,
    overflow: "hidden",
    padding: 20,
    marginBottom: 15,
    width: "100%",
    maxWidth: 342,
    borderLeftWidth: 4,
    borderLeftColor: "#FF9500",
  },
  alertHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  alertType: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF9500",
  },
  alertTime: {
    fontSize: 12,
    color: "#888",
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  alertDescription: {
    fontSize: 14,
    color: "#fff",
    lineHeight: 20,
  },
  noAlerts: {
    marginTop: 40,
    alignItems: "center",
  },
  noAlertsText: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
  },
});

export default Alerts;
