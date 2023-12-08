import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  status: "idle",
  error: null,
  username: null,
  userId: null,
  modalOpen: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.error = null;
    },
    setUserData: (state, action) => {
      state.username = action.payload.username;
      state.userId = action.payload.userId;
    },
    modalOpen: (state, action) => {
      state.modalOpen = true;
    },
    modalClose: (state, action) => {
      state.modalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // On successful login, set the username and id in the store
      .addCase("auth/login/fulfilled", (state, action) => {
        state.username = action.payload.user.username;
        state.userId = action.payload.user.user_id;
      })
      .addCase("auth/register/fulfilled", (state, action) => {
        state.username = action.payload.user.username;
        state.userId = action.payload.user.user_id;
      })
      // On successful logout, set the username and id in the store to null
      .addCase("auth/logout/fulfilled", (state, action) => {
        state.username = null;
        state.userId = null;
      });
  },
});

export default userSlice.reducer;
export const { reset, setUserData, modalOpen, modalClose } = userSlice.actions;
