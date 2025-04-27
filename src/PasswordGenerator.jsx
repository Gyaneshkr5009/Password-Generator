import React, { useState, useCallback , useEffect , useRef } from 'react'

const App = () => {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [Password, setPassword] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  {/* const cachedFn = useCallback(fn, dependencies) */}
  const passwordGenerator = useCallback(() => {
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const number = '0123456789';
    const symbol = '!@#$%^&*()_+[]{}|;:,.<>?';

    if (numbers) str += number;
    if (symbols) str += symbol;

    let pass = "";

    for (let i = 1; i <= length; i++) {
      //this will give us the random index of the string;
      let idx = Math.floor(Math.random() * str.length);
      pass += str.charAt(idx);
    }

    setPassword(pass);
  }, [length, numbers, symbols , setPassword]);

  useEffect(() =>{
    passwordGenerator()
  } , [length, numbers, symbols, setPassword, passwordGenerator]);

  const passwordRef= useRef(null);

  const copyPasswordToClipboard = useCallback(() =>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(Password);
    setCopyMessage('Copied!');

    //remove the message after 2 sec;
    setTimeout(() => {
      setCopyMessage('');
    }, 2000);
  },[Password])
  return (
    <div className="bg-gradient-to-r from-slate-700 to-slate-900 h-screen flex items-center justify-center">
      {/* Copy confirmation message */}
      {copyMessage && (
        <div className="absolute top-4 right-4 bg-cyan-600 text-white py-2 px-4 rounded-lg shadow-lg">
          {copyMessage}
        </div>
      )}
      <div className="w-full max-w-md mx-auto bg-slate-800 shadow-2xl rounded-2xl px-8 py-10 text-cyan-300">
        <h1 className="text-4xl font-bold text-center mb-6">Password Generator</h1>
        <div className="flex flex-row gap-4 mb-6 items-center">
          <input
            type="text"
            value={Password}
            placeholder="Password"
            className="w-full outline-none py-2 px-4 rounded-lg bg-slate-700 text-white placeholder-slate-400 shadow-md focus:ring-2 focus:ring-cyan-500 transition duration-300"
            readOnly
            ref={passwordRef}
          />
          <button 
            onClick={copyPasswordToClipboard}
            className="bg-cyan-600 hover:bg-cyan-700 transition-colors duration-300 rounded-lg py-2 px-4 outline-none text-white font-semibold shadow-md active:scale-95 transform transition duration-150">
            Copy
          </button>
        </div>

        {/* Length and Checkbox options */}
        <div className='flex flex-col gap-6 mb-6'>
          {/* Length slider */}
          <div className='flex items-center gap-4'>
            <input
              type="range"
              min={6}
              max={24}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
            <span>Length: {length}</span>
          </div>

          {/* Checkboxes */}
          <div className='flex gap-8 mb-6'>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={numbers}
                id="numbersInput"
                onChange={(e) => setNumbers(e.target.checked)}
                className="h-5 w-5 accent-cyan-600 rounded-md"
              />
              <label htmlFor="numbersInput" className="text-white text-lg">Include Numbers</label>
            </div>

            {/* another way of onchange(() => setNumber(prev => !prev)) changing the states
                while above we set the value as true or false
            */}

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={symbols}
                id="symbolsInput"
                onChange={(e) => setSymbols(e.target.checked)}
                className="h-5 w-5 accent-cyan-600 rounded-md"
              />
              <label htmlFor="symbolsInput" className="text-white text-lg">Include Symbols</label>
            </div>
          </div>
        </div>

        {/* Generate Password button */}
        <div className="flex justify-center">
          <button
            className="w-full bg-cyan-600 hover:bg-cyan-700 transition-colors duration-300 rounded-lg py-2 px-4 outline-none text-white font-semibold shadow-md"
            onClick={passwordGenerator}
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
