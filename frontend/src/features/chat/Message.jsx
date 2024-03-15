import styles from "./Message.module.scss";
import { useSelector } from "react-redux";
import { localTime } from "../../utils/convertTime";
import useIsMobile from "../../hooks/useIsMobile";

function Message({ timestamp, username, message, picture, from, previousMessage }) {
  const currentUserUsername = useSelector((state) => state.users.username);
  const formattedTimestamp = localTime(timestamp);

  // const isFirstInGroup = !previousMessage || previousMessage.from !== username;

  const receivedMessage = (
    <div className={styles.messageFromContainer}>
      <div className={styles.messageFrom__mainContainer}>
        <div className={styles.messageFrom__heading}>
          <span className={styles.messageFrom__timestamp}>{formattedTimestamp}</span>
          <h5 className={styles.messageFrom__name}>{username}</h5>
        </div>
        <div className={styles.messageFrom__content}>
          <p className={styles.messageFrom__text}>{message}</p>
        </div>
      </div>
      <div className={styles.messageFrom__imageContainer}>
        <img className={styles.messageFrom__img} src={picture} alt="" />
      </div>
    </div>
  );

  const sentMessage = (
    <div className={styles.messageContainer}>
      <div className={styles.message__imageContainer}>
        <img className={styles.message__img} src={picture} alt="" />
      </div>
      <div className={styles.message__mainContainer}>
        <div className={styles.message__heading}>
          <h5 className={styles.message__name}>{username}</h5>
          <span className={styles.message__timestamp}>{formattedTimestamp}</span>
        </div>
        <div className={styles.message__content}>
          <p className={styles.message__text}>{message}</p>
        </div>
      </div>
    </div>
  );

  return from === currentUserUsername ? receivedMessage : sentMessage;
}

export default Message;
