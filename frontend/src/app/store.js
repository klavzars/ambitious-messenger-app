import authSlice from "../store/authSlice";
import friendsSlice from "../store/friendsSlice";
import chatSlice from "../store/chatSlice";
import socketSlice from "../store/socketSlice";
import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleWare } from "../store/middleware/websocketMiddleware";

import userSlice from "../store/userSlice";
import messageSlice from "../store/messageSlice";
import { rtcMiddleware } from "../store/middleware/rtcMiddleware";
import rtcSlice from "../store/rtcSlice";

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
