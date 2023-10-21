import { useState } from "react";
import "./App.scss";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import ChatsPage from "./pages/ChatsPage";
import ConversationPage from "./pages/ConversationPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/chats" element={<ChatsPage />} />
        <Route path="/chats/test" element={<ConversationPage />} />
      </Routes>
    </>
  );
}

export default App;
