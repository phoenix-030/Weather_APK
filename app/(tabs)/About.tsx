import { BlurView } from "expo-blur";
import React from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function About() {
  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <BlurView intensity={30} style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </BlurView>
  );

  const FeatureItem = ({
    icon,
    title,
    description,
  }: {
    icon: string;
    title: string;
    description: string;
  }) => (
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <View style={styles.featureText}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.logo}>🌤️</Text>
            <Text style={styles.appName}>Weather Forecast</Text>
            <Text style={styles.version}>Version 1.0.0</Text>
          </View>

          <Section title="About This App">
            <Text style={styles.paragraph}>
              Weather Forecast is a professional weather application that
              provides real-time weather data, forecasts, and city search
              functionality. Built with React Native and Expo, it delivers
              accurate weather information powered by the OpenWeatherMap API.
            </Text>
          </Section>

          <Section title="Key Features">
            <FeatureItem
              icon="🔍"
              title="City Search"
              description="Search for weather in any city worldwide with autocomplete suggestions."
            />
            <FeatureItem
              icon="📅"
              title="7-Day Forecast"
              description="Get detailed weather predictions for the upcoming week."
            />
            <FeatureItem
              icon="📜"
              title="Weather History"
              description="Keep track of all your searched cities with persistent local storage."
            />
            <FeatureItem
              icon="🔄"
              title="Real-Time Updates"
              description="Pull to refresh for the latest weather data instantly."
            />
          </Section>

          <Section title="Technologies Used">
            <View style={styles.techGrid}>
              {[
                "React Native",
                "Expo",
                "TypeScript",
                "OpenWeatherMap API",
                "AsyncStorage",
              ].map((tech) => (
                <View key={tech} style={styles.techBadge}>
                  <Text style={styles.techBadgeText}>{tech}</Text>
                </View>
              ))}
            </View>
          </Section>

          <Section title="Data Sources">
            <Text style={styles.paragraph}>
              Weather data is provided by OpenWeatherMap, a leading global
              weather data provider. All temperature values are displayed in
              Fahrenheit by default.
            </Text>
          </Section>

          <Section title="Privacy">
            <Text style={styles.paragraph}>
              Your weather search history is stored locally on your device using
              AsyncStorage. No personal data is collected or transmitted to
              external servers.
            </Text>
          </Section>

          <Section title="Credits">
            <Text style={styles.paragraph}>
              Built with ❤️ using React Native and Expo. Weather data courtesy
              of OpenWeatherMap.
            </Text>
          </Section>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              © 2026 Weather Forecast App, All Created By Harishkumar 👍
            </Text>
          </View>
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
    paddingBottom: 40,
  },
  content: {
    width: "100%",
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    fontSize: 56,
    marginBottom: 8,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  version: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    marginTop: 4,
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
  sectionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  paragraph: {
    fontSize: 15,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 22,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    lineHeight: 20,
  },
  techGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  techBadge: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  techBadgeText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 13,
    textAlign: "center",
    color: "rgba(255,255,255,0.4)",
  },
});
