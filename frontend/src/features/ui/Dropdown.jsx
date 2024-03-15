import styles from "./Dropdown.module.scss";
import { useState, useEffect, useRef } from "react";
import { MdMoreVert } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside";

function Dropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.auth.status);
  const userError = useSelector((state) => state.auth.error);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownNode = useClickOutside(() => {
    setIsOpen(false);
  });

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

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleDropdownAction = (handler) => {
    closeDropdown();
    handler();
  };

  const handleLogout = () => {
    handleDropdownAction(() => dispatch(logout()));
  };

  const handleAddFriend = () => {
    handleDropdownAction(() => navigate("/chats/add-friend"));
  };

  const handleFriendRequests = () => {
    handleDropdownAction(() => navigate("/chats/friend-requests"));
  };

  return (
    <nav ref={dropdownNode}>
      <button
        className={
          isOpen
            ? `${styles.buttonOptions} ${styles.button} ${styles.buttonPressed}`
            : `${styles.buttonOptions} ${styles.button}`
        }
      >
        <MdMoreVert className={`${styles.buttonIcon} ${styles.buttonIcon__options}`} onClick={toggleDropdown} />
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          <button className={`${styles.dropdown__button} ${styles.dropdown__addFriend}`} onClick={handleAddFriend}>
            Add Friend
          </button>
          <button className={`${styles.dropdown__button} ${styles.dropdown__addFriend}`} onClick={handleFriendRequests}>
            Friend Requests
          </button>
          <button className={`${styles.dropdown__button} ${styles.dropdown__logout}`} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Dropdown;
