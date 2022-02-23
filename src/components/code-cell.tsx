import { useEffect, useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';
import { Cell } from '../redux';
import useActions from '../hooks/use-actions';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const { updateCell } = useActions()

  useEffect(()=>{
    const timer = setTimeout(async ()=>{
      const output = await bundle(cell.content);
      if(output){
        setCode(output.code);
        setError(output.err);
      }
    },2500)

    return ()=>{
      clearTimeout(timer)
    }
  }, [cell.content])

  return (
    <Resizable direction='vertical'>
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor initialValue={cell.content} onChange={(value) => updateCell(cell.id, value)} />
        </Resizable>
        <Preview code={code} err={error}/>
      </div>
    </Resizable>
  );
};

export default CodeCell;
