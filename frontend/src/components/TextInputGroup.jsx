import styles from "./TextInputGroup.module.scss";

function TextInputGroup({
  type,
  value,
  placeholder,
  onChange,
  onBlur,
  inputInvalid,
  errorMsg,
  isLast = false,
}) {
  return (
    <div
      className={`${styles.formGroup} ${isLast && styles.formGroupLast} ${
        inputInvalid && styles.formGroupInvalid
      }`}
    >
      <input
        className={`${styles.formGroup__textInput} ${
          inputInvalid && styles.formGroup__textInputInvalid
        }`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {inputInvalid && (
        <span className={styles.formGroup__invalidMessage}>{errorMsg}</span>
      )}
    </div>
  );
}

export default TextInputGroup;
