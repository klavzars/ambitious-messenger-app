import styles from "./SignUp.module.scss";
import logo from "../assets/ambitious_logo_blue.svg";
import { useState } from "react";
import TextInputGroup from "../components/TextInputGroup";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

// TODO - maybe implement better email validation
// NOTE to self - include source of regex

// simple email validation
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// simple password validation - must be 8 characters and include one
// of each: lowercase letter, uppercase letter, number, special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

// allows letters and numbers as well as _-.@ special characters
const usernameRegex = /^[a-zA-Z0-9_\-\.@]+$/;

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status: userStatus, error: userError } = useSelector((state) => state.users);

  useEffect(() => {
    if (userStatus === "failed") {
      // TODO show error
      console.log(userError);
    }
    // TODO this will need some additional checks
    if (userStatus === "succeeded") {
      navigate("/");
      return () => {
        dispatch(reset());
        // NOTE: figure out if i need to clear component state here,
        // it should do it automatically but im not sure
      };
    }
    return () => {
      dispatch(reset());
    };
  }, [userStatus, navigate, userError]);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // I still have to figure out if I'm gonna use this,
  // so for now I just commented it out
  // const [repeatPassword, setRepeatPassword] = useState("");

  // stores if user has 'touched' the input field,
  // needed for proper validation
  const [emailTouched, setEmailTouched] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  // const [repeatPasswordTouched, setRepeatPasswordTouched] = useState(false);

  const enteredEmailValid = emailRegex.test(email.trim());
  const enteredPasswordValid = passwordRegex.test(password);
  const enteredUsernameValid = usernameRegex.test(username.trim());
  // const enteredRepeatPasswordValid =
  //   repeatPassword !== "" && repeatPassword === password;

  const emailInputInvalid = emailTouched && !enteredEmailValid;
  const passwordInputInvalid = passwordTouched && !enteredPasswordValid;
  const usernameInputInvalid = usernameTouched && !enteredUsernameValid;
  // const repeatPasswordInputInvalid =
  //   repeatPasswordTouched && !enteredRepeatPasswordValid;

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

  const usernameChangedHandler = (e) => {
    setUsername(e.target.value);
  };

  const usernameBlurHandler = () => {
    setUsernameTouched(true);
  };

  // const repeatPasswordChangedHandler = (e) => {
  //   setRepeatPassword(e.target.value);
  // };

  // const repeatPasswordBlurHandler = () => {
  //   setRepeatPasswordTouched(true);
  // };

  const submitFormHanlder = (e) => {
    e.preventDefault();

    setEmailTouched(true);
    setPasswordTouched(true);
    setUsernameTouched(true);
    // setRepeatPasswordTouched(true);

    // don't proceed if form is invalid
    if (
      !enteredEmailValid ||
      !enteredPasswordValid ||
      !enteredUsernameValid
      // || !enteredRepeatPasswordValid
    ) {
      return;
    }

    const userRegisterData = {
      username,
      email,
      password,
    };
    // TODO
    dispatch(register(userRegisterData));

    // // reset inputs and touch states
    // setEmail("");
    // setPassword("");
    // setUsername("");
    // // setRepeatPassword("");
    // setEmailTouched(false);
    // setPasswordTouched(false);
    // setUsernameTouched(false);
    // // setRepeatPasswordTouched(false);
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
              <h2 className={styles.login__title}>Sign Up</h2>
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
                type="text"
                value={username}
                placeholder="Enter your username"
                onChange={usernameChangedHandler}
                onBlur={usernameBlurHandler}
                inputInvalid={usernameInputInvalid}
                errorMsg={"Please provide a valid username."}
              />
              <TextInputGroup
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={passwordChangedHandler}
                onBlur={passwordBlurHandler}
                inputInvalid={passwordInputInvalid}
                errorMsg={
                  "Password must be at least 8 characters long, \
                    contain 1 lowercase letter, 1 uppercase letter, \
                    1 digit, and 1 special character."
                }
                className={styles.login__FormGroupLast}
              />
              {/* <TextInputGroup
                  type="password"
                  value={repeatPassword}
                  placeholder="Repeat your password"
                  onChange={repeatPasswordChangedHandler}
                  onBlur={repeatPasswordBlurHandler}
                  inputInvalid={repeatPasswordInputInvalid}
                  errorMsg={"Passwords don't match."}
                  className={styles.login__FormGroupLast}
                  isLast={true}
                /> */}
              <button className={styles.login__button} type="submit" disabled={userStatus === "loading"}>
                Sign Up
              </button>
              <Link to={"/login"} className={`${styles.login__createAccountLink} ${styles.login__link}`}>
                Already have an account? Sign in!
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
