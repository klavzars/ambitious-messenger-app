import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { setAuthStatus } from "./features/auth/authSlice";
import "./App.scss";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import PublicRoute from "./components/routing/PublicRoute";
import Chats from "./pages/Chats";
import NewChat from "./components/chat/NewChat";

function App() {
  const { authStatus } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // check if user is authenticated on page reload
  useEffect(() => {
    // get token expiration timestamp from localStorage
    const expirationTimestamp = localStorage.getItem("tokenExpires");
    if (expirationTimestamp) {
      const currentTime = Date.now();

      // compare current time to expiration timestamp
      if (currentTime < expirationTimestamp) {
        dispatch(setAuthStatus("auth"));
      } else {
        localStorage.removeItem("tokenExpires");
        dispatch(setAuthStatus("unauth"));
      }
    } else {
      dispatch(setAuthStatus("unauth"));
    }
  }, [dispatch]);

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
          <Route path="/chats/new" element={<NewChat />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
