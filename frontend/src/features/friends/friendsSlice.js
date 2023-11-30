import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import friendsService from "./friendsService";

export const getAllFriends = createAsyncThunk("friends/getAllFriends", async (_, thunkAPI) => {
  try {
    return await friendsService.getAllFriends();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  status: "idle",
  error: null,
  friendsList: [],
};

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFriends.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllFriends.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.friendsList = action.payload;
      })
      .addCase(getAllFriends.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default friendsSlice.reducer;
export const { reset } = friendsSlice.actions;
