import { io } from "socket.io-client";

export const createWebsocket = () => {
  return io("http://localhost:4202", { autoConnect: false });
};
