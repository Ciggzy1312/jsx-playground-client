import React, { useState, useEffect, useRef } from 'react'
import MDEditor from '@uiw/react-md-editor'
import './text-editor.css'

const TextEditor: React.FC = () => {

    const ref = useRef<HTMLDivElement | null>(null)
    const [ edit, setEdit] = useState(false)

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
        return <div ref={ref}>
            <MDEditor />
        </div>
    }

    return <div onClick={()=> setEdit(true)}>
        <MDEditor.Markdown source={'# Preview Window'} />
    </div>
}

export default TextEditor