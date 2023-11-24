import authSlice from "../features/auth/authSlice";
import friendsSlice from "../features/friends/friendsSlice";
import chatSlice from "../features/chats/chatSlice";
import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleWare } from "../features/users/websocket/websocketMiddleware";
import { createWebsocket } from "../features/users/websocket/createWebsocket";

export default configureStore({
  reducer: {
    auth: authSlice,
    friends: friendsSlice,
    chats: chatSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleWare(createWebsocket())),
});
