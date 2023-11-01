import styles from "./Chat.module.scss";
import MessageInput from "../components/chat/MessageInput";
import SentMessage from "../components/chat/SentMessage";
import ReceivedMessage from "../components/chat/ReceivedMessage";
import ChatHeader from "../components/chat/ChatHeader";

// temporary
import sampleProfilePic from "../assets/sample_profile_pic.png";

function Chat() {
  return (
    <div className={styles.pageContainer}>
      <ChatHeader profilePic={sampleProfilePic} name="John Doe" online={true} />

      <div className={styles.conversationContainer}>
        <SentMessage
          picture={sampleProfilePic}
          username="John Doe"
          timestamp="20:23"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
        />
        <ReceivedMessage
          picture={sampleProfilePic}
          username="John Doe"
          timestamp="20:23"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
        />
      </div>
      <MessageInput />
    </div>
  );
}

export default Chat;
