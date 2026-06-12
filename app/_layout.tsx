import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const statusBarBackground = isDark ? "#0F172A" : "#F8FAFC";

  return (
    <SafeAreaProvider>
      <StatusBar
        animated
        backgroundColor={statusBarBackground}
        style={isDark ? "light" : "dark"}
        translucent={false}
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeAreaProvider>
  );
}
