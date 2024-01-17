import styles from "./Dropdown.module.scss";
import { useState, useEffect } from "react";
import { MdMoreVert } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

function Dropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.auth.status);
  const userError = useSelector((state) => state.auth.error);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (userStatus === "failed") {
      // TODO show error
      console.log(userError);
    }
    if (userStatus === "succeeded") {
      navigate("/login");

      return () => {
        dispatch(reset());
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStatus, navigate, userError]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSettings = () => {
    // TODO
  };

  return (
    <>
      <button className={`${styles.buttonOptions} ${styles.button}`}>
        <MdMoreVert className={`${styles.buttonIcon} ${styles.buttonIcon__options}`} onClick={toggleDropdown} />
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          <Link to="/chats/add-friend">
            <button className={`${styles.dropdown__button} ${styles.dropdown__addFriend}`} onClick={handleSettings}>
              Add Friend
            </button>
          </Link>
          <Link to="/chats/friend-requests">
            <button className={`${styles.dropdown__button} ${styles.dropdown__addFriend}`} onClick={handleSettings}>
              Friend Requests
            </button>
          </Link>
          <button className={`${styles.dropdown__button} ${styles.dropdown__logout}`} onClick={handleLogout}>
            Logout
          </button>
          {/* <button className={`${styles.dropdown__button} ${styles.dropdown__settings}`} onClick={handleSettings}>
            Settings
          </button> */}
        </div>
      )}
    </>
  );
}

export default Dropdown;
