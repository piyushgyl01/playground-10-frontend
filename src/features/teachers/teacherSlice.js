import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

//API CALLS USING REDUX THUNKS

//GET ALL TEACHERS
export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    try {
      const response = await axios.get(
        "https://playground-10-backend.vercel.app/teachers"
      );

      return response.data;
    } catch (error) {
      console.error("Fetch Error: ", error);
      throw error;
    }
  }
);

//ADD NEW TEACHER
export const addTeacherAsync = createAsyncThunk(
  "teachers/addTeacher",
  async (formData) => {
    try {
      const response = await axios.post(
        "https://playground-10-backend.vercel.app/teachers",
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Post Error: ", error);
      throw error;
    }
  }
);

//DELETE EXISTING TEACHER
export const deleteTeacherAsync = createAsyncThunk(
  "teachers/deleteTeacher",
  async (id) => {
    try {
      await axios.delete(
        `https://playground-10-backend.vercel.app/teachers/${id}`
      );

      return { id };
    } catch (error) {
      console.error("Delete Error: ", error);
      throw error;
    }
  }
);

//UPDATE EXISTING TEACHER
export const updateTeacherAsync = createAsyncThunk(
  "teachers/updateTeacher",
  async ({ id, formData }) => {
    try {
      const response = await axios.put(
        `https://playground-10-backend.vercel.app/teachers/${id}`,
        formData
      );

      return response.data;
    } catch (error) {
      console.log("Update Error: ", error);
      throw error;
    }
  }
);

//MEMOIZED SELECTOR FOR FILTERING & SORTING
export const selectFilteredAndSortedTeachers = createSelector(
  (state) => state.teachers.teachers,
  (state) => state.teachers.filter,
  (state) => state.teachers.sortBy,
  (teachers, filter, sortBy) => {
    let filteredTeachers = teachers;

    //FILTER
    if (filter !== "All") {
      filteredTeachers = filteredTeachers.filter(
        (teacher) => teacher.gender === filter
      );
    }

    //SORT LOGIC
    switch (sortBy) {
      case "Name":
        return [...filteredTeachers].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      case "Subject":
        return [...filteredTeachers].sort((a, b) =>
          a.subject.localeCompare(b.subject)
        );
      case "yoe":
        return [...filteredTeachers].sort(
          (a, b) => b.yearsOfExperience - a.yearsOfExperience
        );
      default:
        return filteredTeachers;
    }
  }
);

//REDUX SLICE CONFIGURATION
export const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    teachers: [],
    fetchStatus: "idle",
    error: null,
    addStatus: "idle",
    deleteStatus: "idle",
    updateStatus: "idle",
    filter: "All",
    sortBy: "Name",
  },

  //SYNCHRONOUS ACTIONS HANDLERS
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },

  //ASYNCHRONOUS ACTION HANDLERS
  extraReducers: (builder) => {
    builder
      //FETCH TEACHERS STATUS HANDLERS
      .addCase(fetchTeachers.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.fetchStatus = "error";
        state.error = action.error.message;
      })
      //ADD TEACHER STATUS HANDLERS
      .addCase(addTeacherAsync.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(addTeacherAsync.fulfilled, (state, action) => {
        state.addStatus = "success";
        state.teachers.push(action.payload);
      })
      .addCase(addTeacherAsync.rejected, (state, action) => {
        state.addStatus = "error";
        state.error = action.error.message;
      })
      //DELETE TEACHER STATUS HANDLERS
      .addCase(deleteTeacherAsync.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteTeacherAsync.fulfilled, (state, action) => {
        state.deleteStatus = "success";
        state.teachers = state.teachers.filter(
          (teacher) => teacher._id !== action.payload.id
        );
      })
      .addCase(deleteTeacherAsync.rejected, (state, action) => {
        state.deleteStatus = "error";
        state.error = action.error.message;
      })
      //UPDATE TEACHER STATUS HANDLERS
      .addCase(updateTeacherAsync.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateTeacherAsync.fulfilled, (state, action) => {
        state.updateStatus = "success";
        const updatedTeacher = action.payload;
        const index = state.teachers.findIndex(
          (teacher) => teacher._id === updatedTeacher._id
        );
        if (index !== -1) {
          state.teachers[index] = updatedTeacher;
        }
      })
      .addCase(updateTeacherAsync.rejected, (state, action) => {
        state.updateStatus = "error";
        state.error = action.error.message;
      });
  },
});

export const { setFilter, setSortBy } = teachersSlice.actions;

export default teachersSlice.reducer;
