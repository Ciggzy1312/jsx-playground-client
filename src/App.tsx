import React, { useState } from 'react';

function App() {

  const [input, setInput] = useState("")

  const [code, setCode] = useState("")

  const handler = ()=>{
    console.log(input)
  }
  return (
    <div className="App">
      <textarea value={input} onChange={e=>setInput(e.target.value)}></textarea>

      <button onClick={handler}>Submit</button>

      <pre>{code}</pre>
    </div>
  );
}

export default App;
