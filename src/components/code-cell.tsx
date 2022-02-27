import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../redux';
import useActions from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {

  const { updateCell, createBundle } = useActions()

  const bundle = useTypedSelector((state)=> (
    state.bundles && state.bundles[cell.id]
  ))

  const cumulativeCode = useTypedSelector((state)=>{

    if(state.cells){
      const { data, order } = state.cells
      const orderedCells = order.map(id=> data[id])
      
      const cumulativeCode = []
      for(let c of orderedCells){
        if(c.type === 'code'){
          cumulativeCode.push(c.content)
        }
        if(c.id === cell.id){
          break;
        }
      }

      return cumulativeCode
    }
  })

  useEffect(()=>{
    const timer = setTimeout(async ()=>{
      if(cumulativeCode){
        createBundle(cell.id, cumulativeCode.join('\n'))
      }
    },1500)

    return ()=>{
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode?.join('\n'), cell.id])

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
