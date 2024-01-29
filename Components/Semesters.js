import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Semesters = ({ navigation }) => {
  const [semesters, setSemesters] = useState([
    {
      semesterTitle: "Level-1 Term-1",
      batch: "2018",
      session: "2018-2019",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const handleSemesterPress = () => {
    // alert(navigation);
    // Navigate to the Courses screen with the semester data
    navigation?.navigate("Courses");
  };
  useEffect(() => {
    // Fetch semester data from the backend
    const fetchSemesters = async () => {};

    fetchSemesters();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {semesters.map(({ semesterTitle, session, batch }, idx) => (
        <TouchableOpacity onPress={handleSemesterPress} key={idx}>
          <View style={styles.container}>
            <Text style={styles.title}>{semesterTitle}</Text>
            <Text style={styles.info}>Session: {session}</Text>
            <Text style={styles.info}>Batch: {batch}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  semesterContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
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

export default Semesters;
