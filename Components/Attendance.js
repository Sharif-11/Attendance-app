// App.js
import React, { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { fetchData } from "../Axios/fecthData";
import { postData } from "../Axios/postData";
const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [currentStudentPage, setCurrentStudentPage] = useState([]);
  const [nextStudentPage, setNextStudentPage] = useState([]);
  useEffect(() => {
    const fetchCurrentPage = async () => {
      const result = await fetchData(
        `/attendances/CSE-141?pageNo=1&&semesterId=20181&&date=2024-03-17T14:57:03.194Z`
      );
      //  setStudents(result.data);
      setCurrentStudentPage(result.data.Student_Attendance);
    };
    const fetchNextPage = async () => {
      const result = await fetchData(
        `/attendances/CSE-141?pageNo=2&&semesterId=20181&&date=2024-03-17T14:57:03.194Z`
      );
      setNextStudentPage(result.data.Student_Attendance);
      // alert(JSON.stringify(result));
    };
    fetchCurrentPage();
    fetchNextPage();
  }, [currentPage]);
  const handleAttendanceChange = (index, present) => {
    const currentState = [...currentStudentPage];
    currentState[index].present = present;
    setCurrentStudentPage([...currentState]);
  };
  const handleAttendanceData = async (nextButtonPressed = false) => {
    const filteredStudent = currentStudentPage.filter(
      (student) => student.present !== undefined
    );
    if (filteredStudent.length === 0) return;
    const attendanceData = {
      semesterId: "20181",
      courseCode: "CSE-141",
      date: new Date(),
      attendances: filteredStudent,
    };
    const saveAttendance = await postData(`/attendances`, attendanceData);
    if (!saveAttendance.success) {
      alert(saveAttendance.message);
    } else {
      nextButtonPressed
        ? setCurrentPage((page) => page - 1)
        : alert("Attendance saved successfully");
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.studentList}>
        {currentStudentPage?.map((student, index) => (
          <View key={index} style={styles.studentItem}>
            <Text style={styles.studentName}>{student?.studentId}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  student.present === true && styles.presentButton,
                ]}
                onPress={() => handleAttendanceChange(index, true)}
              >
                <Text style={styles.buttonText}>Present</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  student.present === false && styles.absentButton,
                ]}
                onPress={() => handleAttendanceChange(index, false)}
              >
                <Text style={styles.buttonText}>Absent</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => handleAttendanceChange(index, undefined)}
              >
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <Button
          title="Previous"
          disabled={currentPage === 1}
          onPress={() => setCurrentPage((current) => current - 1)}
        />
        {nextStudentPage.length === 0 ? (
          <Button
            title="Save"
            onPress={() => {
              handleAttendanceData();
            }}
          />
        ) : (
          <Button
            title="Next"
            onPress={() => {
              handleAttendanceData(true);
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  dateInput: {
    width: "100%",
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  studentList: {
    width: "100%",
  },
  studentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  studentName: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  presentButton: {
    backgroundColor: "green",
  },
  absentButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    padding: 16,
  },
});

export default Attendance;
