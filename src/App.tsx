import { useEffect, useState } from 'react';
import OptionsComponent from './OptionsComponent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App(): JSX.Element {
  const [ passwordLength, setPasswordLength ] = useState<number>(10);
  const [ resultPassword, setResultPassword ] = useState<string>("");
  const [ isPasswordCopied, setIsPasswordCopied ] = useState<boolean>(false);

  const [ isUppercaseChecked, setIsUppercaseChecked ] = useState<boolean>(true);
  const [ isLowercaseChecked, setIsLowercaseChecked ] = useState<boolean>(true);
  const [ isNumbersChecked, setIsNumbersChecked ] = useState<boolean>(true);
  const [ isSymbolsChecked, setIsSymbolsChecked ] = useState<boolean>(true);

  const uppercaseLetters: Array<string> = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));
  const lowercaseLetters: Array<string> = Array.from({ length: 26 }, (_, index) => String.fromCharCode(97 + index));
  const numbers: Array<string> = Array.from({ length: 10 }, (_, index) => index.toString());
  const symbols: Array<string> = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=', '{', '}', '[', ']', ';', ':', ',', '.', '<', '>', '?', '/'];

  const allCharacters: Array<string> = [
    ...(isUppercaseChecked ? uppercaseLetters : []),
    ...(isLowercaseChecked ? lowercaseLetters : []),
    ...(isNumbersChecked ? numbers : []),
    ...(isSymbolsChecked ? symbols : []),
  ];

  const options = [
    { name: "uppercase-option", label: "Include Uppercase Letters" },
    { name: "lowercase-option", label: "Include Lowercase Letters" },
    { name: "numbers-option", label: "Include Numbers" },
    { name: "symbols-option", label: "Include Symbols" },
  ]
  
  function generatePassword(): void {
    if (isUppercaseChecked || isLowercaseChecked || isNumbersChecked || isSymbolsChecked) {
      let newPassword = "";
  
      for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        newPassword += allCharacters[randomIndex];
      }
  
      setResultPassword(newPassword);
    } else {
      setResultPassword("No option selected");
    }
  }

  type OptionHandlers = {
    [key: string]: () => void;
  }

  function handleCheckboxChange(name: string) {
    const optionHandlers: OptionHandlers = {
      'uppercase-option': () => setIsUppercaseChecked(prev => !prev),
      'lowercase-option': () => setIsLowercaseChecked(prev => !prev),
      'numbers-option': () => setIsNumbersChecked(prev => !prev),
      'symbols-option': () => setIsSymbolsChecked(prev => !prev),
    };

    const handler: Function = optionHandlers[name];
    handler();
  }

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
    <div className="bg-slate-950 h-screen text-white flex items-center justify-center flex-col gap-4">
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
          min="1"
          max="20"
          value={passwordLength}
          className="w-full mb-6 mt-2 accent-green-500"
          onChange={(e) => setPasswordLength(e.target.valueAsNumber)}
          />
        </div>

        {options.map(option => (
          <OptionsComponent key={option.name} option={option} handleCheckboxChange={handleCheckboxChange} />
        ))}
      </div>

      <button onClick={generatePassword} className="border-2 border-green-500 bg-green-500 text-slate-950 font-bold w-96 p-2 hover:bg-slate-950 hover:text-green-500 transition-colors">GENERATE</button>
    </div>
  );
}

export default App;
