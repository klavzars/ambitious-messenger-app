import userSlice from "../features/users/userSlice";
import chatSlice from "../features/chats/chatSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    users: userSlice,
    chats: chatSlice,
  },
});
