import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// Async thunk to get all departments
export const getAllDepartments = createAsyncThunk(
  "departments/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/department");
      //   console.log(response.data.data.departments);
      return response.data.data.departments;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to create a new department
export const createDepartment = createAsyncThunk(
  "departments/create",
  async (departmentData, thunkAPI) => {
    try {
      const response = await api.post("/department", { name: departmentData });

      if (response.status === 201) {
        thunkAPI.dispatch(getAllDepartments());
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "An error occurred"
      );
    }
  }
);

// Async thunk to update a department
export const updateDepartment = createAsyncThunk(
  "departments/update",
  async ({ id, departmentData }, thunkAPI) => {
    try {
      //   console.log("Updating department:", { id, departmentData });
      const response = await api.put(`/department/${id}`, departmentData);

      // ✅ Dispatch only if update is successful
      if (response.status === 200) {
        thunkAPI.dispatch(getAllDepartments());
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to update department"
      );
    }
  }
);

// Async thunk to delete a department
export const deleteDepartment = createAsyncThunk(
  "departments/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`department/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const departmentSlice = createSlice({
  name: "departments",
  initialState: {
    departments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(getAllDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure state.departments is always an array
        if (Array.isArray(state.departments)) {
          state.departments.push(action.payload);
        } else {
          state.departments = [action.payload]; // Reset if it's not an array
        }
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = state.departments.map((department) =>
          department._id === action.payload._id ? action.payload : department
        );
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = state.departments.filter(
          (department) => department._id !== action.payload
        );
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default departmentSlice.reducer;
