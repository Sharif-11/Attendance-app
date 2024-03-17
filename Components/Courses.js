import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { fetchData } from "../Axios/fecthData";
import Course from "./Course"; // Assuming you have a Course component

const Courses = ({ navigation }) => {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // setLoading(true);
    const fetchCourse = async () => {
      const result = await fetchData("/courses/teacher-courses");
      if (result.success) {
        const data = result.data;
        setMyCourses(data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetchCourse();
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
      {myCourses.map(({ semester, course, courseCode }, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() =>
            navigation.navigate("Attendance", { semester, course, courseCode })
          }
        >
          <Course
            courseTitle={course.courseTitle}
            credit={course.credit}
            courseCode={courseCode}
            semesterTitle={semester.semesterTitle}
            batch={semester.batch}
            session={semester.session}
          />
        </TouchableOpacity>
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
