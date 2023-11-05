import styles from "./Message.module.scss";

function Message(props) {
  const receivedMessage = (
    <div className={styles.messageFromContainer}>
      <div className={styles.messageFrom__mainContainer}>
        <div className={styles.messageFrom__heading}>
          <span className={styles.messageFrom__timestamp}>{props.timestamp}</span>
          <h5 className={styles.messageFrom__name}>{props.username}</h5>
        </div>
        <div className={styles.messageFrom__content}>
          <p className={styles.messageFrom__text}>{props.message}</p>
        </div>
      </div>
      <div className={styles.messageFrom__imageContainer}>
        <img className={styles.messageFrom__img} src={props.picture} alt="" />
      </div>
    </div>
  );

  const sentMessage = (
    <div className={styles.messageContainer}>
      <div className={styles.message__imageContainer}>
        <img className={styles.message__img} src={props.picture} alt="" />
      </div>
      <div className={styles.message__mainContainer}>
        <div className={styles.message__heading}>
          <h5 className={styles.message__name}>{props.username}</h5>
          <span className={styles.message__timestamp}>{props.timestamp}</span>
        </div>
        <div className={styles.message__content}>
          <p className={styles.message__text}>{props.message}</p>
        </div>
      </div>
    </div>
  );

  return props.type === "received" ? receivedMessage : sentMessage;
}

export default Message;
