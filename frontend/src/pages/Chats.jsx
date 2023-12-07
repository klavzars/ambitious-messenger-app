import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Contacts from "../components/chat/Contacts";
import Chat from "../components/chat/Chat";
import styles from "./Chats.module.scss";
import NewChat from "../components/chat/NewChat";
import { useDispatch, useSelector } from "react-redux";

import { socketActions } from "../features/websocket/socketSlice";
import Call from "../components/call/Call";
import { inactive } from "../features/chats/chatSlice";
import useIsMobile from "../hooks/useIsMobile";
const { connecting, disconnected, connected } = socketActions;

const mobileBreakpoint = 992;

const Chats = () => {
  const { chatId } = useParams();

  // this is a bit shady for now, I am still thinking about a better way to do this
  const isChatOpened = (chatId ? true : false) && chatId !== "new";
  const isOnNewChat = chatId === "new";

  const dispatch = useDispatch();
  const { callPanelStatus } = useSelector((state) => state.chats);

  const isMobile = useIsMobile();

  // websocket connection - this would ideally be in the container for the rest of the app when SSR is added
  useEffect(() => {
    dispatch(connecting());
    return () => {
      dispatch(disconnected());
    };
  }, []);

  const isCallPanelActive = () => {
    if (callPanelStatus == "active") {
      console.log("something ran here");
      return <Call />;
    }

    return <></>;
  };

  const contactsViewMobile = (
    <div className={styles.container}>
      <Contacts />
    </div>
  );

  const chatViewMobile = (
    <div className={styles.container}>
      {isCallPanelActive()}
      <Chat />
    </div>
  );

  const newChatViewMobile = (
    <div className={styles.container}>
      <NewChat />
    </div>
  );

  const viewDesktop = (
    <div className={styles.container}>
      <div className={styles.side}>
        <Contacts />
      </div>
      <div className={styles.main}>
        {!isOnNewChat &&
          (isChatOpened ? (
            <>
              {isCallPanelActive()}
              <Chat />
            </>
          ) : (
            <div className={styles.chatPlaceholder}>
              <p>Please select a chat.</p>
            </div>
          ))}
        {isOnNewChat && <NewChat />}
      </div>
    </div>
  );

  return isMobile
    ? isOnNewChat
      ? newChatViewMobile
      : isChatOpened
      ? chatViewMobile
      : contactsViewMobile
    : viewDesktop;
};

export default Chats;
