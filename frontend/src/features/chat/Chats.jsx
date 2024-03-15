import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import Contacts from "./all-chats/Contacts";
import styles from "./Chats.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { socketActions } from "../../store/socketSlice";

import { loadMessages } from "../../store/messageSlice";
import { currentChat } from "../../store/chatSlice";
const { connecting, disconnected } = socketActions;

const Chats = () => {
  const { chatId } = useParams();
  const socketStatus = useSelector((state) => state.socket.isConnected);

  const dispatch = useDispatch();

  // DO A DISPATCH HERE TO get the chat messages and to set the current chat

  useEffect(() => {
    console.log("DISPATCH loadMessages");
    dispatch(loadMessages(chatId));
    dispatch(currentChat(Number(chatId)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId, dispatch]);

  // TODO - move this
  // websocket connection - this would ideally be in the container for the rest of the app when SSR is added
  useEffect(() => {
    dispatch(connecting());
    return () => {
      // TODO IF CHECK SAM CE JE CONNECTED LETS GOOOOOOOO
      if (socketStatus) {
        dispatch(disconnected());
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.side}>
        <Contacts />
      </div>
      <Outlet />
    </div>
  );
};

export default Chats;
