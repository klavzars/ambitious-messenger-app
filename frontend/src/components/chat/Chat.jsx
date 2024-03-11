import { useRef, useEffect } from "react";
import styles from "./Chat.module.scss";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import Message from "./Message";

// temporary
import defaultUserPic from "../../assets/sample_profile_pic.png";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

// const DUMMY_MESSAGES = [
//   {
//     id: 1,
//     type: "sent",
//     picture: sampleProfilePic,
//     username: "John Doe",
//     timestamp: "20:23",
//     message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
//   },
//   {
//     id: 2,
//     type: "received",
//     picture: sampleProfilePic,
//     username: "John Doe",
//     timestamp: "20:23",
//     message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
//   },
//   {
//     id: 3,
//     type: "sent",
//     picture: sampleProfilePic,
//     username: "John Doe",
//     timestamp: "20:23",
//     message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
//   },
//   {
//     id: 4,
//     type: "received",
//     picture: sampleProfilePic,
//     username: "John Doe",
//     timestamp: "20:23",
//     message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
//   },
//   {
//     id: 5,
//     type: "sent",
//     picture: sampleProfilePic,
//     username: "John Doe",
//     timestamp: "20:23",
//     message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
//   },
//   {
//     id: 6,
//     type: "received",
//     picture: sampleProfilePic,
//     username: "John Doe",
//     timestamp: "20:23",
//     message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
//   },
//   {
//     id: 7,
//     type: "sent",
//     picture: sampleProfilePic,
//     username: "John Doe",
//     timestamp: "20:23",
//     message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
//   },
//   {
//     id: 8,
//     type: "received",
//     picture: sampleProfilePic,
//     username: "John Doe",
//     timestamp: "20:23",
//     message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
//   },
// ];

const selectAllUserChats = (state) => state.chats.allUserChats;
const selectCurrentChat = (state) => state.chats.currentChat;
const selectMessagesByChatId = (state) => state.messages.byChatId;

const selectCurrentChatInfo = createSelector([selectAllUserChats, selectCurrentChat], (allUserChats, currentChat) =>
  allUserChats.find((chat) => chat.chat_id === currentChat)
);

const selectCurrentChatMessages = createSelector(
  [selectMessagesByChatId, selectCurrentChat],
  (messagesByChatId, currentChat) => messagesByChatId[currentChat] || []
);

function Chat() {
  const scrollableContainerRef = useRef(null);
  const dispatch = useDispatch();

  const currentChat = useSelector((state) => state.chats.currentChat);
  const currentChatInfo = useSelector(selectCurrentChatInfo);
  const messages = useSelector(selectCurrentChatMessages);

  useEffect(() => {
    const scrollableContainer = scrollableContainerRef.current;

    if (scrollableContainer) {
      scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.pageContainer}>
      <ChatHeader profilePic={defaultUserPic} name={currentChatInfo?.chat_name} status={true} />
      <div className={styles.scrollContainer} ref={scrollableContainerRef}>
        <div className={styles.conversationContainer}>
          {messages.map((message, index) => {
            const previousMessage = index > 0 ? messages[index - 1] : null;
            return (
              <Message
                key={message.id}
                type={message.type}
                picture={defaultUserPic}
                username={message.from}
                timestamp={message.sent}
                message={message.message_text}
                from={message.from}
                isEdited={message.isEdited}
                previousMessage={previousMessage}
              />
            );
          })}
        </div>
      </div>
      <MessageInput />
    </div>
  );
}

export default Chat;
