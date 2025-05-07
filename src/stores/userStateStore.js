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
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/forgotPassword", { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Forget password failed");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/user/resetPassword/${token}`, {
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Reset password failed");
    }
  }
);

// Get all users thunk
export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user");
      // console.log(res.data.users);
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
      // console.log(res.data.user);
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
      // console.log(res.data.updatedUser);
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
    console.log(userId, userData);
    try {
      const res = await api.put(`/user/updateUser/${userId}`, userData);
      // console.log(res.data.updatedUser);
      return res.data.updatedUser; // Assuming res.data contains the updated user object
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetching users failed");
    }
  }
);

export const updateUserRoleByAdmin = createAsyncThunk(
  "auth/updateUserRoleByAdmin",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/user/updateUser/${userId}`, userData); // Adjust endpoint as needed
      return res.data.updatedUser; // Assuming the API returns the updated user object
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Updating user role failed"
      );
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

    resetStatus: (state) => {
      state.status = "idle"; // Reset status to idle
    },

    openPopup: (state) => {
      state.openPopup = !state.openPopup;
    },

    toggleBar: (state) => {
      state.toggleBar = !state.toggleBar;
    },

    setToggleBar: (state, action) => {
      state.toggleBar = action.payload;
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
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the user in the list
        const updatedUser = action.payload;
        const index = state.users.findIndex(
          (user) => user._id === updatedUser._id
        );
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
        state.user = updatedUser;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Handle getUserById
      .addCase(getUserById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

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
      })
      .addCase(updateUserRoleByAdmin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserRoleByAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedUser = action.payload;

        // Update the specific user's role in the users array
        const index = state.users.findIndex(
          (user) => user._id === updatedUser._id
        );
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(updateUserRoleByAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, toggleBar, openPopup, resetStatus } = authSlice.actions;
export default authSlice.reducer;
