import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { setIsUserAuthenticated } from "./features/users/userSlice";
import "./App.scss";

function App() {
  // check if user is authenticated on page reload
  const dispatch = useDispatch();
  useEffect(() => {
    // Check local storage for the token
    const expirationTimestamp = localStorage.getItem("tokenExpires");

    if (expirationTimestamp) {
      const currentTime = Date.now();

      if (currentTime < expirationTimestamp) {
        dispatch(setIsUserAuthenticated(true));
      } else {
        localStorage.removeItem("expires");
      }
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
