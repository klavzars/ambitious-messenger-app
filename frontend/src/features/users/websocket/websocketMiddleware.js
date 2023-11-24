import {
  WEBSOCKET_AUTHENTICATE,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE_DELETE,
  WEBSOCKET_MESSAGE_RECEIVED,
  WEBSOCKET_MESSAGE_SEND,
  WEBSOCKET_MESSAGE_UPDATE,
} from "./ActionTypes";

export const socketMiddleWare = (socket) => (params) => (next) => (action) => {
  const { dispatch, getState } = params;
  const { type, payload } = action;

  // socket event listeners
  switch (type) {
    case WEBSOCKET_CONNECT:
      socket.connect();
      console.log("connected");

      // TODO add the event listener events here

      break;

    // TODO change this for the socket to disconnect
    case WEBSOCKET_DISCONNECT:
      console.log("disconnecting...");
      socket.disconnect();
      break;

    case WEBSOCKET_AUTHENTICATE:
      socket.on("auth", (data) => {
        console.log("authenticated");
      });
      break;

    // TODO change to emit
    case WEBSOCKET_MESSAGE_SEND:
      socket.on("message-send", (data) => {
        console.log("message sent");
      });
      break;

    case WEBSOCKET_MESSAGE_RECEIVED:
      socket.on("message-received", (data) => {
        console.log("message received");
      });
      break;
    // TODO change to emit
    case WEBSOCKET_MESSAGE_DELETE:
      socket.on("message", (data) => {
        console.log("message deleted");
      });
      break;

    // TODO change to emit
    case WEBSOCKET_MESSAGE_UPDATE:
      socket.on("message", (data) => {
        console.log("message updated");
      });
      break;

    default:
      break;
  }

  return next(action);
};
