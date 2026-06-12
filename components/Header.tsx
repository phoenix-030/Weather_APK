import AntDesign from "@expo/vector-icons/AntDesign";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Home = ({
  onMenuPress,
  onSearchPress,
}: {
  onMenuPress: () => void;
  onSearchPress: () => void;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menubutton} onPress={onMenuPress}>
          <AntDesign name="menu" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.title}>Weather Forcast</Text>

        <TouchableOpacity style={styles.searchbutton} onPress={onSearchPress}>
          <FontAwesome name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FB923C",
  },
  menubutton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  searchbutton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
