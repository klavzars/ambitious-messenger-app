import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Contacts from "../components/chat/Contacts";
import Chat from "../components/chat/Chat";
import styles from "./Chats.module.scss";
import NewChat from "../components/chat/NewChat";
import { useDispatch, useSelector } from "react-redux";

import { socketActions } from "../features/websocket/socketSlice";
import Call from "../components/call/Call";

import useIsMobile from "../hooks/useIsMobile";
import { loadMessages } from "../features/messages/messageSlice";
import { currentChat } from "../features/chats/chatSlice";
import { rtcActions } from "../features/webrtc/rtcSlice";
import { streamEmitter } from "../features/webrtc/rtcMiddleware";
import { MediaStreamContext } from "../context/MediaStreamContext";
const { connecting, disconnected } = socketActions;

const Chats = () => {
  const { chatId } = useParams();

  // this is a bit shady for now, I am still thinking about a better way to do this
  const isChatOpened = (chatId ? true : false) && chatId !== "new";
  const isOnNewChat = chatId === "new";

  const dispatch = useDispatch();
  const { callPanelStatus } = useSelector((state) => state.chats);

  const isMobile = useIsMobile();

  // websocket connection - this would ideally be in the container for the rest of the app when SSR is added
  useEffect(() => {
    dispatch(connecting());
    dispatch(rtcActions.createConnection());
    return () => {
      dispatch(disconnected());
      dispatch(rtcActions.disconnectRTC());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // DO A DISPATCH HERE TO get the chat messages and to set the current chat

  useEffect(() => {
    dispatch(loadMessages(chatId));
    dispatch(currentChat(Number(chatId)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId, dispatch]);

  const [streams, setStreams] = useState({ localStream: null, remoteStream: null });

  useEffect(() => {
    const updateStreams = (newStreams) => {
      setStreams(newStreams);
    };

    streamEmitter.on("streams", updateStreams);

    return () => {
      streamEmitter.off("streams", updateStreams);
    };
  }, []);

  const isCallPanelActive = () => {
    if (callPanelStatus == "active") {
      return <Call />;
    }

    return <></>;
  };

  const contactsViewMobile = (
    <div className={styles.container}>
      <Contacts />
    </div>
  );

  const chatViewMobile = (
    <MediaStreamContext.Provider value={streams}>
      <div className={styles.container}>
        {isCallPanelActive()}
        <Chat />
      </div>
    </MediaStreamContext.Provider>
  );

  const newChatViewMobile = (
    <MediaStreamContext.Provider value={streams}>
      <div className={styles.container}>
        <NewChat />
      </div>
    </MediaStreamContext.Provider>
  );

  const viewDesktop = (
    <MediaStreamContext.Provider value={streams}>
      <div className={styles.container}>
        <div className={styles.side}>
          <Contacts />
        </div>
        <div className={styles.main}>
          {!isOnNewChat &&
            (isChatOpened ? (
              <>
                {isCallPanelActive()}
                <Chat />
              </>
            ) : (
              <div className={styles.chatPlaceholder}>
                <p>Please select a chat.</p>
              </div>
            ))}
          {isOnNewChat && <NewChat />}
        </div>
      </div>
    </MediaStreamContext.Provider>
  );

  return isMobile
    ? isOnNewChat
      ? newChatViewMobile
      : isChatOpened
      ? chatViewMobile
      : contactsViewMobile
    : viewDesktop;
};

export default Chats;
