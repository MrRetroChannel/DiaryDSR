import { Task } from '../contexts/TaskContext'
import { useContext, useState } from 'react'
import { TypeContext } from '../contexts/TypeContext';
import { TaskForm } from './TaskForm';

const graphHeight = window.innerHeight / 2;
const graphWidth = window.innerWidth / 2;

function getPixels(task: Task): number[] {
    const startY = (task.startTime.getHours() * 60 + task.startTime.getMinutes()) / 15; //graphHeight * new Date(task.startTime).getTime() / 1000 / 86400;
    const endY = (task.endTime.getHours() * 60 + task.endTime.getMinutes()) / 15; //graphHeight * new Date(task.endTime).getTime() / 1000 / 86400;
    const X = task.startTime.getDay(); 
    return [ startY, endY, X];
}

export default function TaskBox({taskid, task}: {taskid: number, task: Task}) {
    const [show, setShow] = useState(false);

    const [hover, setHover] = useState(false);

    const { types } = useContext(TypeContext);

    const [sY, eY, X] = getPixels(task);

    return (
        <>
            <TaskForm open={show} close={() => setShow(false)} task={task} taskid={taskid}/>
            <div className="task" 
                style={
                    {
                    backgroundColor: types!.get(task.typeid)!.color, 
                    gridRow: `${96 - Math.round(sY)} / ${96 - Math.round(eY)}`,
                    gridColumn: `${1 + X}`,
                    boxShadow: hover? "4px 17px 8px 0px rgba(34, 60, 80, 0.5)" : "none",
                    cursor: 'pointer',
                    }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => setShow(true)}
                >
                
                {task.name}
            </div>
        </>
    )
}