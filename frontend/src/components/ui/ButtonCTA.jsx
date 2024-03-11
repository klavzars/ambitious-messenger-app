import styles from "./ButtonCTA.module.scss";

function ButtonCTA({ onClick, label }) {
  return (
    <button className={styles.button} onClick={onClick} disabled={false /* TODO */} type="submit">
      {label}
    </button>
  );
}

export default ButtonCTA;
