import { useCallback, useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberallowed, setNumberallowed] = useState(false);
  const [uppercaseallowed, setUppercaseallowed] = useState(true);
  const [symbolallowed, setSymbolallowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyz";
    if (uppercaseallowed) {
      str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (numberallowed) {
      str += "0123456789";
    }
    if (symbolallowed) {
      str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    }

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberallowed, symbolallowed, uppercaseallowed]);

  useEffect(() => {
    generatePassword();
  }, [numberallowed, symbolallowed, uppercaseallowed, length]);

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-125 mx-auto my-8 px-4 py-3 bg-gray-800 rounded-lg shadow-md text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow overflow-hidden rounded-lg mb-4">
        <input
          type="text"
          value={password}
          className="border rounded py-1 px-3 w-full text-black bg-white"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPassword}
          className="outline-none shrink-0 text-white bg-blue-700 px-3 py-0.5 cursor-pointer"
        >
          Copy
        </button>
      </div>
      {copied && <p className="text-green-500 text-sm text-center">Copied!</p>}
      <div className="flex text-sm gap-x-2 justify-between">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={50}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="cursor-pointer"
            name=""
            id=""
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberallowed}
            onChange={() => setNumberallowed((prev) => !prev)}
            name=""
            id=""
          />
          <label htmlFor="numberallowed">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={symbolallowed}
            onChange={() => setSymbolallowed((prev) => !prev)}
            name=""
            id=""
          />
          <label htmlFor="symbolallowed">Character</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            defaultChecked={uppercaseallowed}
            onChange={() => setUppercaseallowed((prev) => !prev)}
            name=""
            id=""
          />
          <label htmlFor="uppercaseallowed">Uppercase</label>
        </div>
      </div>
    </div>
  );
}

export default App;
