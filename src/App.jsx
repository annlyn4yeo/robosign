import { useState } from "react";
import NameInput from "./components/NameInput";
import KeyboardDisplay from "./components/KeyboardDisplay";
import SignaturePreview from "./components/SignaturePreview";
import "./App.css";

export default function App() {
  const [name, setName] = useState("");

  return (
    <div className="app">
      {/* Input field */}
      <NameInput onUpdate={setName} />

      {/* Keyboard Display */}
      <KeyboardDisplay name={name} />

      {/* Signature Preview */}
      <SignaturePreview name={name} />

      {/* Fixed logo at bottom-right */}
      <div className="logo-bottom-right">ROBOSIGN™</div>
    </div>
  );
}
