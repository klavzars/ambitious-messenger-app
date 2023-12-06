import styles from "./Dropdown.module.scss";
import { useState, useEffect } from "react";
import { MdMoreVert } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

function Dropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status: userStatus, error: userError } = useSelector((state) => state.auth);
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
          <Link to="/add-friend">
            <button className={`${styles.dropdown__button} ${styles.dropdown__addFriend}`} onClick={handleSettings}>
              Add Friend
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
