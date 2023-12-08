import authSlice from "../features/auth/authSlice";
import friendsSlice from "../features/friends/friendsSlice";
import chatSlice from "../features/chats/chatSlice";
import socketSlice from "../features/websocket/socketSlice";
import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleWare } from "../features/websocket/websocketMiddleware";

import userSlice from "../features/user/userSlice";
import messageSlice from "../features/messages/messageSlice";
import { rtcMiddleware } from "../features/webrtc/rtcMiddleware";
import rtcSlice from "../features/webrtc/rtcSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    friends: friendsSlice,
    users: userSlice,
    chats: chatSlice,
    socket: socketSlice,
    messages: messageSlice,
    rtc: rtcSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleWare, rtcMiddleware()),
});
