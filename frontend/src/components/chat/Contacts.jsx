import styles from "./Contacts.module.scss";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdMoreVert } from "react-icons/md";

// temporary
import defaultUserPic from "../../assets/default_user_1.png";

const DUMMY_DATA = [
  {
    id: 1,
    username: "David Lee",
    lastText: "I'll be there in 5 minutes. I'll be there in 5 minutes. I'll be there in 5 minutes.",
    timestamp: "1m",
  },
  {
    id: 2,
    username: "John Doe",
    lastText: "Whassup man",
    timestamp: "2m",
  },
  {
    id: 3,
    username: "Jane Smith",
    lastText: "Hey there!",
    timestamp: "10m",
  },
  {
    id: 4,
    username: "Michael Johnson",
    lastText: "How's it going?",
    timestamp: "2h",
  },
  {
    id: 5,
    username: "Emily Wilson",
    lastText: "What's for lunch?",
    timestamp: "3h",
  },
  {
    id: 6,
    username: "David Lee",
    lastText: "I'll be there in 5 minutes",
    timestamp: "1d",
  },
  {
    id: 7,
    username: "John Doe",
    lastText: "Whassup man",
    timestamp: "2d",
  },
  {
    id: 8,
    username: "Jane Smith",
    lastText: "Hey there!",
    timestamp: "5d",
  },
];

function Contacts() {
  const contacts = DUMMY_DATA.map((contact) => (
    <div className={styles.contact} key={contact.id}>
      <div className={styles.contact__imageContainer}>
        <img className={styles.contact__img} src={defaultUserPic} alt={"" /* TODO make this dynamic*/} />
      </div>
      <div className={styles.contact__mainContainer}>
        <div className={styles.contact__left}>
          <h4 className={styles.contact__name}>{contact.username}</h4>
          <p className={styles.contact__message}>{contact.lastText}</p>
        </div>
        <div className={styles.contact__right}>
          <span className={styles.contact__time}>{contact.timestamp}</span>
        </div>
      </div>
    </div>
  ));

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.leftSideContainer}>
          <div className={styles.headingContainer}>
            <h2 className={styles.heading}>Chats</h2>
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <button className={`${styles.buttonNewChat} ${styles.button}`}>
            <FaRegPenToSquare className={`${styles.buttonIcon} ${styles.buttonIcon__newChat}`} />
          </button>
          <button className={`${styles.buttonOptions} ${styles.button}`}>
            <MdMoreVert className={`${styles.buttonIcon} ${styles.buttonIcon__options}`} />
          </button>
        </div>
      </header>
      <div className={styles.contactsContainer}>{contacts}</div>
    </div>
  );
}

export default Contacts;
