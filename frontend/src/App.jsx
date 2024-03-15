import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import LogIn from "./features/auth/LogIn";
import SignUp from "./features/auth/SignUp";
import { setAuthStatus } from "./store/authSlice";
import { setUserData } from "./store/userSlice";
import "./App.scss";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./features/routing/ProtectedRoute";
import PublicRoute from "./features/routing/PublicRoute";
import Chats from "./features/chat/Chats";
import useIsMobile from "./hooks/useIsMobile";
import Chat from "./features/chat/Chat";

import AddFriend from "./features/friends/AddFriend";

import { fetcher } from "./app/fetcher";
import FriendRequests from "./features/friends/FriendRequests";
import Contacts from "./features/chat/all-chats/Contacts";
import NewChat from "./features/chat/new-chat/NewChat";
import NoChatsOpen from "./features/chat/NoChatsOpen";

function App() {
  const authStatus = useSelector((state) => state.auth.authStatus);
  const dispatch = useDispatch();

  // check if user is authenticated on page reload
  //  TODO NOTE: I think we should make an API call to check if the token is valid
  useEffect(() => {
    // get token expiration timestamp from localStorage
    const expirationTimestamp = localStorage.getItem("tokenExpires");
    if (expirationTimestamp) {
      const currentTime = Date.now();

      // compare current time to expiration timestamp
      if (currentTime < expirationTimestamp) {
        dispatch(setAuthStatus("auth"));

        const username = localStorage.getItem("username");
        const userId = localStorage.getItem("userId");

        // Also set user data on page reload
        if (username && userId) {
          dispatch(setUserData({ username, userId }));
        }
      } else {
        localStorage.removeItem("tokenExpires");
        dispatch(setAuthStatus("unauth"));
      }
    } else {
      dispatch(setAuthStatus("unauth"));
    }
  }, [dispatch]);

  const isMobile = useIsMobile();

  const mobileRouting = (
    <>
      <Route path="/chats" element={<Contacts />} />
      <Route path="/chats/:chatId" element={<Chat />} />
      <Route path="/chats/new" element={<NewChat />} />
      <Route path="/chats/add-friend" element={<AddFriend />} />
      <Route path="/chats/friend-requests" element={<FriendRequests />} />
    </>
  );

  const desktopRouting = (
    <Route path="/chats" element={<Chats />}>
      <Route path="" element={<NoChatsOpen />} />
      <Route path=":chatId" element={<Chat />} />
      <Route path="add-friend" element={<AddFriend />} />
      <Route path="friend-requests" element={<FriendRequests />} />
      <Route path="new" element={<NewChat />} />
    </Route>
  );

  return (
    <>
      <Routes>
        <Route element={<PublicRoute authStatus={authStatus} />}>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoute authStatus={authStatus} />}>
          {isMobile ? mobileRouting : desktopRouting}
          <Route path="*" element={<Navigate to="/chats" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
