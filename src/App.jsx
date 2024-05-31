import { useState, useCallback, useEffect, useRef } from 'react'
// useRef : jab bhi kisi bhi cheez ka reference lena hota h tab useRef use krte h
// useCAllback : is a react hook that lets you cache a function def b/w re-renders.

function App(){
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  // input field 
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  // useCallback hook
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      // index ki random value aayi h "str" se : number aata h
      pass += str.charAt(char);      // returns the character a  t the specified index
    }

    setPassword(pass);


  }, [length, numberAllowed, charAllowed, setPassword])
  
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 100)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {       // useEffect : agar dependencies mai kuch change hua toh fn ko dubara se run kro
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button 
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >copy</button>
          
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input      // making that slider
              type="range" 
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )      // true -> false   &   false -> true
              }}
          />
          <label htmlFor="characterInput">Characters</label>
          </div >
        </div>
      </div>
    </>
  )
}

export default App

