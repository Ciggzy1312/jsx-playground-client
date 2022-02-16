import React, { useState, useEffect, useRef } from 'react'
import MDEditor from '@uiw/react-md-editor'
import './text-editor.css'

const TextEditor: React.FC = () => {

    const ref = useRef<HTMLDivElement | null>(null)
    const [ edit, setEdit] = useState(false)
    const [ value, setValue] = useState('# Preview Window')

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
            <MDEditor value={value} onChange={(v)=>setValue(v || '')}/>
        </div>
    }

    return <div className="text-editor" onClick={()=> setEdit(true)}>
        <div className="card-content">
            <MDEditor.Markdown source={value} />
        </div>
    </div>
}

export default TextEditor