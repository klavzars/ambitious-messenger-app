import { rtcActions } from "../webrtc/rtcSlice";
import { socketActions } from "./socketSlice";
const {
  connected,
  connecting,
  disconnected,
  messageDelete,
  messageSend,
  messageUpdate,
  friendInvite,
  callRequestAccepted,
  callRequestSend,
  peerNegotiationDone,
  peerNegotiationNeeded,
} = socketActions;

export const socketMiddleWare = (socket) => (params) => (next) => (action) => {
  const { dispatch, getState } = params;
  const { type, payload } = action;

  const isConnectionThere = getState().socket.isConnected;

  if (connecting.match(action)) {
    socket.connect();
    console.log("connected");

    // on successful connection set connection state of the socket
    socket.on("connect", () => {
      dispatch(connected());
    });

    // TODO setup would dispatch these actions e.g if message recieved append it to the existing list of message for that store. if its updating a message then find the message by id and replace it.
    socket.on("message-received", (data) => {});
    socket.on("message-deleted", (data) => {});
    socket.on("message-updated", (data) => {});
    socket.on("auth-success", (data) => {});
    socket.on("auth-fail", (data) => {});
    socket.on("invitation-received", (data) => {});
    socket.on("invitation-accepted", (data) => {});
    socket.on("invitation-declined", (data) => {});

    // listeners for calls from other users
    socket.on("call-request-recv", (data) => {
      dispatch(rtcActions.handleReceivingCall(data));
    });
    socket.on("call-request-accepted", (data) => {
      dispatch(rtcActions.handleAcceptedCall(data));
    });
    socket.on("call-negotiation-needed", (data) => {
      dispatch(rtcActions.handleInboundNegotiation(data));
    });
    socket.on("call-negotiation-done", (data) => {
      dispatch(rtcActions.handleNegotiationFinal(data));
    });
  }

  if (disconnected.match(action) && isConnectionThere) {
    socket.disconnect();
    console.log("disconnected");
  }

  if (messageDelete.match(action) && isConnectionThere) {
    socket.emit("message-delete", payload);
  }

  if (messageSend.match(action) && isConnectionThere) {
    socket.emit("message-send", payload);
  }

  if (messageUpdate.match(action) && isConnectionThere) {
    socket.emit("message-update", payload);
  }

  if (friendInvite.match(action) && isConnectionThere) {
    socket.emit("invitation", payload);
  }

  // when the user has started a call
  if (callRequestSend.match(action) && isConnectionThere) {
    socket.emit("call-request-send", payload);
  }

  // when the user has accepted a call
  if (callRequestAccepted.match(action) && isConnectionThere) {
    socket.emit("call-request-accepted", payload);
  }

  // when the peer has started negotiating
  if (peerNegotiationNeeded.match(action) && isConnectionThere) {
    socket.emit("call-negotiation-needed", payload);
  }

  // when the peer has finished negotiating
  if (peerNegotiationDone.match(action) && isConnectionThere) {
    socket.emit("call-negotiation-final", payload);
  }

  return next(action);
};
