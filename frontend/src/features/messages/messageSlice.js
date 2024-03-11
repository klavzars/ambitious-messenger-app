import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import messageService from "./messageService";

const initialState = {
  byChatId: {},
};
export const loadMessages = createAsyncThunk("messages/loadMessages", async (chat_id, thunkAPI) => {
  try {
    return await messageService.getMessages(chat_id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      const { chat_id } = action.payload;
      if (!state.byChatId[chat_id]) {
        state.byChatId[chat_id] = [];
      }
      state.byChatId[chat_id].push(action.payload);
    },
    deleteMessage: (state, action) => {
      const { chat_id, id } = action.payload;
      state.byChatId[chat_id] = state.byChatId[chat_id].filter((message) => message.id !== id);
    },
    updateMessage: (state, action) => {
      const { chat_id, id, text, isEdited } = action.payload;
      const message = state.byChatId[chat_id].find((message) => message.id === id);
      message.text = text;
      message.isEdited = isEdited;
    },
    // ... other reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMessages.fulfilled, (state, action) => {
        const { chat_id, messages } = action.payload;
        // console.log("loadMessages fulfilled", action);
        state.byChatId[chat_id] = messages;
      })
      .addCase(loadMessages.rejected, (state, action) => {
        // console.log("loadMessages rejected", action);
      })
      .addCase(loadMessages.pending, (state, action) => {
        // console.log("loadMessages pending", action);
      });
  },
});

export const messageActions = messagesSlice.actions;
export default messagesSlice.reducer;
