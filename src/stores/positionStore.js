import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// Async thunk to get all departments
export const getAllPositions = createAsyncThunk(
  "positions/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/position");
      return response.data.data.positions;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to create a new department
export const createPosition = createAsyncThunk(
  "positions/create",
  async (departmentData, thunkAPI) => {
    try {
      const response = await api.post("/position", { name: departmentData });

      if (response.status === 201) {
        thunkAPI.dispatch(getAllPositions());
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
export const updatePosition = createAsyncThunk(
  "positions/update",
  async ({ id, departmentData }, thunkAPI) => {
    try {
      // console.log("Updating position:", { id, departmentData });
      const response = await api.put(`/position/${id}`, departmentData);

      // ✅ Dispatch only if update is successful
      if (response.status === 200) {
        thunkAPI.dispatch(getAllPositions());
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to update position"
      );
    }
  }
);

// Async thunk to delete a department
export const deletePosition = createAsyncThunk(
  "positions/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`position/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const positionSlice = createSlice({
  name: "positions",
  initialState: {
    positions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPositions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPositions.fulfilled, (state, action) => {
        state.loading = false;
        state.positions = action.payload;
      })
      .addCase(getAllPositions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPosition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPosition.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure state.departments is always an array
        if (Array.isArray(state.postions)) {
          state.positions.push(action.payload);
        } else {
          state.positions = [action.payload]; // Reset if it's not an array
        }
      })
      .addCase(createPosition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePosition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePosition.fulfilled, (state, action) => {
        state.loading = false;
        state.positions = state.positions.map((position) =>
          position._id === action.payload._id ? action.payload : position
        );
      })
      .addCase(updatePosition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePosition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePosition.fulfilled, (state, action) => {
        state.loading = false;
        state.positions = state.positions.filter(
          (position) => position._id !== action.payload
        );
      })
      .addCase(deletePosition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default positionSlice.reducer;
