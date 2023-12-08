import styles from "./FriendRequests.module.scss";
import { RxCross2 } from "react-icons/rx";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { addFriend, reset } from "../../features/friends/friendsSlice";
import { getAllFriendRequests, acceptFriendRequest, declineFriendRequest } from "../../features/friends/friendsSlice";

import defaultUserPic from "../../assets/default_user_1.png";

function FriendRequests() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status: friendStatus, error: friendError, friendRequests } = useSelector((state) => state.friends);

  useEffect(() => {
    dispatch(getAllFriendRequests());
  }, [dispatch]);

  const handleAcceptRequest = (request) => {
    dispatch(acceptFriendRequest({ id: request.id, senderId: request.sender_id }));
  };

  const handleDeclineRequest = (request) => {
    dispatch(declineFriendRequest(request.id));
  };

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
          {friendRequests.map((request) => (
            <li key={request.id} className={styles.requestList__item}>
              <div className={styles.requestList__leftContainer}>
                <div className={styles.requestList__imageContainer}>
                  <img className={styles.requestList__img} src={defaultUserPic} alt={"" /* TODO make this dynamic*/} />
                </div>
              </div>
              <div className={styles.requestList__rightContainer}>
                <span className={styles.requestList__username}>{request.sender.username}</span>
                <div className={styles.requestActions}>
                  {!request.currentStatus && (
                    <button
                      className={`${styles.requestActions__button} ${styles.requestActions__buttonAccept}`}
                      disabled={false /* TODO */}
                      onClick={() => handleAcceptRequest(request)}
                    >
                      Accept
                    </button>
                  )}
                  {!request.currentStatus && (
                    <button
                      className={`${styles.requestActions__button} ${styles.requestActions__buttonDecline}`}
                      disabled={false /* TODO */}
                      onClick={() => handleDeclineRequest(request)}
                    >
                      Decline
                    </button>
                  )}
                  {request.currentStatus === "accepted" && (
                    <p className={`${styles.alert} ${styles.alertValid}`}>Friend request accepted.</p>
                  )}
                  {request.currentStatus === "declined" && (
                    <p className={`${styles.alert} ${styles.alertInvalid}`}>Friend request declined.</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FriendRequests;
