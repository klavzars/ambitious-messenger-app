import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Contacts from "../components/chat/Contacts";
import Chat from "../components/chat/Chat";
import styles from "./Chats.module.scss";
import NewChat from "../components/chat/NewChat";
import { useDispatch } from "react-redux";
import { WEBSOCKET_CONNECT, WEBSOCKET_DISCONNECT } from "../features/users/websocket/ActionTypes";

const mobileBreakpoint = 992;

const Chats = () => {
  const { chatId } = useParams();

  // this is a bit shady for now, I am still thinking about a better way to do this
  const isChatOpened = (chatId ? true : false) && chatId !== "new";
  const isOnNewChat = chatId === "new";

  const dispatch = useDispatch();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileBreakpoint);

  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth <= mobileBreakpoint);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  // websocket connection - this would ideally be in the container for the rest of the app when SSR is added
  useEffect(() => {
    dispatch({ type: WEBSOCKET_CONNECT });
    return () => {
      dispatch({ type: WEBSOCKET_DISCONNECT });
    };
  }, []);

  const contactsViewMobile = (
    <div className={styles.container}>
      <Contacts />
    </div>
  );

  const chatViewMobile = (
    <div className={styles.container}>
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
            <Chat />
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
