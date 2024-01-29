import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Semester = ({ navigation }) => {
  const handleSemesterPress = () => {
    alert(navigation);
    // Navigate to the Courses screen with the semester data
    navigation?.navigate("Courses");
  };

  return (
    <TouchableOpacity onPress={handleSemesterPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{""}</Text>
        <Text style={styles.info}>Session: {""}</Text>
        <Text style={styles.info}>Batch: {""}</Text>
      </View>
    </TouchableOpacity>
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

export default Semester;
