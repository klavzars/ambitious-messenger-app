import { createSlice } from "@reduxjs/toolkit";

// have a look at this
const initialState = {
  connected: false,
  description: null,
  offer: null,
};

const rtcSlice = createSlice({
  name: "rtc",
  initialState,
  reducers: {
    startCall: (state) => {},
    handleReceivingCall: (state) => {},
    handleAcceptedCall: (state) => {},
    handleInboundNegotiation: (state) => {},
    handleNegotiationFinal: (state) => {},
    setStreams: (state) => {},
    setLocalStream: (state) => {},
    setRemoteStream: (state) => {},
    createConnection: (state) => {
      state.connected = true;
    },
    createOffer: (state, action) => {
      state.description = action.payload;
    },
    createAnswer: (state, action) => {
      state.description = action.payload;
    },
    addIceCandidate: (state, action) => {
      state.description = action.payload;
    },
    setLocalDescription: (state, action) => {},
    setRemoteDescription: (state, action) => {},
    setOffer: (state, action) => {},
    disconnectRTC: (state) => {
      state.connected = false;
    },
    handleNewIceCandidate: (state, action) => {},
  },
});

export const rtcActions = rtcSlice.actions;
export default rtcSlice.reducer;
