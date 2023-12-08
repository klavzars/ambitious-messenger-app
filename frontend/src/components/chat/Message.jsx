import { useSelector } from "react-redux";
import styles from "./Message.module.scss";
import { localTime } from "../../utils/convertTime";
import useIsMobile from "../../hooks/useIsMobile";

function Message({ timestamp, username, message, picture, from, previousMessage }) {
  const isMobile = useIsMobile();
  const user = useSelector((state) => state.auth.user);
  const formattedTimestamp = localTime(timestamp);

  const shouldGroup =
    previousMessage && previousMessage.from === username && timestamp - previousMessage.timestamp < 5 * 60 * 1000;
  const isFirstInGroup = !previousMessage || previousMessage.from !== username;

  const receivedMessage = (
    <div className={styles.messageFromContainer}>
      <div className={styles.messageFrom__mainContainer}>
        {isFirstInGroup && (
          <div className={styles.messageFrom__heading}>
            <span className={styles.messageFrom__timestamp}>{formattedTimestamp}</span>
            <h5 className={styles.messageFrom__name}>{username}</h5>
          </div>
        )}
        <div className={styles.messageFrom__content}>
          <p className={styles.messageFrom__text}>{message}</p>
        </div>
      </div>

      <div className={styles.messageFrom__imageContainer}>
        {isFirstInGroup && <img className={styles.messageFrom__img} src={picture} alt="" />}
      </div>
    </div>
  );

  const sentMessage = (
    <div className={styles.messageContainer}>
      <div className={styles.message__imageContainer}>
        {isFirstInGroup && <img className={styles.message__img} src={picture} alt="" />}
      </div>

      <div className={styles.message__mainContainer}>
        {isFirstInGroup && (
          <div className={styles.message__heading}>
            <h5 className={styles.message__name}>{username}</h5>
            <span className={styles.message__timestamp}>{formattedTimestamp}</span>
          </div>
        )}
        <div className={styles.message__content}>
          <p className={styles.message__text}>{message}</p>
        </div>
      </div>
    </div>
  );

  return from === user ? sentMessage : receivedMessage;
}

export default Message;
