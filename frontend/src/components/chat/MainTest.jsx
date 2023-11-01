import styles from "./MainTest.module.scss";

function MainTest() {
  return (
    <div className={styles.container}>
      <div className={styles.contacts}>Contacts</div>
      <div className={styles.chat}>Chat</div>
    </div>
  );
}

export default MainTest;
