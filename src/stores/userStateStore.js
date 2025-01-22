import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// Login thunk
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/login", { email, password });
      console.log(response.data);
      return response.data; // Assuming the response contains user data and token
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Get all users thunk
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

// Auth slice
const authSlice = createSlice({
  name: "auth",
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
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user; // Assuming API sends user data
        state.token = action.payload.token; // Assuming API sends a token
      })
      .addCase(login.rejected, (state, action) => {
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
        state.users = action.payload; // Assuming API sends an array of users
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, toggleBar } = authSlice.actions;
export default authSlice.reducer;
