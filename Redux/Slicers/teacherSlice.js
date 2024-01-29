import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = { teacher: null };

export const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setTeacher: (state, action) => {
      state.teacher = action.payload;
    },
  },
});

export const { setTeacher } = teacherSlice.actions;
export const selectTeacherId = (state) => state.user.teacher?.teacherId;

const teacherReducer = teacherSlice.reducer;
export default teacherReducer;
