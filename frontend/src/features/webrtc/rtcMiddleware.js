import { socketActions } from "../websocket/socketSlice";
import Peer from "./peer";
import { rtcActions } from "./rtcSlice";
const { createConnection } = rtcActions;

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

let localStream = null;
let remoteStream = null;
let rtcPeer = null;

export const rtcMiddleWare = (rtc) => (storeAPI) => (next) => (action) => {
  const { dispatch, getState } = storeAPI;
  const { type, payload } = action;

  if (createConnection.match(action)) {
    rtcPeer = new Peer();

    rtcPeer.peer.onnegotiationneeded = async () => {
      const offer = await rtcPeer.getOffer();
      // TODO will emit an event to the server to send the offer to the other peer
      dispatch(socketActions.peerNegotiationNeeded({ to: payload, offer }));
      //dispatch(rtcActions.createOffer(offer));
    };

    rtcPeer.peer.ontrack = (event) => {
      remoteStream = event.streams[0];
    };

    rtcPeer.peer.onconnectionstatechange = (event) => {
      switch (rtcPeer.peer.connectionState) {
        case "new":
        case "connecting":
          console.log("Connecting…");
          break;
        case "connected":
          console.log("Online");
          break;
        case "disconnected":
          console.log("Disconnecting…");
          break;
        case "closed":
          console.log("Offline");
          break;
        case "failed":
          console.log("Error");
          break;
        default:
          console.log("Unknown");
          break;
      }
    };

    // could add event listeners to listen out for the status of the call and such etc
  }

  // if user decided to start a call
  if (rtcActions.startCall.match(action)) {
    // TODO will emit an event to the server to send the offer to the other peer
    dispatch(rtcActions.createConnection());

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then(async (stream) => {
        localStream = stream;
        const offer = await rtcPeer.getOffer();
        // TODO will emit an event to the server to send the offer to the other peer
        dispatch(socketActions.callRequestSend({ to: payload, offer }));
      });
  }

  // if user B has accepted the call from user A
  if (rtcActions.handleAcceptedCall.match(action)) {
    rtcPeer.setLocalDescription(payload);
    dispatch(rtcActions.setStreams({ localStream }));
  }

  if (rtcActions.setStreams.match(action)) {
    const { localStream } = payload;
    localStream.getTracks().forEach((track) => {
      rtcPeer.peer.addTrack(track, localStream);
    });
  }

  if (rtcActions.handleInboundNegotiation.match(action)) {
    const { offer } = payload;
    rtcPeer.getAnswer(offer).then((answer) => {
      dispatch(socketActions.peerNegotiationDone({ to: payload, ans: answer }));
    });
  }

  if (rtcActions.handleNegotiationFinal.match(action)) {
    const { ans } = payload;
    rtcPeer.setRemoteDescription(ans);
  }

  return next();
};
