import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isConnecting: false,
  isConnected: false,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    connecting: (state) => {
      state.isConnecting = true;
    },
    connected: (state) => {
      state.isConnecting = false;
      state.isConnected = true;
    },
    disconnected: (state) => {
      state.isConnecting = false;
      state.isConnected = false;
    },
    // these are just so that then reducer in the middleware can handle it there
    messageSend: (state, action) => {
      return;
    },
    messageDelete: (state, action) => {
      return;
    },
    messageUpdate: (state, action) => {
      return;
    },
    friendInvite: (state, action) => {
      return;
    },
    callRequestSend: (state, action) => {
      return;
    },
    callRequestAccepted: (state, action) => {
      return;
    },
    peerNegotiationNeeded: (state, action) => {
      return;
    },
    peerNegotiationDone: (state, action) => {
      return;
    },
  },
});

export const socketActions = socketSlice.actions;
export default socketSlice.reducer;
