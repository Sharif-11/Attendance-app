// App.js
import DateTimePicker from "@react-native-community/datetimepicker";
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
const Attendance = ({ route }) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentStudentPage, setCurrentStudentPage] = useState([]);
  const [nextStudentPage, setNextStudentPage] = useState([]);
  const { courseCode, semesterId } = route.params;
  useEffect(() => {
    setLoading(true);
    const fetchCurrentPage = async () => {
      const result = await fetchData(
        `/attendances/${courseCode}?pageNo=${currentPage}&&semesterId=${semesterId}&&date=${date.toDateString()}&&pageSize=8`
      );
      //  setStudents(result.data);
      setCurrentStudentPage(result.data.Student_Attendance);
    };
    const fetchNextPage = async () => {
      const result = await fetchData(
        `/attendances/${courseCode}?pageNo=${
          currentPage + 1
        }&&semesterId=20181&&date=${date.toDateString()}`
      );
      setNextStudentPage(result.data.Student_Attendance);
      setLoading(false);
      // alert(JSON.stringify(result));
    };
    fetchCurrentPage();
    fetchNextPage();
  }, [currentPage, date]);
  const handleAttendanceChange = (index, present) => {
    const currentState = [...currentStudentPage];
    currentState[index].present = present;
    setCurrentStudentPage([...currentState]);
  };
  const handleAttendanceData = async (nextButtonPressed = false) => {
    const filteredStudent = currentStudentPage.filter(
      (student) => student.present !== undefined
    );
    if (filteredStudent.length === 0) {
      nextButtonPressed && setCurrentPage((page) => page + 1);
      return;
    }
    const attendanceData = {
      semesterId,
      courseCode,
      date: new Date(),
      attendances: filteredStudent,
    };
    const saveAttendance = await postData(`/attendances`, attendanceData);
    if (!saveAttendance.success) {
      alert(saveAttendance.message);
    } else {
      nextButtonPressed
        ? setCurrentPage((page) => page + 1)
        : alert("Attendance saved successfully");
    }
  };
  const changeDate = ({ type }, selectedDate) => {
    if (type === "set") {
      setDate(selectedDate);
      setCurrentPage(1);
    }
    setShowPicker(false);
  };
  return (
    <View style={styles.container}>
      <Button
        title={date.toDateString()}
        onPress={() => setShowPicker((current) => !current)}
      />
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={changeDate}
        />
      )}
      {loading || (
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
          {currentStudentPage.length === 0 && <Text>There is no student</Text>}
        </ScrollView>
      )}
      {loading && <Text>Loading...</Text>}
      {loading || (
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
      )}
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
    marginTop: 16,
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
