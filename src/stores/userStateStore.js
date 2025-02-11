import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// Login thunk
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, reCaptchatoken }, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/login", {
        email,
        password,
        reCaptchatoken,
      });
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
      return res.data.users; // Assuming res.data contains an array of users
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetching users failed");
    }
  }
);

// Create new users thunk
export const createUsers = createAsyncThunk(
  "auth/createUsers",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/user", payload);
      return res.data; // Assuming res.data contains a single user object
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetching users failed");
    }
  }
);

// Get user by ID thunk
export const getUserById = createAsyncThunk(
  "auth/getUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/user/${userId}`);
      console.log(res.data.user);
      return res.data.user; // Assuming res.data contains the user object
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetching user failed");
    }
  }
);

// Update user by Admin thunk
export const updateUserByAdmin = createAsyncThunk(
  "auth/updateUserByAdmin",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.put(`/user/approveUser/${userId}`);
      console.log(res.data.updatedUser);
      return res.data.updatedUser;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Updating user failed");
    }
  }
);

// User Update personal profile thunk
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/user/updateUser/${userId}`, userData);
      return res.data; // Assuming res.data contains the updated user object
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetching users failed");
    }
  }
);

// Delete User thunk
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/user/${userId}`);
      return res.data; // Assuming res.data contains the result of the delete action
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
    user: {}, // To store logged-in user
    token: null, // Authentication token
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Error messages
    toggleBar: false, // Toggle state
    openPopup: false, // Popup state
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.toggleBar = false;
      // Remove token from localStorage on logout
      localStorage.removeItem("token");
      localStorage.removeItem("persist:auth");
    },

    openPopup: (state) => {
      state.openPopup = !state.openPopup;
    },

    toggleBar: (state) => {
      state.toggleBar = !state.toggleBar;
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
        state.user = action.payload.user;
        state.token = action.payload.token;
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
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle createUsers
      .addCase(createUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        // If single user object is returned, add it to the users list
        state.users = [...state.users, action.payload];
      })
      .addCase(createUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle updateUser
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      // .addCase(updateUser.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   // Update the user in the list
      //   const updatedUser = action.payload;
      //   const index = state.users.findIndex(
      //     (user) => user._id === updatedUser._id
      //   );
      //   if (index !== -1) {
      //     state.users[index] = updatedUser;
      //   }
      //   state.user = updatedUser;
      // })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Handle getUserById
      .addCase(getUserById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      // .addCase(updateUser.fulfilled, (state, action) => {
      //   console.log("User updated:", action.payload);
      //   state.status = "succeeded";
      //   const updatedUser = action.payload;
      //   const index = state.users.findIndex(
      //     (user) => user._id === updatedUser._id
      //   );
      //   if (index !== -1) {
      //     state.users[index] = updatedUser;
      //   }
      //   state.user = updatedUser; // Ensure the user state is properly updated
      //   console.log("Updated user state:", state.user);
      // })
      .addCase(getUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Handle deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = state.users.filter(
          (user) => user._id !== action.payload._id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, toggleBar, openPopup } = authSlice.actions;
export default authSlice.reducer;
