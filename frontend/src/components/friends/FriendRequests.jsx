import styles from "./FriendRequests.module.scss";
import { RxCross2 } from "react-icons/rx";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { addFriend, reset } from "../../features/friends/friendsSlice";

import defaultUserPic from "../../assets/default_user_1.png";

function FriendRequests() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status: friendStatus, error: friendError } = useSelector((state) => state.friends);

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <Link to={"/chats"} className={styles.link}>
          <button className={`${styles.buttonBack} ${styles.button}`}>
            <MdKeyboardArrowLeft className={`${styles.buttonIcon} ${styles.buttonIcon__back}`} />
          </button>
        </Link>
        <div className={styles.leftSideContainer}>
          <div className={styles.headingContainer}>
            <h2 className={styles.heading}>Friend requests</h2>
          </div>
        </div>
      </header>

      <div className={styles.requestListContainer}>
        <ul className={styles.requestList}>
          <li key={""} className={styles.requestList__item} onClick={() => handleUserCheckboxChange(user)}>
            <div className={styles.requestList__leftContainer}>
              <div className={styles.requestList__imageContainer}>
                <img className={styles.requestList__img} src={defaultUserPic} alt={"" /* TODO make this dynamic*/} />
              </div>
            </div>
            <div className={styles.requestList__rightContainer}>
              <span className={styles.requestList__username}>{"asdasdas"}</span>
              <div className={styles.requestActions}>
                <button
                  className={`${styles.requestActions__button} ${styles.requestActions__buttonAccept}`}
                  disabled={false /* TODO */}
                >
                  Accept
                </button>
                <button
                  className={`${styles.requestActions__button} ${styles.requestActions__buttonDecline}`}
                  disabled={false /* TODO */}
                >
                  Decline
                </button>
              </div>
            </div>
          </li>
          <li key={""} className={styles.requestList__item} onClick={() => handleUserCheckboxChange(user)}>
            <div className={styles.requestList__leftContainer}>
              <div className={styles.requestList__imageContainer}>
                <img className={styles.requestList__img} src={defaultUserPic} alt={"" /* TODO make this dynamic*/} />
              </div>
            </div>
            <div className={styles.requestList__rightContainer}>
              <span className={styles.requestList__username}>{"asdasdas"}</span>
              <div className={styles.requestActions}>
                <button
                  className={`${styles.requestActions__button} ${styles.requestActions__buttonAccept}`}
                  disabled={false /* TODO */}
                >
                  Accept
                </button>
                <button
                  className={`${styles.requestActions__button} ${styles.requestActions__buttonDecline}`}
                  disabled={false /* TODO */}
                >
                  Decline
                </button>
              </div>
            </div>
          </li>
          <li key={""} className={styles.requestList__item} onClick={() => handleUserCheckboxChange(user)}>
            <div className={styles.requestList__leftContainer}>
              <div className={styles.requestList__imageContainer}>
                <img className={styles.requestList__img} src={defaultUserPic} alt={"" /* TODO make this dynamic*/} />
              </div>
            </div>
            <div className={styles.requestList__rightContainer}>
              <span className={styles.requestList__username}>{"asdasdas"}</span>
              <div className={styles.requestActions}>
                <button
                  className={`${styles.requestActions__button} ${styles.requestActions__buttonAccept}`}
                  disabled={false /* TODO */}
                >
                  Accept
                </button>
                <button
                  className={`${styles.requestActions__button} ${styles.requestActions__buttonDecline}`}
                  disabled={false /* TODO */}
                >
                  Decline
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FriendRequests;
