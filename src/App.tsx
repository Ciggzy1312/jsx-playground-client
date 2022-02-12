import { useState } from 'react';
import CodeEditor from './components/code-editor';
import Preview from './components/preview';
import bundler from './bundler';

import 'bulmaswatch/superhero/bulmaswatch.min.css'

function App() {

  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const handler = async () => {
    
    const output = await bundler(input);

    setCode(output);
  };

  return (
    <div>

      <CodeEditor initialValue="const a = 1;" onChange={(value) => setInput(value)}/>

      <div>
        <button onClick={handler}>Submit</button>
      </div>

      <Preview code={code} />
    </div>
  );
}

export default App;
