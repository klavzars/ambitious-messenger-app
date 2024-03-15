import styles from "./Contacts.module.scss";
import { FaRegPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllChats } from "../../../store/chatSlice";
import { useNavigate, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";

import Dropdown from "../../ui/Dropdown";

// temporary
import defaultUserPic from "../../../assets/default_user_1.png";
import { useEffect } from "react";

function Contacts() {
  const { status: chatStatus, error: chatError, allUserChats } = useSelector((state) => state.chats);
  const { username } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  const handleOpenChat = (chatId) => {
    navigate(`/chats/${chatId}`);
  };

  const { chatId } = useParams();

  // TODO - is this a bad practice?
  const isChatOpen = (mappedChatId) => {
    if (!chatId) {
      return false;
    }
    return mappedChatId == chatId;
  };

  const contacts = allUserChats.map((chat) => (
    <div
      className={`${styles.contact} ${isChatOpen(chat.chat_id) && styles.contactActive}`}
      key={chat.chat_id}
      onClick={() => handleOpenChat(chat.chat_id)}
    >
      <div className={styles.contact__imageContainer}>
        <img className={styles.contact__img} src={defaultUserPic} alt={"" /* TODO make this dynamic*/} />
      </div>
      <div className={styles.contact__mainContainer}>
        <div className={styles.contact__left}>
          <h4 className={styles.contact__name}>
            {chat.members.filter((memberUsername) => memberUsername !== username).join(", ")}
          </h4>
          <p className={styles.contact__message}>
            {chat.last_message ? chat.last_message.message_text : "No messages yet."}
          </p>
        </div>
        <div className={styles.contact__right}>
          <span className={styles.contact__time}>5m</span>
        </div>
      </div>
    </div>
  ));

  return (
    <div className={styles.pageContainer}>
      <div className={styles.topContainer}>
        <header className={styles.header}>
          <div className={styles.leftSideContainer}>
            <div className={styles.headingContainer}>
              <h2 className={styles.heading}>Messages</h2>
            </div>
          </div>
          <div className={styles.buttonsContainer}>
            <Link to={"/chats/new"}>
              <button className={`${styles.buttonNewChat} ${styles.button}`}>
                <FaRegPenToSquare className={`${styles.buttonIcon} ${styles.buttonIcon__newChat}`} />
              </button>
            </Link>
            <Dropdown />
          </div>
        </header>
        <div className={styles.searchBar}>
          <span className={styles.searchBar__searchIcon}>
            <IoSearch className={styles.searchBar__searchIconImg} />
          </span>

          <input
            type="text"
            // value={friendUsername}
            // onChange={friendUsernameChangedHandler}
            // onBlur={friendUsernameBlurHandler}
            placeholder="Search"
            className={styles.searchBar__input}
          />
          <button className={styles.searchBar__clear} onClick={() => {}}>
            <RxCross2 className={styles.searchBar__clearButton} />
          </button>
        </div>
      </div>
      <div className={styles.contactsContainer}>{contacts}</div>
    </div>
  );
}

export default Contacts;
