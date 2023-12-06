import { useRef, useEffect } from "react";
import styles from "./Chat.module.scss";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import Message from "./Message";

// temporary
import defaultUserPic from "../../assets/default_user_1.png";
import { useSelector } from "react-redux";
import { minimised } from "../../features/chats/chatSlice";
import Call from "../call/Call";

const DUMMY_MESSAGES = [
  {
    id: 1,
    type: "sent",
    picture: defaultUserPic,
    username: "John Doe",
    timestamp: "20:23",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    id: 2,
    type: "received",
    picture: defaultUserPic,
    username: "John Doe",
    timestamp: "20:23",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    id: 3,
    type: "sent",
    picture: defaultUserPic,
    username: "John Doe",
    timestamp: "20:23",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    id: 4,
    type: "received",
    picture: defaultUserPic,
    username: "John Doe",
    timestamp: "20:23",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    id: 5,
    type: "sent",
    picture: defaultUserPic,
    username: "John Doe",
    timestamp: "20:23",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    id: 6,
    type: "received",
    picture: defaultUserPic,
    username: "John Doe",
    timestamp: "20:23",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    id: 7,
    type: "sent",
    picture: defaultUserPic,
    username: "John Doe",
    timestamp: "20:23",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    id: 8,
    type: "received",
    picture: defaultUserPic,
    username: "John Doe",
    timestamp: "20:23",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
];

function Chat() {
  const scrollableContainerRef = useRef(null);

  const { callPanelStatus } = useSelector((state) => state.chats);

  useEffect(() => {
    const scrollableContainer = scrollableContainerRef.current;

    if (scrollableContainer) {
      scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
    }
  }, []);

  return (
    <div className={styles.pageContainer}>
      <ChatHeader profilePic={defaultUserPic} name="John Doe" status={true} />
      {callPanelStatus === "minimised" && <Call />}
      <div className={styles.scrollContainer} ref={scrollableContainerRef}>
        <div className={styles.conversationContainer}>
          {DUMMY_MESSAGES.map((message) => (
            <Message
              key={message.id}
              type={message.type}
              picture={message.picture}
              username={message.username}
              timestamp={message.timestamp}
              message={message.message}
            />
          ))}
        </div>
      </div>
      <MessageInput />
    </div>
  );
}

export default Chat;
