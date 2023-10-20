import userSlice from "../features/users/userSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    users: userSlice,
  },
});
