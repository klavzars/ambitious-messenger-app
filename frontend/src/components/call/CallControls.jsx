import React from "react";
import styles from "./CallControls.module.scss";
import { MdOutlineMic, MdMicOff, MdOutlineScreenShare, MdCallEnd, MdVideocam, MdVideocamOff } from "react-icons/md";
import ControlButton from "./ControlButton";
import { useSelector } from "react-redux";

const controlsArray = [
  {
    icon: <MdVideocam />,
    altIcon: <MdVideocamOff />,
    text: "Video",
    onclick: () => {
      console.log("Video");
    },
  },
  {
    icon: <MdOutlineScreenShare />,
    altIcon: <MdOutlineScreenShare />,
    text: "Share Screen",
    onclick: () => {
      console.log("Share Screen");
    },
  },
  {
    icon: <MdOutlineMic />,
    altIcon: <MdMicOff />,
    text: "Audio",
    onclick: () => {
      console.log("Audio");
    },
  },
  {
    icon: <MdCallEnd />,
    altIcon: <MdCallEnd />,
    text: "Leave",
    onclick: () => {
      console.log("Leave");
    },
  },
];

const CallControls = () => {
  const { callPanelStatus } = useSelector((state) => state.chats);
  return (
    <div className={callPanelStatus === "minimised" ? styles.minimised : styles.container}>
      {controlsArray.map((controls, index) => (
        <ControlButton status={callPanelStatus} key={index} {...controls} />
      ))}
    </div>
  );
};

export default CallControls;
