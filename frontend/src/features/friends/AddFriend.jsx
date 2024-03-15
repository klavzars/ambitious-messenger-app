import styles from "./AddFriend.module.scss";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { addFriend, reset } from "../../store/friendsSlice";
import HeaderPlain from "../ui/HeaderPlain";
import ButtonCTA from "../ui/ButtonCTA";

function AddFriend() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status: friendStatus, error: friendError } = useSelector((state) => state.friends);

  useEffect(() => {
    if (friendStatus === "failed") {
      // TODO show error
      console.log("Error", friendError);

      return () => {
        dispatch(reset());
      };
    }
    // TODO this will need some additional checks
    if (friendStatus === "succeeded") {
      // navigate("/chats");

      return () => {
        dispatch(reset());
      };
    }
  }, [friendStatus, navigate, friendError]);

  // validation
  const [friendUsername, setFriendUsername] = useState("");
  const [friendUsernameTouched, setFriendUsernameTouched] = useState(false);
  const friendUsernameValid = friendUsername !== "";
  const friendUsernameInvalid = friendUsernameTouched && !friendUsernameValid;

  const friendUsernameChangedHandler = (e) => {
    setFriendUsername(e.target.value);
  };

  const friendUsernameBlurHandler = () => {
    setFriendUsernameTouched(true);
  };

  const handleClearInput = () => {
    setFriendUsername("");
  };

  const addFriendHandler = (e) => {
    e.preventDefault();

    setFriendUsernameTouched(true);

    if (!friendUsernameValid) {
      return;
    }

    console.log(friendUsername);

    dispatch(addFriend(friendUsername));
  };

  return (
    <div className={styles.pageContainer}>
      <HeaderPlain title="Add Friend" />
      <div className={styles.addFriendContainer}>
        <div className={styles.friendInputContainer}>
          <p className={styles.label}>You can add friends by entering their username.</p>
          <div className={styles.friendInput}>
            <input
              type="text"
              value={friendUsername}
              onChange={friendUsernameChangedHandler}
              onBlur={friendUsernameBlurHandler}
              placeholder="Enter username"
              className={styles.friendInput__input}
            />
            <button className={styles.friendInput__clear} onClick={handleClearInput}>
              <RxCross2 className={styles.friendInput__clearButton} />
            </button>
          </div>
        </div>
        {friendStatus === "succeeded" && (
          <p className={`${styles.alert} ${styles.alertValid}`}>Friend request successfully sent.</p>
        )}
        {friendStatus === "failed" && (
          <p className={`${styles.alert} ${styles.alertInvalid}`}>User with the specified username doesn't exist.</p>
        )}
        <div className={styles.addFriend}>
          <ButtonCTA className={styles.addFriend__button} label="Add Friend" onClick={addFriendHandler} />
        </div>
      </div>
    </div>
  );
}

export default AddFriend;
