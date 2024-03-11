import TextareaAutosize from "react-textarea-autosize";
import styles from "./MessageInput.module.scss";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { messageActions } from "../../features/messages/messageSlice";
import { socketActions } from "../../features/websocket/socketSlice";

function MessageInput() {
  const [message, setMessage] = useState("");
  const currentChat = useSelector((state) => state.chats.currentChat);
  const currentChatInfo = useSelector((state) => state.chats.allUserChats.find((chat) => chat.chat_id === currentChat));
  const user = useSelector((state) => state.users.username);

  // console.log("currentChatInfo", currentChatInfo);

  const dispatch = useDispatch();
  const sendMessage = () => {
    const newMessage = {
      from: user,
      message_text: message,
      chat_id: currentChat,
      to: currentChatInfo?.members.filter((member) => member !== user),
    };

    dispatch(socketActions.messageSend(newMessage));
  };

  const onChange = ({ target }) => {
    setMessage(target.value);
  };

  return (
    <div className={styles.messageInput}>
      <TextareaAutosize
        onChange={onChange}
        maxRows={3}
        value={message}
        className={styles.messageInput__textInput}
        placeholder="Type a message"
      />
      <button onClick={sendMessage} disabled={!message.trim()} className={styles.messageInput__buttonSend}>
        <IoSend className={styles.messageInput__sendIcon} />
      </button>
    </div>
  );
}

export default MessageInput;
