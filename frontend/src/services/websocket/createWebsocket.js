import io from "socket.io-client";

const socket = io("http://localhost:4202", { autoConnect: false, withCredentials: true });
export default socket;
