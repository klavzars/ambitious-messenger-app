import { useDispatch, useSelector } from "react-redux";
import { inactive, minimised } from "../../features/chats/chatSlice";
import styles from "./Call.module.scss";
import CallHeader from "./CallHeader";
import CallControls from "./CallControls";
import CallVideo from "./CallVideo";
import useIsMobile from "../../hooks/useIsMobile";

const Call = () => {
  const dispatch = useDispatch();
  const { callPanelStatus } = useSelector((state) => state.chats);
  const isMobile = useIsMobile();

  const onMinimise = () => {
    dispatch(minimised());
  };
  const onClose = () => {
    dispatch(inactive());
  };

  let containerStyle;

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
      {callPanelStatus === "active" && (
        <div className={isMobile ? styles.callContainer__mobile : styles.callContainer}>
          <CallVideo name="You" />
          <CallVideo name="John Doe" />
        </div>
      )}
      <CallControls />
    </div>
  );
};

export default Call;
