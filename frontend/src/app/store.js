import authSlice from "../features/auth/authSlice";
import friendsSlice from "../features/friends/friendsSlice";
import chatSlice from "../features/chats/chatSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    auth: authSlice,
    friends: friendsSlice,
    chats: chatSlice,
  },
});
