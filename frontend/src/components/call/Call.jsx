import { useDispatch, useSelector } from "react-redux";
import { inactive, minimised } from "../../features/chats/chatSlice";
import styles from "./Call.module.scss";
import CallHeader from "./CallHeader";
import CallControls from "./CallControls";

const Call = () => {
  const dispatch = useDispatch();
  const { callPanelStatus } = useSelector((state) => state.chats);

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
      {callPanelStatus === "active" && <div className={styles.callContainer}>video feed here/ profile pic</div>}
      <CallControls />
    </div>
  );
};

export default Call;
