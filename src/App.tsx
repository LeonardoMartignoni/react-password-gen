import { useEffect, useState } from 'react';
import OptionsComponent from './OptionsComponent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {
  const [ passwordLength, setPasswordLength ] = useState(12);
  const [ resultPassword, setResultPassword ] = useState("");
  const [ isPasswordCopied, setIsPasswordCopied ] = useState(false);

  const [ isUppercaseChecked, setIsUppercaseChecked ] = useState(true);
  const [ isLowercaseChecked, setIsLowercaseChecked ] = useState(true);
  const [ isNumbersChecked, setIsNumbersChecked ] = useState(true);
  const [ isSymbolsChecked, setIsSymbolsChecked ] = useState(true);

  const uppercaseLetters = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));
  const lowercaseLetters = Array.from({ length: 26 }, (_, index) => String.fromCharCode(97 + index));
  const numbers = Array.from({ length: 10 }, (_, index) => index.toString());
  const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=', '{', '}', '[', ']', ';', ':', ',', '.', '<', '>', '?', '/'];

  const allCharacters = [
    ...(isUppercaseChecked ? uppercaseLetters : []),
    ...(isLowercaseChecked ? lowercaseLetters : []),
    ...(isNumbersChecked ? numbers : []),
    ...(isSymbolsChecked ? symbols : []),
  ];

  const options = [
    {
      "name": "uppercase-option",
      "label": "Include Uppercase Letters",
    },
    {
      "name": "lowercase-option",
      "label": "Include Lowercase Letters",
    },
    {
      "name": "numbers-option",
      "label": "Include Numbers",
    },
    {
      "name": "symbols-option",
      "label": "Include Symbols",
    },
  ]
  
  function generatePassword(): void {
    let newPassword = "";

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * allCharacters.length);
      newPassword += allCharacters[randomIndex];
    }

    setResultPassword(newPassword);
  }

  function handleCheckboxChange(name: string) {
    switch (name) {
      case 'uppercase-option':
        setIsUppercaseChecked(!isUppercaseChecked);
        break;
      case 'lowercase-option':
        setIsLowercaseChecked(!isLowercaseChecked);
        break;
      case 'numbers-option':
        setIsNumbersChecked(!isNumbersChecked);
        break;
      case 'symbols-option':
        setIsSymbolsChecked(!isSymbolsChecked);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePasswordCopy(): Function {
    setIsPasswordCopied(true);
    navigator.clipboard.writeText(resultPassword);

    // Show copied text for 2.5s
    const timeoutId = setTimeout(() => setIsPasswordCopied(false), 2500);
    return () => {
      clearTimeout(timeoutId);
    }
  }

  return (
    <div className="bg-slate-950 h-screen text-white font-mono flex items-center justify-center flex-col gap-4">
      <h1 className="font-bold text-xl text-center">Password Generator</h1>

      <div id="result" className="bg-gray-800 w-96 flex items-center py-4 px-6 relative">
        <span className="text-2xl">{ isPasswordCopied ? "Copied!" : resultPassword}</span>
        
        <div className="ms-auto">
          <FontAwesomeIcon
          icon={isPasswordCopied ? faCheck : faCopy}
          className="text-2xl text-green-500 hover:text-white transition-colors cursor-pointer"
          onClick={handlePasswordCopy}
          />
        </div>
      </div>

      <div id="options" className="w-96 bg-gray-800 p-4">
        <div id="range-slider">
          <div className="flex items-center">
            <span>Character Length</span>
            <span className="ms-auto text-2xl text-green-500">{passwordLength}</span>
          </div>

          <input
          type="range"
          min="5"
          max="20"
          value={passwordLength}
          className="w-full mb-6 mt-2 accent-green-500"
          onChange={(e) => setPasswordLength(e.target.valueAsNumber)}
          />
        </div>

        {options.map(option => (
          <OptionsComponent option={option} handleCheckboxChange={handleCheckboxChange} />
        ))}
      </div>

      <button onClick={generatePassword} className="border-2 border-green-500 bg-green-500 text-slate-950 font-bold w-96 p-2 hover:bg-slate-950 hover:text-green-500 transition-colors">GENERATE</button>
    </div>
  );
}

export default App;
