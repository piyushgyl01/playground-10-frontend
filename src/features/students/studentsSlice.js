import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

// API Calls using Redux Thunks

// GET all students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(
      "https://playground-09-backend.vercel.app/students"
    );
    return response.data;
  }
);

//POST new student
export const addStudentAsync = createAsyncThunk(
  "students/addStudent",
  async (formData) => {
    const response = await axios.post(
      "https://playground-09-backend.vercel.app/students",
      formData
    );
    return response.data;
  }
);

// DELETE student
export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    try {
      await axios.delete(
        `https://playground-09-backend.vercel.app/students/${id}`
      );
      return { id };
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
      throw error;
    }
  }
);

// PUT updated student
export const updateStudentAsync = createAsyncThunk(
  "students/updateStudent",
  async ({ id, formData }) => {
    try {
      const response = await axios.put(
        `https://playground-09-backend.vercel.app/students/${id}`,
        formData
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Update Error:", error);
    }
  }
);

// Memoized Selector for Filtering & Sorting
export const selectFilteredAndSortedStudents = createSelector(
  (state) => state.students.students, // Get students array
  (state) => state.students.filter, // Get filter value
  (state) => state.students.sortBy, // Get sort value
  (students, filter, sortBy) => {
    let filtered = students;

    // Filter logic
    if (filter !== "All") {
      filtered = filtered.filter((student) => student.gender === filter);
    }

    // Sort logic
    switch (sortBy) {
      case "Name":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      case "Marks":
        return [...filtered].sort((a, b) => b.marks - a.marks);
      case "Attendance":
        return [...filtered].sort((a, b) => b.attendance - a.attendance);
      default:
        return filtered;
    }
  }
);

// Redux Slice Configuration
export const studentsSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    status: "idle",
    error: null,
    addStatus: "idle",
    updateStatus: "idle",
    filter: "All",
    sortBy: "Name",
  },
  // Synchronous actions
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  // Async action handlers
  extraReducers: (builder) => {
    // Fetch status handlers
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "success";
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      // Add status handlers
      .addCase(addStudentAsync.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(addStudentAsync.fulfilled, (state, action) => {
        state.addStatus = "success";
        state.students.push(action.payload);
      })
      .addCase(addStudentAsync.rejected, (state, action) => {
        state.addStatus = "error";
        state.error = action.error.message;
      })
      // Delete status handlers
      .addCase(deleteStudentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteStudentAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.students = state.students.filter(
          (student) => student._id !== action.payload.id
        );
      })
      .addCase(deleteStudentAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      // Update status handlers
      .addCase(updateStudentAsync.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateStudentAsync.fulfilled, (state, action) => {
        state.updateStatus = "success";
        const updatedStudent = action.payload;
        const index = state.students.findIndex(
          (student) => student._id === updatedStudent._id
        );
        if (index !== -1) {
          state.students[index] = updatedStudent;
        }
      })
      .addCase(updateStudentAsync.rejected, (state, action) => {
        state.updateStatus = "error";
        state.error = action.error.message;
      });
  },
});

export const { addStudent, updateStudent, setFilter, setSortBy } =
  studentsSlice.actions;

export default studentsSlice.reducer;
