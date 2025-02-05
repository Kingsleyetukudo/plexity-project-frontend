import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// Async thunk to fetch comments
export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async () => {
    const response = await api.get("/comment");
    return response.data;
  }
);

// Async thunk to add a new comment
export const addComment = createAsyncThunk(
  "comment/addComment",
  async (comment) => {
    const response = await api.post("/comment", comment);
    // console.log(response);
    return response.data;
  }
);

// Async thunk to update a comment by id
export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async ({ id, comment }) => {
    const response = await api.put(`/comment/${id}`, { comment });
    return response.data;
  }
);

// Delete comment action
export const deleteCommentById = createAsyncThunk(
  "comment/deleteCommentById",
  async (id) => {
    await api.delete(`/comment/${id}`);
    return id; // Return the ID of the deleted comment
  }
);

// Async thunk to fetch comments by current user
export const fetchCommentsByCurrentUser = createAsyncThunk(
  "comment/fetchCommentsByCurrentUser",
  async (userId) => {
    const response = await api.get(`/comment/sender/${userId}`);
    console.log(response.data);
    return response.data;
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    userComments: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // You can add synchronous actions here if needed
  },
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
        state.error = action.error.message;
      })

      .addCase(fetchCommentsByCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCommentsByCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userComments = action.payload;
      })
      .addCase(fetchCommentsByCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addComment.fulfilled, (state, action) => {
        if (Array.isArray(state.comments)) {
          state.comments.push(action.payload);
        } else {
          state.comments = [action.payload]; // Reset if undefined
        }
      })

      .addCase(deleteCommentById.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteCommentById.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted comment from the state
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload
        );
      })
      .addCase(deleteCommentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default commentSlice.reducer;
