import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar type="auto" />
      <View style={styles.header}>
        <Text style={styles.text}>Save Stu</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "#f7f7f7",
  },
  text: {
    color: "steelblue",
    fontWeight: "bold",
    fontSize: 18,
  },
  header: {
    backgroundColor: "#fcf",
    padding: 10,
  },
});
