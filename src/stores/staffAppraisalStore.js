import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// create appraisal thunk
export const getAllStaffAppraisal = createAsyncThunk(
  "staffAppraisal/getAllStaffAppraisal",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/appraised");
      return response.data.data.appraisals; // Assuming the response contains user data and token
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Getting all staff appraisal failed"
      );
    }
  }
);

// Get All appraisal for click user thunk
export const getAllAppraisalByClickUser = createAsyncThunk(
  "auth/getAllAppraisalByClickUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/appraised/currentUser/${userId}`);
      // console.log(res.data.data);
      calculateAppraisal(res.data.data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetching users failed");
    }
  }
);
// Get All  appraisal for current user thunk
export const getAppraisalByUser = createAsyncThunk(
  "auth/getAppraisalByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/appraised/currentUser/${userId}`);
      // console.log(res.data.data);
      calculateAppraisal(res.data.data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetching users failed");
    }
  }
);
// Get  appraisal for current user thunk
export const getAppraisalById = createAsyncThunk(
  "auth/getAppraisalById",
  async (appraisalId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/appraised/appraisal/${appraisalId}`);
      // console.log(res.data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetching users failed");
    }
  }
);

// calculation of individual appraisal
const calculateAppraisal = (appraisal) => {
  let total = 0;
  const totalAppraisalRating = appraisal.length;
  appraisal.forEach((element) => {
    total += element.overallRating;
  });
  const ratingTotal = total / totalAppraisalRating;
  // console.log("Rating", total / totalAppraisalRating);
  return ratingTotal;
};

// slice
const staffAppraisalSlice = createSlice({
  name: "staffAppraisal",
  initialState: {
    allStaffAppraisal: [], // To store all users
    appraisalByUser: [],
    individualAppraisal: {},
    userTotalRating: 0,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Error messages
    toggleBar: false, // Toggle state
  },
  reducers: {
    toggleBar: (state) => {
      state.toggleBar = !state.toggleBar;
      // console.log(state.toggleBar);
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
        state.allStaffAppraisal = action.payload;
        // state.token = action.payload.token;
      })
      .addCase(getAllStaffAppraisal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Handle getAllUsers
      .addCase(getAppraisalByUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAppraisalByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.appraisalByUser = action.payload;
        state.userTotalRating = calculateAppraisal(action.payload);
      })
      .addCase(getAppraisalByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle getAppraisalById
      .addCase(getAppraisalById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAppraisalById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.individualAppraisal = action.payload;
      })
      .addCase(getAppraisalById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, toggleBar } = staffAppraisalSlice.actions;
export default staffAppraisalSlice.reducer;
