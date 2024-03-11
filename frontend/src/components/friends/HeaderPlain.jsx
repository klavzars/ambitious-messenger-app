import styles from "./HeaderPlain.module.scss";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";

function HeaderPlain(props) {
  return (
    <header className={styles.header}>
      <Link to={"/chats"} className={styles.link}>
        <button className={`${styles.buttonBack} ${styles.button}`}>
          <MdKeyboardArrowLeft className={`${styles.buttonIcon} ${styles.buttonIcon__back}`} />
        </button>
      </Link>
      <div className={styles.leftSideContainer}>
        <div className={styles.headingContainer}>
          <h2 className={styles.heading}>{props.title}</h2>
        </div>
      </div>
    </header>
  );
}

export default HeaderPlain;
