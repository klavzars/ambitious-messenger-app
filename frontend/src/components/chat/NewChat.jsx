import styles from "./NewChat.module.scss";
import { useState } from "react";
import Checkbox from "../utilities/Checkbox";

// temporary
import defaultUserPic from "../../assets/default_user_1.png";

const DUMMY_USERS = [
  {
    id: 1,
    username: "David Lee",
    lastText: "I'll be there in 5 minutes. I'll be there in 5 minutes. I'll be there in 5 minutes.",
    timestamp: "1m",
  },
  {
    id: 2,
    username: "John Doe",
    lastText: "Whassup man",
    timestamp: "2m",
  },
  {
    id: 3,
    username: "Jane Smith",
    lastText: "Hey there!",
    timestamp: "1d",
  },
  {
    id: 4,
    username: "Michael Johnson",
    lastText: "How's it going?",
    timestamp: "2d",
  },
  {
    id: 5,
    username: "Emily Wilson",
    lastText: "What's for lunch?",
    timestamp: "3d",
  },
];

function NewChat() {
  const [searchText, setSearchText] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // TODO: possibly improve search
  // NOTE: this is a very simple search implementation,
  // should be an api call to the backend
  const filteredUsers = DUMMY_USERS.filter((user) => user.username.toLowerCase().includes(searchText.toLowerCase()));

  const handleUserCheckboxChange = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      const userIndex = prevSelectedUsers.findIndex((prevUserId) => prevUserId === userId);
      console.log("userIndex: ", userIndex);
      if (userIndex === -1) {
        // User not found, add the user
        console.log("User not found, add the user");
        return [...prevSelectedUsers, userId];
      } else {
        // User found, remove the user from the array
        console.log("User found, remove the user from the array");
        const updatedUsers = [...prevSelectedUsers];
        updatedUsers.splice(userIndex, 1);
        return updatedUsers;
      }
    });
  };

  const handleCreateChat = () => {
    console.log("Create chat with users: ", selectedUsers);
  };

  return (
    <div className={styles.newChat}>
      <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Search or start new chat"
        className={styles.searchInput}
      />
      <ul className={styles.userList}>
        {filteredUsers.map((user) => (
          <li key={user.id} className={styles.userList__item}>
            <div className={styles.userList__leftContainer}>
              <div className={styles.userList__imageContainer}>
                <img className={styles.userList__img} src={defaultUserPic} alt={"" /* TODO make this dynamic*/} />
              </div>
              <span className={styles.userList__username}>{user.username}</span>
            </div>
            <input
              type="checkbox"
              checked={user.selected}
              onChange={() => handleUserCheckboxChange(user.id)}
              className={styles.userList__checkbox}
            />
          </li>
        ))}
      </ul>
      <div className={styles.createChat}>
        <button className={styles.createChat__button} disabled={false /* TODO */} type="submit">
          Create Chat
        </button>
      </div>
    </div>
  );
}

export default NewChat;
