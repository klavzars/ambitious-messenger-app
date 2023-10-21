import styles from "./ChatsPage.module.scss";
import { useState } from "react";

// temporary
import sampleProfilePic from "../assets/sample_profile_pic.png";

const DUMMY_DATA = [
  {
    username: "David Lee",
    lastText: "I'll be there in 5 minutes",
    timestamp: "1m",
  },
  {
    username: "John Doe",
    lastText: "Whassup man",
    timestamp: "2m",
  },
  {
    username: "Jane Smith",
    lastText: "Hey there!",
    timestamp: "1d",
  },
  {
    username: "Michael Johnson",
    lastText: "How's it going?",
    timestamp: "2d",
  },
  {
    username: "Emily Wilson",
    lastText: "What's for lunch?",
    timestamp: "3d",
  },
];

function ChatsPage() {
  const chats = DUMMY_DATA.map((chat, index) => (
    <div className={styles.contactsContainer}>
      <div className={styles.contact}>
        <div className={styles.contact__imageContainer}>
          <img
            className={styles.contact__img}
            src={sampleProfilePic}
            alt={"" /*MAKE THIS DYNAMIC !!*/}
          />
        </div>
        <div className={styles.contact__mainContainer}>
          <div className={styles.contact__left}>
            <h4 className={styles.contact__name}>{chat.username}</h4>
            <p className={styles.contact__message}>{chat.lastText}</p>
          </div>
          <div className={styles.contact__right}>
            <span className={styles.contact__time}>{chat.timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className={styles.pageContainer}>
      <h2 style={{ marginLeft: "2rem", marginBottom: "0", fontSize: "3rem" }}>
        Messages
      </h2>
      {chats}
    </div>
  );
}

export default ChatsPage;
