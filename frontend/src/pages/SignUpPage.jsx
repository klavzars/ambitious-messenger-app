import styles from "./SignUpPage.module.scss";
// import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import logo from "../assets/ambitious_logo_blue.svg";
import { useState } from "react";
import TextInputGroup from "../components/TextInputGroup";

// TODO - maybe implement better email validation
// NOTE to self - include source of regex

// simple email validation
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// simple password validation - must be 8 characters and include one
// of each: lowercase letter, uppercase letter, number, special character
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  // stores if user has 'touched' the input field,
  // needed for proper validation
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [repeatPasswordTouched, setRepeatPasswordTouched] = useState(false);

  const enteredEmailValid = emailRegex.test(email.trim());
  const enteredPasswordValid = passwordRegex.test(password);
  const enteredRepeatPasswordValid =
    repeatPassword !== "" && repeatPassword === password;

  const emailInputInvalid = emailTouched && !enteredEmailValid;
  const passwordInputInvalid = passwordTouched && !enteredPasswordValid;
  const repeatPasswordInputInvalid =
    repeatPasswordTouched && !enteredRepeatPasswordValid;

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

  const repeatPasswordChangedHandler = (e) => {
    setRepeatPassword(e.target.value);
  };

  const repeatPasswordBlurHandler = () => {
    setRepeatPasswordTouched(true);
  };

  const submitFormHanlder = (e) => {
    e.preventDefault();

    setEmailTouched(true);
    setPasswordTouched(true);
    setRepeatPasswordTouched(true);

    // don't proceed if form is invalid
    if (
      !enteredEmailValid ||
      !enteredPasswordValid ||
      !enteredRepeatPasswordValid
    ) {
      return;
    }

    // just a log for now
    console.log(email, password, repeatPassword);

    // reset inputs and touch states
    setEmail("");
    setPassword("");
    setRepeatPassword("");
    setEmailTouched(false);
    setPasswordTouched(false);
    setRepeatPasswordTouched(false);
  };

  return (
    <div className={styles.outsideContainer}>
      <div className={styles.card}>
        {/* <Container className={styles.bsContainer}>
          <Row className={`${styles.mainRow}`}>
            <Col md={12} lg={6} className={`${styles.imageContainer}`}>
              <img
                src={logo}
                alt="Ambitious Messenger logo"
                className={styles.logoImage}
              />
            </Col>
            <Col md={12} lg={6} className={styles.login}>
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
                <TextInputGroup
                  type="password"
                  value={repeatPassword}
                  placeholder="Repeat your password"
                  onChange={repeatPasswordChangedHandler}
                  onBlur={repeatPasswordBlurHandler}
                  inputInvalid={repeatPasswordInputInvalid}
                  errorMsg={"Passwords don't match."}
                  className={styles.login__FormGroupLast}
                  isLast={true}
                />
                <button className={styles.login__button} type="submit">
                  Sign Up
                </button>
                <a
                  className={`${styles.login__createAccountLink} ${styles.login__link}`}
                >
                  Already have an account? Sign in!
                </a>
              </form>
            </Col>
          </Row>
        </Container> */}
      </div>
    </div>
  );
}

export default SignUpPage;
