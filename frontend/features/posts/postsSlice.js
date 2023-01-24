import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserPosts } from "../../helpers/api";

const initialState = {
  personalPosts: [],
  feed: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const userPosts = createAsyncThunk(
  "posts/personalPosts",
  async (data, thunkAPI) => {
    try {
      const {username, token} = data;
      const body = {
        username
      }
      return await fetchUserPosts( body , token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.personalPosts = action.payload.personalPosts;
      })
      .addCase(userPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.personalPosts = null;
      });
  },
});

export const { reset: resetPosts } = postsSlice.actions;
export default postsSlice.reducer;
