import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Contacts from "../components/chat/Contacts";
import Chat from "../components/chat/Chat";
import styles from "./Chats.module.scss";

const mobileBreakpoint = 992;

const Chats = () => {
  const { chatId } = useParams();
  const isChatOpened = chatId ? true : false;

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

  const viewDesktop = (
    <div className={styles.container}>
      <div className={styles.side}>
        <Contacts />
      </div>
      <div className={styles.main}>
        {isChatOpened ? (
          <Chat />
        ) : (
          <div className={styles.chatPlaceholder}>
            <p>Please select a chat.</p>
          </div>
        )}
      </div>
    </div>
  );

  return isMobile ? (isChatOpened ? chatViewMobile : contactsViewMobile) : viewDesktop;
};

export default Chats;
