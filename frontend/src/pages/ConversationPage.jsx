import styles from "./ConversationPage.module.scss";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdMoreVert, MdLocalPhone } from "react-icons/md";
import { GoDotFill, GoDot } from "react-icons/go";
// temporary
import sampleProfilePic from "../assets/sample_profile_pic.png";

const DUMMY_DATA = [];

function ConversationPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <button className={`${styles.buttonBack} ${styles.button}`}>
          <MdKeyboardArrowLeft
            className={`${styles.buttonIcon} ${styles.buttonIcon__back}`}
          />
        </button>
        <div className={styles.imgContainer}>
          <img
            className={styles.imgContainer__img}
            src={sampleProfilePic}
            alt=""
          />
        </div>
        <div className={styles.contactInfo}>
          <h4 className={styles.contactInfo__name}>Jane Doe</h4>
          <div className={styles.status}>
            <GoDotFill className={styles.status__dot} />
            <span className={styles.status__text}>Online</span>
          </div>
        </div>
        <button className={`${styles.buttonVoice} ${styles.button}`}>
          <MdLocalPhone
            className={`${styles.buttonIcon} ${styles.buttonIcon__phone}`}
          />
        </button>
        <button className={`${styles.buttonOptions} ${styles.button}`}>
          <MdMoreVert
            className={`${styles.buttonIcon} ${styles.buttonIcon__options}`}
          />
        </button>
      </header>

      <div className={styles.conversationContainer}>
        <div className={styles.messageContainer}>
          <div className={styles.message__imageContainer}></div>
          <div className={styles.message__mainContainer}>
            <div className={styles.message__heading}>
              <h5 className={styles.message__name}>John Doe</h5>
              <span className={styles.message__timestamp}>20:23</span>
            </div>
            <div className={styles.message__content}>
              <p>Hey man go fuck yourself.</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.messageInput}>
        <input className={styles.messageInput__textInput} type="text" />
        <button className={styles.messageInput__buttonSend}>*send icon*</button>
      </div>
    </div>
  );
}

export default ConversationPage;
