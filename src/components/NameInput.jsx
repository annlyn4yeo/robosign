import { useState } from "react";
import { sanitizeName } from "../utils/sanitizeName";
import styles from "./NameInput.module.css";

export default function NameInput({ onUpdate }) {
  const [value, setValue] = useState("");

  function handleChange(e) {
    const raw = e.target.value;
    const cleaned = sanitizeName(raw); // enforce rules
    setValue(cleaned);
    onUpdate(cleaned); // send cleaned value back to parent (App)
  }

  return (
    <div className={styles.wrap}>
      <label htmlFor="nameInput" className={styles.label}>
        Enter Name
      </label>
      <input
        id="nameInput"
        className={styles.input}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Type your name"
        autoComplete="off"
        spellCheck="false"
      />
      <small className={styles.help}>
        Letters only. No spaces or symbols.
      </small>
    </div>
  );
}
