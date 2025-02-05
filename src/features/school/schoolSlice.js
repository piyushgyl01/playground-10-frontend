import { createSlice } from "@reduxjs/toolkit";

export const schoolSlice = createSlice({
  name: "school",
  initialState: {
    totalStudents: 0,
    averageAttendance: 0,
    averageMarks: 0,
    topStudent: null,
    totalTeachers: 0,                   // Added for teachers
    mostExperiencedTeacher: null,       // Added for teachers
  },
  reducers: {
    updateSchoolStats: (state, action) => {
      const { 
        totalStudents, 
        averageAttendance, 
        averageMarks, 
        topStudent,
        totalTeachers,                  // Added
        mostExperiencedTeacher         // Added
      } = action.payload;
      
      state.totalStudents = totalStudents;
      state.averageAttendance = averageAttendance;
      state.averageMarks = averageMarks;
      state.topStudent = topStudent;
      state.totalTeachers = totalTeachers;              // Added
      state.mostExperiencedTeacher = mostExperiencedTeacher;  // Added
    },
  },
});

export const { updateSchoolStats } = schoolSlice.actions;
export default schoolSlice.reducer;