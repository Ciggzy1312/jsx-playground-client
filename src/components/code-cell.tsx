import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../redux';
import useActions from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useCumulativeCode } from '../hooks/use-cumulative-code';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {

  const { updateCell, createBundle } = useActions()

  const bundle = useTypedSelector((state)=> (
    state.bundles && state.bundles[cell.id]
  ))

  const cumulativeCode = useCumulativeCode(cell.id)

  useEffect(()=>{
    const timer = setTimeout(async ()=>{
      if(cumulativeCode){
        createBundle(cell.id, cumulativeCode)
      }
    },1500)

    return ()=>{
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id])

  return (
    <Resizable direction='vertical'>
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor initialValue={cell.content} onChange={(value) => updateCell(cell.id, value)} />
        </Resizable>
        {bundle && <Preview code={bundle.code} err={bundle.err}/>}
      </div>
    </Resizable>
  );
};

export default CodeCell;
