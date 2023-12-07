import React from "react";
import styles from "./CallControls.module.scss";

const ControlButton = ({ icon, altIcon, text, status, state, onclick }) => {
  const buttonStyle = status === "minimised" ? styles.button__sm : styles.button;
  const iconToDisplay = state === "on" ? altIcon : icon;
  const buttonColor = text === "Leave" ? styles.button__red : "";
  console.log(text);

  return (
    <button onClick={onclick} className={`${buttonStyle} ${styles.hover} ${buttonColor}`}>
      {iconToDisplay}
    </button>
  );
};

export default ControlButton;

