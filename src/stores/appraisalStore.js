import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// get appraisal thunk
export const getAllAppraisal = createAsyncThunk(
  "appraisal/getAllAppraisal",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/appraisal");
      // console.log(response.data.data.appraisals);
      return response.data.data.appraisals || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Getting all staff appraisal failed"
      );
    }
  }
);

// create addAppraise thunk
export const addAppraise = createAsyncThunk(
  "appraisal/addAppraise",
  async (appraiseData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/appraisal", appraiseData);
      // After adding the new appraisal, call getAllAppraisal to refresh the list
      dispatch(getAllAppraisal());
      return response.data.data.appraisal;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Adding new appraisal failed"
      );
    }
  }
);
// create updateAppraisal thunk
export const updateAppraisal = createAsyncThunk(
  "appraisal/updateAppraisal",
  async ({ id, appraiseData }, { dispatch, rejectWithValue }) => {
    console.log("updateAppraisal Called with:", { id, appraiseData });

    if (!id || !appraiseData) {
      console.error("Missing id or appraiseData in updateAppraisal!");
      return rejectWithValue("Invalid request: Missing required fields");
    }

    try {
      const response = await api.put(`/appraisal/${id}`, appraiseData);
      dispatch(getAllAppraisal());
      return response.data.data.appraisal;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Updating appraisal failed"
      );
    }
  }
);

// create deleteAppraisal thunk
export const deleteAppraisal = createAsyncThunk(
  "appraisal/deleteAppraisal",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await api.delete(`/appraisal/${id}`);
      // After deleting the appraisal, call getAllAppraisal to refresh the list
      dispatch(getAllAppraisal());
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Deleting appraisal failed"
      );
    }
  }
);

// slice
const appraisalSlice = createSlice({
  name: "staffAppraisal",
  initialState: {
    appraisals: [], // To store all users
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Error messages
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Handle getAllAppraisals
      .addCase(getAllAppraisal.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllAppraisal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.appraisals = action.payload;
      })
      .addCase(getAllAppraisal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default appraisalSlice.reducer;
