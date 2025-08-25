import { useState } from "react";
import NameInput from "./components/NameInput";
import KeyboardDisplay from "./components/KeyboardDisplay";
import SignaturePreview from "./components/SignaturePreview";
import "./App.css";

export default function App() {
  const [name, setName] = useState("");

  return (
    <div className="app">
      <NameInput onUpdate={setName} />
      <KeyboardDisplay name={name} />
      <SignaturePreview name={name} />
      <div className="logo-bottom-right">ROBOSIGN™</div>
    </div>
  );
}
