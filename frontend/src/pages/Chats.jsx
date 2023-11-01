import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Contacts from "./Contacts";
import Chat from "./Chat";
import styles from "./Chats.module.scss";

const Chats = () => {
  const { chatId } = useParams();
  const isChatOpened = chatId ? true : false;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth <= 768);
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
        {isChatOpened ? <Chat /> : <div className={styles.chatPlaceholder}>Select a chat</div>}
      </div>
    </div>
  );

  return isMobile ? (isChatOpened ? chatViewMobile : contactsViewMobile) : viewDesktop;
};

export default Chats;
