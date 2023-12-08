import { socketActions } from "../websocket/socketSlice";
import Peer from "./peer";
import { rtcActions } from "./rtcSlice";
const { createConnection, disconnectRTC } = rtcActions;
import EventEmitter from "events";
import mitt from "mitt";

let localStream = null;
let remoteStream = null;
let rtcPeer = null;

export const getStreams = () => {
  return {
    localStream,
    remoteStream,
  };
};

// create an event emitter for the rtc events
export const streamEmitter = mitt();

export const rtcMiddleware = () => (storeAPI) => (next) => (action) => {
  const { dispatch, getState } = storeAPI;
  const { type, payload } = action;
  let iceCandidateQueue = [];

  if (createConnection.match(action)) {
    rtcPeer = new Peer();

    rtcPeer.peer.onnegotiationneeded = async () => {
      const offer = await rtcPeer.getOffer();
      // TODO will emit an event to the server to send the offer to the other peer
      console.log("on negotiation offer", offer);
      dispatch(socketActions.peerNegotiationNeeded({ to: rtcPeer.getTargetPeer(), offer }));
      //dispatch(rtcActions.createOffer(offer));
    };

    rtcPeer.peer.ontrack = (event) => {
      [remoteStream] = event.streams;
      streamEmitter.emit("streams", { localStream, remoteStream });
    };

    rtcPeer.peer.onconnectionstatechange = (event) => {
      switch (rtcPeer.peer.connectionState) {
        case "new":
        case "connecting":
          console.log("RTC Connecting…");
          break;
        case "connected":
          console.log("RTC Online");
          break;
        case "disconnected":
          console.log("RTC Disconnecting…");
          break;
        case "closed":
          console.log("RTC Offline");
          break;
        case "failed":
          console.log("RTC Error");
          break;
        default:
          console.log("RTC Unknown");
          break;
      }
    };

    rtcPeer.peer.onicecandidate = (event) => {
      if (event.candidate) {
        // TODO will emit an event to the server to send the offer to the other peer
        const serializableCandidate = {
          candidate: event.candidate.candidate,
          sdpMid: event.candidate.sdpMid,
          sdpMLineIndex: event.candidate.sdpMLineIndex,
        };
        dispatch(
          socketActions.sendIceCandidate({
            to: rtcPeer.targetPeer,
            candidate: serializableCandidate,
          })
        );
      }
    };

    // could add event listeners to listen out for the status of the call and such etc
  }

  if (disconnectRTC.match(action)) {
    // Perform cleanup
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      localStream = null;
    }

    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
      remoteStream = null;
    }

    if (rtcPeer) {
      rtcPeer.peer.close();
      rtcPeer = null;
    }
  }

  if (rtcActions.setOffer.match(action)) {
    console.log("setting offer", payload);
    //store the offer
    rtcPeer.setStoredOffer(payload.offer);
    rtcPeer.setTargetPeer(payload.from);
    console.log("offer set", rtcPeer.getStoredOffer());

    //set the remote description for if the peer is recieving the call
  }

  // if user decided to start a call
  if (rtcActions.startCall.match(action)) {
    // TODO will emit an event to the server to send the offer to thze other peer
    //dispatch(rtcActions.createConnection());
    console.log("starting");

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then(async (stream) => {
        localStream = stream;
        streamEmitter.emit("streams", { localStream, remoteStream });
        console.log("localStream", localStream);
        rtcPeer.setTargetPeer(payload);
        const offer = await rtcPeer.getOffer();
        const serializableOffer = {
          type: offer.type,
          sdp: offer.sdp,
        };
        dispatch(socketActions.callRequestSend({ to: payload, offer: serializableOffer }));
      });
  }

  // user B handling the call request from user A
  if (rtcActions.handleReceivingCall.match(action)) {
    //with the offer being set already and the user accepting the call, prepare the localstream and update
    console.log("starting");
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then(async (stream) => {
        localStream = stream;
        streamEmitter.emit("streams", { localStream, remoteStream });
        console.log("offer going into peeor for anwser", rtcPeer.getStoredOffer());
        const answer = await rtcPeer.getAnswer();
        const serializableAnswer = {
          type: answer.type,
          sdp: answer.sdp,
        };
        dispatch(socketActions.callRequestAccepted({ to: rtcPeer.getTargetPeer(), answer: serializableAnswer }));
      });
  }

  // if user B has accepted the call request from user A then A will set their description to the answer
  if (rtcActions.handleAcceptedCall.match(action)) {
    console.log("setting answer", payload);
    rtcPeer.setRemoteDescription(payload.answer).then(() => {
      dispatch(rtcActions.setStreams({ localStream }));
    });
  }

  if (rtcActions.setStreams.match(action)) {
    const { localStream } = payload;
    const senders = rtcPeer.peer.getSenders();

    localStream.getTracks().forEach((track) => {
      if (!senders.find((sender) => sender.track === track)) {
        rtcPeer.peer.addTrack(track, localStream);
      }
    });

    streamEmitter.emit("streams", { localStream, remoteStream });
  }

  if (rtcActions.handleInboundNegotiation.match(action)) {
    const { offer } = payload;
    rtcPeer.getAnswer(offer).then((answer) => {
      dispatch(socketActions.peerNegotiationDone({ to: payload, answer }));
    });
  }

  if (rtcActions.handleNegotiationFinal.match(action)) {
    const { ans } = payload;
    rtcPeer.setRemoteDescription(ans);
  }

  if (rtcActions.handleNewIceCandidate.match(action)) {
    const { candidate } = payload;
    const newCandidate = new RTCIceCandidate(candidate);
    console.log(" newCandidate", newCandidate);
    rtcPeer.addIceCandidate(newCandidate);
  }

  return next(action);
};

