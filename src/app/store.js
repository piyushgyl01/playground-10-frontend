import { configureStore } from "@reduxjs/toolkit";
import { studentsSlice } from "../features/students/studentsSlice";
import { schoolSlice } from "../features/school/schoolSlice";
import { teachersSlice } from "../features/teachers/teacherSlice";

export default configureStore({
  reducer: {
    students: studentsSlice.reducer,
    school: schoolSlice.reducer,
    teachers: teachersSlice.reducer,
  },
});
