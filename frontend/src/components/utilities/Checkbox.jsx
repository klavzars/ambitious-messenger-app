import { useState } from "react";
import styles from "./Checkbox.module.scss";
import { FaCheck } from "react-icons/fa";

const CustomCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.container}>
      <input type="checkbox" />
      <span className={styles.checkmark}></span>
    </div>
  );
};

export default CustomCheckbox;
