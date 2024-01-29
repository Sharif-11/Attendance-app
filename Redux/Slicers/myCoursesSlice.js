import { createSlice } from "@reduxjs/toolkit";

const initialState = { courses: null };

const myCoursesSlice = createSlice({
  name: "myCourses",
  initialState,
  reducers: {
    setCourse: (state, action) => {
      state.courses = action.payload;
    },
  },
});

export const { setCourse } = myCoursesSlice.actions;

const myCourseReducer = myCoursesSlice.reducer;
export const selectCourses = (state) => state.courses;
export default myCourseReducer;
