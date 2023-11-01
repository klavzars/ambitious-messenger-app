import styles from "./Chat.module.scss";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdMoreVert, MdLocalPhone } from "react-icons/md";
import { GoDotFill, GoDot } from "react-icons/go";
import { IoSend } from "react-icons/io5";
// temporary
import sampleProfilePic from "../assets/sample_profile_pic.png";

function Chat() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <button className={`${styles.buttonBack} ${styles.button}`}>
          <MdKeyboardArrowLeft className={`${styles.buttonIcon} ${styles.buttonIcon__back}`} />
        </button>
        <div className={styles.imgContainer}>
          <img className={styles.imgContainer__img} src={sampleProfilePic} alt="" />
        </div>
        <div className={styles.contactInfo}>
          <h4 className={styles.contactInfo__name}>Jane Doe</h4>
          <div className={styles.status}>
            <GoDotFill className={styles.status__dot} />
            <span className={styles.status__text}>Online</span>
          </div>
        </div>
        <button className={`${styles.buttonVoice} ${styles.button}`}>
          <MdLocalPhone className={`${styles.buttonIcon} ${styles.buttonIcon__phone}`} />
        </button>
        <button className={`${styles.buttonOptions} ${styles.button}`}>
          <MdMoreVert className={`${styles.buttonIcon} ${styles.buttonIcon__options}`} />
        </button>
      </header>

      <div className={styles.conversationContainer}>
        <div className={styles.messageContainer}>
          <div className={styles.message__imageContainer}>
            <img className={styles.message__img} src={sampleProfilePic} alt="" />
          </div>
          <div className={styles.message__mainContainer}>
            <div className={styles.message__heading}>
              <h5 className={styles.message__name}>John Doe</h5>
              <span className={styles.message__timestamp}>20:23</span>
            </div>
            <div className={styles.message__content}>
              <p className={styles.message__text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.messageFromContainer}>
          <div className={styles.messageFrom__mainContainer}>
            <div className={styles.messageFrom__heading}>
              <span className={styles.messageFrom__timestamp}>20:23</span>
              <h5 className={styles.messageFrom__name}>John Doe</h5>
            </div>
            <div className={styles.messageFrom__content}>
              <p className={styles.messageFrom__text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
              </p>
            </div>
          </div>
          <div className={styles.messageFrom__imageContainer}>
            <img className={styles.messageFrom__img} src={sampleProfilePic} alt="" />
          </div>
        </div>
      </div>

      <MessageInput />
    </div>
  );
}

import TextareaAutosize from "react-textarea-autosize";

function MessageInput() {
  return (
    <div className={styles.messageInput}>
      <TextareaAutosize className={styles.messageInput__textInput} placeholder="Type a message" />
      <button className={styles.messageInput__buttonSend}>
        <IoSend className={styles.messageInput__sendIcon} />
      </button>
    </div>
  );
}

export default Chat;