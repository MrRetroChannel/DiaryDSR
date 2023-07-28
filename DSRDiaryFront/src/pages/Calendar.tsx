import { useState } from 'react'
import { TaskForm } from '../components/TaskForm'

export default function Calendar() {
    const [ show, setShow ] = useState(false);

    return (
        <>  
            <button onClick = {() => setShow(true)}>Добавить задачу</button>
            <TaskForm open={show} close ={() => setShow(false)} />
        </>
        
    )
}