import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import Contacts from "../components/chat/Contacts";
import styles from "./Chats.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { socketActions } from "../features/websocket/socketSlice";
import Call from "../components/call/Call";
const { connecting, disconnected, connected } = socketActions;

const Chats = () => {
  const dispatch = useDispatch();
  const { callPanelStatus } = useSelector((state) => state.chats);

  // TODO - move this
  // websocket connection - this would ideally be in the container for the rest of the app when SSR is added
  useEffect(() => {
    dispatch(connecting());
    return () => {
      dispatch(disconnected());
    };
  }, []);

  const isCallPanelActive = () => {
    if (callPanelStatus == "active") {
      console.log("something ran here");
      return <Call />;
    }

    return <></>;
  };

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
