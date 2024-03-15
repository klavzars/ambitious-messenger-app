import styles from "./FriendRequests.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAllFriendRequests, acceptFriendRequest, declineFriendRequest } from "../../store/friendsSlice";

import defaultUserPic from "../../assets/default_user_1.png";
import HeaderPlain from "../ui/HeaderPlain";

function FriendRequests() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status: friendStatus, error: friendError, friendRequests } = useSelector((state) => state.friends);
  console.log("friendRequests: ", friendRequests);

  useEffect(() => {
    dispatch(getAllFriendRequests());
  }, [dispatch]);

  const handleAcceptRequest = (request) => {
    dispatch(acceptFriendRequest({ id: request.id, senderId: request.sender_id }));
  };

  const handleDeclineRequest = (request) => {
    dispatch(declineFriendRequest(request.id));
  };

  // id, sender.username, currentStatus

  return (
    <div className={styles.pageContainer}>
      <HeaderPlain title={"Friend Requests"} />
      <div className={styles.requestListContainer}>
        <ul className={styles.requestList}>
          {friendRequests.map((request) => (
            <li key={request.id} className={styles.requestList__item}>
              <div className={styles.requestList__innerContainer}>
                <div className={styles.requestList__leftContainer}>
                  <div className={styles.requestList__imageContainer}>
                    <img
                      className={styles.requestList__img}
                      src={defaultUserPic}
                      alt={"" /* TODO make this dynamic*/}
                    />
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FriendRequests;

const SAMPLE_REQUESTS = [
  { id: 1, sender: { username: "john_doe" }, currentStatus: 0 },
  { id: 2, sender: { username: "jane_smith" }, currentStatus: 0 },
  { id: 3, sender: { username: "bob_jones" }, currentStatus: 0 },
  { id: 4, sender: { username: "alice_wang" }, currentStatus: 0 },
  { id: 5, sender: { username: "david_miller" }, currentStatus: 0 },
  { id: 6, sender: { username: "susan_anderson" }, currentStatus: 0 },
  { id: 7, sender: { username: "michael_chen" }, currentStatus: 0 },
  { id: 8, sender: { username: "emily_davis" }, currentStatus: 0 },
  { id: 9, sender: { username: "william_smith" }, currentStatus: 0 },
  { id: 10, sender: { username: "olivia_taylor" }, currentStatus: 0 },
];
