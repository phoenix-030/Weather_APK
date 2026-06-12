import React, { useRef, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { WebView } from "react-native-webview";

const Radar = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const webViewRef = useRef<WebView>(null);

  const weatherUrl = "https://zoom.earth/maps/satellite/";

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const refreshMap = () => {
    setLoading(true);
    setError(false);
    webViewRef.current?.reload();
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load weather map</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refreshMap}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Loading Weather Radar...</Text>
        </View>
      )}

      <WebView
        ref={webViewRef}
        source={{ uri: weatherUrl }}
        style={styles.webView}
        onLoad={handleLoad}
        onError={handleError}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={false}
      />

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={refreshMap}>
          <Text style={styles.controlText}>🔄</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  webView: {
    flex: 1,
    backgroundColor: "transparent",
    position: "relative",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1,
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 20,
  },
  errorText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  retryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  controls: {
    position: "absolute",
    bottom: 120,
    right: 70,
    flexDirection: "row",
    gap: 10,
  },
  controlButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(10px)",
  },
  controlText: {
    fontSize: 20,
  },
});

export default Radar;
