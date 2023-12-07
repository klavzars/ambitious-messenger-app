import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { setAuthStatus } from "./features/auth/authSlice";
import { setUserData } from "./features/user/userSlice";
import "./App.scss";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import PublicRoute from "./components/routing/PublicRoute";
import Chats from "./pages/Chats";
import NewChat from "./components/chat/NewChat";
import { fetcher } from "./app/fetcher";

function App() {
  const { authStatus } = useSelector((state) => state.auth);
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

  useEffect(() => {
    // fetcher("/chat/briantwene").then(console.log).catch(console.error);
  }, []);

  return (
    <>
      <Routes>
        <Route element={<PublicRoute authStatus={authStatus} />}>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoute authStatus={authStatus} />}>
          <Route path="*" element={<Navigate to="/chats" replace />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chats/:chatId" element={<Chats />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
