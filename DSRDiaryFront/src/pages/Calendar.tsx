import { useState } from 'react'
import { TaskForm } from '../components/TaskForm'
import '../styles/Form.css'

export default function Calendar() {
    const [ show, setShow ] = useState(false);

    return (
        <>  
            <button className="addButton" onClick = {() => setShow(true)}>Добавить задачу +</button>
            <TaskForm open={show} close ={() => setShow(false)} />
        </>
        
    )
}