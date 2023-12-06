import React from "react";
import styles from "./CallControls.module.scss";

const ControlButton = ({ icon, text, status }) => {
  return <button className={status === "minimised" ? styles.button__sm : styles.button}>{icon}</button>;
};

export default ControlButton;
