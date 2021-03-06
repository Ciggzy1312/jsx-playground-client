import React, { useState, useEffect, useRef } from 'react'
import MDEditor from '@uiw/react-md-editor'
import './text-editor.css'
import { Cell } from '../redux';
import useActions from '../hooks/use-actions';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({cell}) => {

    const ref = useRef<HTMLDivElement | null>(null)
    const [ edit, setEdit] = useState(false)

    const { updateCell } = useActions()

    useEffect(() => {

        const listener = (event: MouseEvent)=>{
            if(ref.current && event.target && ref.current.contains(event.target as Node)){
                return
            }
            setEdit(false)
        }

        document.addEventListener('click', listener, {capture : true})

      return () => {
          document.removeEventListener('click', listener, {capture : true})
      }
    }, [])
    

    if(edit){
        return <div className="text-editor" ref={ref}>
            <MDEditor value={cell.content} onChange={(v)=> updateCell(cell.id,v||"")}/>
        </div>
    }

    return <div className="text-editor" onClick={()=> setEdit(true)}>
        <div className="card-content">
            <MDEditor.Markdown source={cell.content || '# Click to edit'} />
        </div>
    </div>
}

export default TextEditor