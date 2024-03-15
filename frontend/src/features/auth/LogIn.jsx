import styles from "./LogIn.module.scss";
import logo from "../../assets/ambitious_logo_blue.svg";
import { useState } from "react";
import TextInputGroup from "../ui/TextInputGroup";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

// TODO - maybe implement better email validation
// NOTE to self - include source of regex

// simple email validation
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status: userStatus, error: userError } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userStatus === "failed") {
      // TODO show error
      console.log(userError);
    }
    // TODO this will need some additional checks
    if (userStatus === "succeeded") {
      navigate("/chats");

      return () => {
        dispatch(reset());
      };
    }
  }, [userStatus, navigate, userError]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // stores if user has 'touched' the input field,
  // needed for proper validation
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const enteredEmailValid = emailRegex.test(email.trim());
  // not checking validity of password here so we don't give away too much info
  const enteredPasswordValid = password !== "";

  const emailInputInvalid = emailTouched && !enteredEmailValid;
  const passwordInputInvalid = passwordTouched && !enteredPasswordValid;

  const emailChangedHandler = (e) => {
    setEmail(e.target.value);
  };

  const emailBlurHandler = () => {
    setEmailTouched(true);
  };

  const passwordChangedHandler = (e) => {
    setPassword(e.target.value);
  };

  const passwordBlurHandler = () => {
    setPasswordTouched(true);
  };

  const submitFormHanlder = (e) => {
    e.preventDefault();

    setEmailTouched(true);
    setPasswordTouched(true);

    // don't proceed if form is invalid
    if (!enteredEmailValid || !enteredPasswordValid) {
      return;
    }

    const userLoginData = {
      email,
      password,
    };

    dispatch(login(userLoginData));

    // reset inputs and touch states
    // setEmail("");
    // setPassword("");
    // setEmailTouched(false);
    // setPasswordTouched(false);
  };

  return (
    <div className={styles.outsideContainer}>
      <div className={styles.card}>
        <div className={`${styles.mainRow}`}>
          <div className={`${styles.imageContainer} ${styles.col}`}>
            <img src={logo} alt="Ambitious Messenger logo" className={styles.logoImage} />
          </div>
          <div className={`${styles.login} ${styles.col}`}>
            <form className={styles.login__form} onSubmit={submitFormHanlder}>
              <h2 className={styles.login__title}>Sign in</h2>
              <TextInputGroup
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={emailChangedHandler}
                onBlur={emailBlurHandler}
                inputInvalid={emailInputInvalid}
                errorMsg={"Please provide a valid email."}
              />
              <TextInputGroup
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={passwordChangedHandler}
                onBlur={passwordBlurHandler}
                inputInvalid={passwordInputInvalid}
                errorMsg={"Please provide a password."}
                className={styles.login__FormGroupLast}
                isLast={true}
              />
              <Link to={"/chats"} className={`${styles.login__resetPasswordLink} ${styles.login__link}`}>
                Forgot your password?
              </Link>
              <button className={styles.login__button} disabled={userStatus === "loading"} type="submit">
                Sign in
              </button>
              {userStatus === "failed" && (
                <div className={styles.login__error}>
                  {
                    /*userStatus.error ? userStatus.error :  <-- TODO implement proper error messaging from the backend*/ "Login unsuccessful."
                  }
                </div>
              )}
              <Link to={"/signup"} className={`${styles.login__createAccountLink} ${styles.login__link}`}>
                Don't have an account yet? Sign up!
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
