import React from "react";
import styles from "./CallHeader.module.scss";
import { MdOutlineSignalCellularAlt } from "react-icons/md";
import { TiArrowMinimise } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { minimised } from "../../features/chats/chatSlice";

const CallHeader = () => {
  const dispatch = useDispatch();
  const { callPanelStatus } = useSelector((state) => state.chats);

  const onMinimise = () => {
    dispatch(minimised());
  };

  let containerStyle = callPanelStatus === "minimised" ? styles.minimised : styles.container;

  return (
    <div className={containerStyle}>
      {callPanelStatus === "active" && (
        <button onClick={onMinimise} className={styles.button}>
          <TiArrowMinimise />
        </button>
      )}

      <div className={styles.title}>
        <h4>00:00</h4>
      </div>
      <div className={styles.status}>
        <MdOutlineSignalCellularAlt />
      </div>
    </div>
  );
};

export default CallHeader;
