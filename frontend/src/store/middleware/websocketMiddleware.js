import { messageActions } from "../messageSlice";
import { rtcActions } from "../rtcSlice";
import { socketActions } from "../socketSlice";
import socket from "../../services/websocket/createWebsocket";
import { modalOpen } from "../userSlice";
const {
  connected,
  connecting,
  setConnecting,
  disconnected,
  messageDelete,
  messageSend,
  messageUpdate,
  friendInvite,
  callRequestAccepted,
  callRequestSend,
  peerNegotiationDone,
  peerNegotiationNeeded,
  sendIceCandidate,
} = socketActions;

let socketMiddlewareInstance = null;

export const socketMiddleWare = (params) => {
  if (socketMiddlewareInstance) {
    return socketMiddlewareInstance;
  }

  socketMiddlewareInstance = (next) => (action) => {
    const { dispatch, getState } = params;
    const { type, payload } = action;

    const isConnectionThere = getState().socket.isConnected;
    const isConnecting = getState().socket.isConnecting;

    if (connecting.match(action)) {
      // dispatch(setConnecting());
      if (!socket.connected && !isConnecting) {
        //tuki se check ce se ze connecta !!!!!! TODO

        socket.connect();

        // on successful connection set connection state of the socket
        socket.on("connect", () => {
          console.log("connected");
          dispatch(connected());
        });

        socket.on("upgrade", () => {
          // Remove old listeners
          console.log("upgrade");
        });

        socket.on("message-received", (data) => {
          dispatch(messageActions.sendMessage(data));
        });
        socket.on("message-deleted", (data) => {
          dispatch(messageActions.deleteMessage(data));
        });
        socket.on("message-updated", (data) => {
          dispatch(messageActions.updateMessage(data));
        });
        socket.on("auth-success", (data) => {});
        socket.on("auth-fail", (data) => {});
        socket.on("invitation-received", (data) => {});
        socket.on("invitation-accepted", (data) => {});
        socket.on("invitation-declined", (data) => {});

        // // listeners for calls from other users
        // socket.on("call-request-recv", (data) => {
        //   console.log("call-request-recv", data);

        //   //if there is an offer then show
        //   if (data.offer) {
        //     dispatch(modalOpen());
        //     dispatch(rtcActions.setOffer(data));
        //   }
        // });
        // socket.on("call-request-accepted", (data) => {
        //   console.log("call-request-accepted", data);
        //   dispatch(rtcActions.handleAcceptedCall(data));
        // });
        // socket.on("call-negotiation-needed", (data) => {
        //   console.log("call-negotiation-needed", data);
        //   dispatch(rtcActions.handleInboundNegotiation(data));
        // });
        // socket.on("call-negotiation-done", (data) => {
        //   console.log("call-negotiation-done", data);
        //   dispatch(rtcActions.handleNegotiationFinal(data));
        // });

        // socket.on("new-ice-candidate", (data) => {
        //   console.log("new-ice-candidate", data);
        //   dispatch(rtcActions.handleNewIceCandidate(data));
        // });
      }
    }

    if (disconnected.match(action) && isConnectionThere) {
      // Remove listeners
      socket.off("message-received");
      socket.off("message-deleted");
      socket.off("message-updated");
      socket.off("auth-success");
      socket.off("auth-fail");
      socket.off("invitation-received");
      socket.off("invitation-accepted");
      socket.off("invitation-declined");
      socket.off("call-request-recv");
      socket.off("call-request-accepted");
      socket.off("call-negotiation-needed");
      socket.off("call-negotiation-done");

      // Disconnect the socket
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

    // // when the user has started a call
    // if (callRequestSend.match(action) && isConnectionThere) {
    //   console.log("call-request-send", payload);
    //   socket.emit("call-request-send", payload);
    // }

    // // when the user has accepted a call
    // if (callRequestAccepted.match(action) && isConnectionThere) {
    //   console.log("call-request-accepted", payload);
    //   socket.emit("call-request-accepted", payload);
    // }

    // // when the peer has started negotiating
    // if (peerNegotiationNeeded.match(action) && isConnectionThere) {
    //   console.log("call-negotiation-needed", payload);
    //   socket.emit("call-negotiation-needed", payload);
    // }

    // // when the peer has finished negotiating
    // if (peerNegotiationDone.match(action) && isConnectionThere) {
    //   console.log("call-negotiation-final", payload);
    //   socket.emit("call-negotiation-final", payload);
    // }

    // if (sendIceCandidate.match(action) && isConnectionThere) {
    //   console.log("sendIceCandidate", payload);

    //   socket.emit("send-ice-candidate", payload);
    // }

    return next(action);
  };

  return socketMiddlewareInstance;
};
