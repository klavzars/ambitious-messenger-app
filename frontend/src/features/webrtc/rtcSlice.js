import { createSlice } from "@reduxjs/toolkit";

// have a look at this
const initialState = {
  connected: false,
  description: null,
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
  },
});

export const rtcActions = rtcSlice.actions;
export default rtcSlice.reducer;
