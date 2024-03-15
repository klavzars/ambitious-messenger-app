import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

const Modal = ({ open, close, children }) => {
  return createPortal(
    <div className={`${styles.modal} ${open ? styles.displayBlock : styles.displayNone}`}>
      <div className={styles.modalMain}>
        <div className={styles.modalHead}>Incoming Call</div>
        <div className={styles.modalBody}>{children}</div>
        {/* <div className={styles.btnContainer}>
          <button type="button" className={styles.btn} onClick={close}>
            Close
          </button>
        </div> */}
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
