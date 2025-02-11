import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// Fetch all comments
export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/comment");
      return response.data.data.comments || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Fetching comments failed"
      );
    }
  }
);

// Add a new comment
export const addComment = createAsyncThunk(
  "comment/addComment",
  async ({ comment, userId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/comment", comment);
      dispatch(fetchComments());
      dispatch(fetchCommentsByCurrentUser(userId));

      console.log(response.data.data.comment);
      return response.data.data.comment;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Adding comment failed");
    }
  }
);

// Update a comment by ID
export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async ({ id, comment }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/comment/${id}`, { comment });
      return response.data.data.comment;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Updating comment failed");
    }
  }
);

// Delete a comment by ID
export const deleteCommentById = createAsyncThunk(
  "comment/deleteCommentById",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await api.delete(`/comment/${id}`);
      dispatch(fetchComments());
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Deleting comment failed");
    }
  }
);

// Fetch comments by current user
export const fetchCommentsByCurrentUser = createAsyncThunk(
  "comment/fetchCommentsByCurrentUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/comment/sender/${userId}`);
      console.log(response.data.data.comments);
      return response.data.data.comments || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Fetching user comments failed"
      );
    }
  }
);

// Comment slice
const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    userComments: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCommentsByCurrentUser.fulfilled, (state, action) => {
        state.userComments = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(deleteCommentById.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload
        );
      });
  },
});

export default commentSlice.reducer;
