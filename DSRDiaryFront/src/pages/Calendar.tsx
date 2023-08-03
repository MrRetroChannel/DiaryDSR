import { useState } from 'react'
import { TaskForm } from '../components/TaskForm'
import TasksGraph from '../components/TasksGraph';
import '../styles/Form.css'
import '../styles/Calendar.css'

export default function Calendar() {
    const [ show, setShow ] = useState(false);

    return (
        <div id="calendar">
            <TasksGraph/>
            <button className="addButton" onClick = {() => setShow(true)}>
                Добавить задачу 
                <span style={{fontSize: "2rem", marginLeft: 4}}>+</span>
            </button>
            <TaskForm open={show} close ={() => setShow(false)} />
        </div>
        
    )
}