import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
const Sidebar = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.sidebar}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Menu</Text>
        </View>

        <View style={styles.menuItems}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.replace("/(tabs)/Home")}
          >
            <FontAwesome name="home" size={20} color="#fff" />
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="map-marker" size={20} color="#fff" />
            <Text style={styles.menuText}>Locations</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              router.push("/(tabs)/settings");
              onClose();
            }}
          >
            <FontAwesome name="cog" size={20} color="#fff" />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              router.push("/(tabs)/About");
              onClose();
            }}
          >
            <FontAwesome name="info-circle" size={20} color="#fff" />
            <Text style={styles.menuText}>About</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="sign-out" size={20} color="#fff" />
            <Text style={styles.menuText}>Sign Out</Text>
          </TouchableOpacity> */}
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 280,
    height: "100%",
    backgroundColor: "#1F2937",
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  closeButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 15,
  },
  menuItems: {
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  menuText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 15,
  },
});

export default Sidebar;
