import { useDispatch, useSelector } from "react-redux";
import { inactive, minimised } from "../../store/chatSlice";
import styles from "./Call.module.scss";
import CallHeader from "./CallHeader";
import CallControls from "./CallControls";
import CallVideo from "./CallVideo";
import useIsMobile from "../../hooks/useIsMobile";
import { streamEmitter } from "../../services/webrtc/rtcMiddleware";

import { useContext, useEffect, useState } from "react";
import { MediaStreamContext } from "../../store/context/MediaStreamContext";

const Call = () => {
  const streams = useContext(MediaStreamContext);
  const dispatch = useDispatch();
  const callPanelStatus = useSelector((state) => state.chats.callPanelStatus);
  const isMobile = useIsMobile();

  const onMinimise = () => {
    dispatch(minimised());
  };
  const onClose = () => {
    dispatch(inactive());
  };

  let containerStyle;
  const videoContainerStyle = isMobile ? styles.callContainer__mobile : styles.callContainer;

  switch (callPanelStatus) {
    case "minimised":
      containerStyle = styles.minimised;
      break;
    case "active":
      containerStyle = styles.active;
      break;
    case "inactive":
    default:
      containerStyle = styles.inactive;
      break;
  }

  return (
    <div className={containerStyle}>
      <CallHeader />

      <div className={`${videoContainerStyle} ${callPanelStatus === "minimised" && styles.inactive}`}>
        <CallVideo stream={streams.localStream} name="You" />
        <CallVideo stream={streams.remoteStream} name="John Doe" />
      </div>

      <CallControls />
    </div>
  );
};

export default Call;
