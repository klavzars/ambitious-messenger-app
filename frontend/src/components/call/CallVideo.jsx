import React, { useRef, useEffect } from "react";
import styles from "./CallVideo.module.scss";
import useIsMobile from "../../hooks/useIsMobile";

const CallVideo = ({ name, stream }) => {
  const videoRef = useRef();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className={styles.video}>
      <div className={styles.name}>{name}</div>
      <video ref={videoRef} autoPlay playsInline></video>
    </div>
  );
};

export default CallVideo;
