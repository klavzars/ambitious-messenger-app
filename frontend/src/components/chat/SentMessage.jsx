import styles from "./SentMessage.module.scss";

function SentMessage(props) {
  return (
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
}

export default SentMessage;
