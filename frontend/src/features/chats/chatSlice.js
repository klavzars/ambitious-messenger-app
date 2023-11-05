import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "./chatService";

export const createChat = createAsyncThunk("chat/create", async (newChatData, thunkAPI) => {
  try {
    return await chatService.createChat(newChatData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  status: "idle",
  error: null,
};

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChat.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createChat.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default chatSlice.reducer;
export const { reset } = chatSlice.actions;
