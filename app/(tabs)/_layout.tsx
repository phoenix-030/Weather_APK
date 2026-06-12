import { Tabs } from "expo-router";
import React from "react";
import { ImageBackground, StyleSheet, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomNavBar from "../../components/BottomNavBar";
import Header from "../../components/Header";
import SearchInput from "../../components/SearchInput";
import Sidebar from "../../components/Sidebar";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const [sidebarVisible, setSidebarVisible] = React.useState(false);
  const [searchVisible, setSearchVisible] = React.useState(false);
  const isDark = colorScheme === "dark";
  const topSurfaceColor = isDark ? "#0F172A" : "#F8FAFC";

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  const toggleSearch = () => setSearchVisible(!searchVisible);

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={styles.container}
    >
      <View
        pointerEvents="none"
        style={[
          styles.statusArea,
          { backgroundColor: topSurfaceColor, height: insets.top },
        ]}
      />
      <Sidebar
        isVisible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
      <SearchInput
        isVisible={searchVisible}
        onClose={() => setSearchVisible(false)}
        onSearch={(text) => {
          (global as any).searchWeather?.(text);
        }}
      />
      <View
        style={[
          styles.header,
          {
            top: insets.top,
          },
        ]}
      >
        <Header onMenuPress={toggleSidebar} onSearchPress={toggleSearch} />
      </View>

      <View style={[styles.content, { paddingTop: insets.top + 60 }]}>
        <Tabs
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
        >
          <Tabs.Screen name="Home" options={{ title: "Home" }} />
          <Tabs.Screen name="Radar" options={{ title: "Radar" }} />
          <Tabs.Screen name="History" options={{ title: "History" }} />
          <Tabs.Screen name="Alerts" options={{ title: "Alerts" }} />
          <Tabs.Screen name="Settings" options={{ title: "Settings" }} />
          <Tabs.Screen name="About" options={{ title: "About" }} />
        </Tabs>
      </View>
      <View style={styles.bottomNav}>
        <BottomNavBar />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  statusArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  header: {
    width: "100%",
    height: 60,
    backgroundColor: "#0F172A",
    borderWidth: 1,
    borderColor: "rgba(224, 216, 216, 0.36)",
    borderRadius: 12,
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 90,
    left: 0,
    right: 0,
  },
  bottomNav: {
    position: "absolute",
    width: "95%",
    alignSelf: "center",

    bottom: -5,
    left: 0,
    right: 0,
  },
});
