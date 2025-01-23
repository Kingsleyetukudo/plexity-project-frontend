import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// create appraisal thunk
export const getAllStaffAppraisal = createAsyncThunk(
  "staffAppraisal/getAllStaffAppraisal",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/appraised");
      console.log(response.data);
      return response.data; // Assuming the response contains user data and token
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Getting all staff appraisal failed"
      );
    }
  }
);

// Get all appraisal thunk
export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user");
      console.log(res.data);
      return res.data; // Assuming res.data contains an array of users
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetching users failed");
    }
  }
);

// slice
const staffAppraisalSlice = createSlice({
  name: "staffAppraisal",
  initialState: {
    users: [], // To store all users
    user: null, // To store logged-in user
    token: null, // Authentication token
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Error messages
    toggleBar: false, // Toggle state
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.toggleBar = false;
      // Clear persisted data if redux-persist is used
      localStorage.removeItem("persist:auth");
    },
    toggleBar: (state) => {
      state.toggleBar = !state.toggleBar;
      console.log(state.toggleBar);
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(getAllStaffAppraisal.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllStaffAppraisal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user; // Assuming API sends user data
        state.token = action.payload.token; // Assuming API sends a token
      })
      .addCase(getAllStaffAppraisal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle getAllUsers
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, toggleBar } = staffAppraisalSlice.actions;
export default staffAppraisalSlice.reducer;
