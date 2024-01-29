import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Course from "./Course"; // Assuming you have a Course component

const Courses = ({ navigation }) => {
  const [courses, setCourses] = useState([
    {
      courseTitle: "Programming",
      courseCode: "CSE-141",
      credit: 3,
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch courses data from the backend using the semester information
    const fetchCourses = async () => {};

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {courses.map((course, idx) => (
        <Course
          key={idx}
          courseTitle={course.courseTitle}
          credit={course.credit}
          courseCode={course.courseCode}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Courses;
