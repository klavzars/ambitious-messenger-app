import TextareaAutosize from "react-textarea-autosize";
import styles from "./MessageInput.module.scss";
import { IoSend } from "react-icons/io5";

function MessageInput() {
  return (
    <div className={styles.messageInput}>
      <TextareaAutosize maxRows={3} className={styles.messageInput__textInput} placeholder="Type a message" />
      <button className={styles.messageInput__buttonSend}>
        <IoSend className={styles.messageInput__sendIcon} />
      </button>
    </div>
  );
}

export default MessageInput;
