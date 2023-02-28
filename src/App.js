import React, { useState } from "react";
import "./App.css";

const languages = [
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
];

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("fr");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setTargetLanguage(e.target.value);
  };

  const translate = async () => {
    const apiKey = "YOUR_API_KEY_HERE";
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${input}&key=${apiKey}`
    );
    const data = await response.json();
    setOutput(data[0][0][0]);
  };

  return (
    <div className="translator-container">
      <textarea
        className="input-textarea"
        value={input}
        onChange={handleChange}
        placeholder="Enter text to translate..."
      />
      <select className="language-select" onChange={handleLanguageChange}>
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
      <button className="translate-button" onClick={translate}>
        Translate
      </button>
      <p className="output">{output}</p>
    </div>
  );
}

export default App;
