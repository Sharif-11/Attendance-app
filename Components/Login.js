import { Formik } from "formik";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { setAuthHeader } from "../Axios/axiosInstance";
import { postData } from "../Axios/postData";
import { setTeacher } from "../Redux/Slicers/teacherSlice";
import { loginSchema } from "../Yup/login.yup";
const LoginScreen = ({ navigation }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const initialValues = {
    teacherId: "CSE-1801",
    password: "123456Ashfaque",
  };
  const handleLogin = async (values) => {
    setSubmitting(true);
    setError(null);
    // console.log(values);
    const { teacherId, password } = values;
    const result = await postData("/teacher/login", {
      teacherId,
      password,
    });
    if (result.data) {
      const { token, ...teacherData } = result.data;
      setAuthHeader(token);
      dispatch(setTeacher(teacherData));
      setSubmitting(false);
      navigation.navigate("My Courses");
      //navigate("Semesters");
    } else {
      const { message } = result;
      // alert(message);
      setSubmitting(false);
      setError(message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/cuet_1.png")} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Teacher ID"
              onChangeText={handleChange("teacherId")}
              onBlur={handleBlur("teacherId")}
              value={values.teacherId}
            />
            {touched.teacherId && errors.teacherId && (
              <Text style={styles.errorText}>{errors.teacherId}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
              <Text style={styles.loginButtonText}>
                {!submitting ? "Login" : "Submitting..."}
              </Text>
            </TouchableOpacity>
            {error && (
              <Text
                style={{
                  ...styles.errorText,
                  marginTop: 3,
                  textAlign: "center",
                }}
              >
                {error}
              </Text>
            )}
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  input: {
    width: 250,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 2,
    paddingHorizontal: 16,
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 12,
    width: 250,
    textAlign: "left",
  },
});

export default LoginScreen;
