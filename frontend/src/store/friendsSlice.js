import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import friendsService from "../services/friendsService";

export const getAllFriends = createAsyncThunk("friends/getAllFriends", async (_, thunkAPI) => {
  try {
    return await friendsService.getAllFriends();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const addFriend = createAsyncThunk("friends/addFriend", async (username, thunkAPI) => {
  try {
    return await friendsService.addFriend(username);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getAllFriendRequests = createAsyncThunk("friends/getAllFriendRequests", async (_, thunkAPI) => {
  try {
    return await friendsService.getAllFriendRequests();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const acceptFriendRequest = createAsyncThunk("friends/acceptFriendRequest", async (requestData, thunkAPI) => {
  try {
    return await friendsService.acceptFriendRequest(requestData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const declineFriendRequest = createAsyncThunk("friends/declineFriendRequest", async (requestId, thunkAPI) => {
  try {
    return await friendsService.declineFriendRequest(requestId);
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
  friendRequests: [],
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
      })
      .addCase(addFriend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addFriend.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addFriend.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getAllFriendRequests.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllFriendRequests.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.friendRequests = action.payload;
      })
      .addCase(getAllFriendRequests.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(acceptFriendRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        state.status = "succeeded";

        const index = state.friendRequests.findIndex((request) => request.id === action.meta.arg.id);

        if (index !== -1) {
          state.friendRequests[index].currentStatus = "accepted";
        }
      })
      .addCase(acceptFriendRequest.rejected, (state) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(declineFriendRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(declineFriendRequest.fulfilled, (state, action) => {
        state.status = "succeeded";

        const index = state.friendRequests.findIndex((request) => request.id === action.meta.arg);

        if (index !== -1) {
          state.friendRequests[index].currentStatus = "declined";
        }
      })
      .addCase(declineFriendRequest.rejected, (state) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default friendsSlice.reducer;
export const { reset } = friendsSlice.actions;
