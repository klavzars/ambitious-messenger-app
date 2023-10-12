import styles from "./LogIn.module.scss";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import logo from "../assets/ambitious_logo_blue.svg";

function LogIn() {
  return (
    <div className={styles.outsideContainer}>
      <div className={styles.card}>
        <Container className={styles.bsContainer}>
          <Row className={`${styles.mainRow}`}>
            <Col md={12} lg={6} className={`${styles.imageContainer}`}>
              <img
                src={logo}
                alt="Ambitious Messenger logo"
                className={styles.logoImage}
              />
            </Col>
            <Col md={12} lg={6} className={styles.login}>
              <form className={styles.login__form}>
                <h2 className={styles.login__title}>Sign in</h2>
                <div className={styles.login__formGroup}>
                  <input
                    className={styles.login__textInput}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div
                  className={`${styles.login__formGroup} ${styles.login__formGroupLast}`}
                >
                  <input
                    className={styles.login__textInput}
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                  />
                </div>
                <a
                  className={`${styles.login__resetPasswordLink} ${styles.login__link}`}
                  href="/"
                >
                  Forgot your password?
                </a>
                <button className={styles.login__button} type="submit">
                  Sign in
                </button>
                <a
                  className={`${styles.login__createAccountLink} ${styles.login__link}`}
                  href="/"
                >
                  Don't have an account yet? Sign up!
                </a>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default LogIn;
