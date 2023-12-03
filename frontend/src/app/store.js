import authSlice from "../features/auth/authSlice";
import friendsSlice from "../features/friends/friendsSlice";
import chatSlice from "../features/chats/chatSlice";
import socketSlice from "../features/websocket/socketSlice";
import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleWare } from "../features/websocket/websocketMiddleware";
import { createWebsocket } from "../features/websocket/createWebsocket";

export default configureStore({
  reducer: {
    auth: authSlice,
    friends: friendsSlice,
    chats: chatSlice,
    socket: socketSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleWare(createWebsocket())),
});
