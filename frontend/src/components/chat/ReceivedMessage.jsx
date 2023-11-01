import styles from "./ReceivedMessage.module.scss";

function ReceivedMessage(props) {
  return (
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
}

export default ReceivedMessage;
