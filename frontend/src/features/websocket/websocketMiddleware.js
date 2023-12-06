import { socketActions } from "./socketSlice";
const { connected, connecting, disconnected, messageDelete, messageSend, messageUpdate, friendInvite } = socketActions;

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

  return next(action);
};
