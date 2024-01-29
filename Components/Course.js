import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Course = ({ courseTitle, credit, courseCode }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{courseTitle}</Text>
      <Text style={styles.info}>{courseCode}</Text>
      <Text style={styles.info}>Credit: {credit}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  info: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
});

export default Course;
