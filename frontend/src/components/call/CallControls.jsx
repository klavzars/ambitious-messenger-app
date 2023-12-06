import React from "react";
import styles from "./CallControls.module.scss";
import { MdOutlineMic, MdMicOff, MdOutlineScreenShare, MdCallEnd, MdVideocam } from "react-icons/md";
import ControlButton from "./ControlButton";
import { useSelector } from "react-redux";

const controlsArray = [
  {
    icon: <MdVideocam />,
    text: "Video",
  },
  {
    icon: <MdOutlineScreenShare />,
    text: "Share Screen",
  },
  {
    icon: <MdOutlineMic />,
    text: "Audio",
  },
  {
    icon: <MdCallEnd />,
    text: "Leave",
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
