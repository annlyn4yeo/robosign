import PropTypes from "prop-types";
import { KEYBOARD_ROWS } from "../utils/keyboardLayout";
import styles from "./KeyboardDisplay.module.css";

export default function KeyboardDisplay({ name }) {
  const usedLetters = new Set(name.split(""));
  return (
    <div className={styles.wrap}>
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((key) => (
            <div
              key={key}
              className={`${styles.key} ${
                usedLetters.has(key) ? styles.active : ""
              }`}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
      <div className={styles.enteredName}>{name}</div>
    </div>
  );
}

KeyboardDisplay.propTypes = {
  name: PropTypes.string.isRequired,
};
