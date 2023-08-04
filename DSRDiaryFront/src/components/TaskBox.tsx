import { Task } from '../contexts/TaskContext'
import { useContext, useState } from 'react'
import { TypeContext } from '../contexts/TypeContext';
import { TaskForm } from './TaskForm';
import ContextMenu from './ContextMenu';
import '../styles/TaskBox.css'

function getPixels(task: Task): number[] {
    const startY = (task.startTime.getHours() * 60 + task.startTime.getMinutes()) / 15;
    const endY = (task.endTime.getHours() * 60 + task.endTime.getMinutes()) / 15;
    const X = task.startTime.getDay(); 
    return [ Math.round(startY), Math.round(endY), X];
}

function dateToTime(date: Date): string {
    return `${date.getHours()}:${date.getMinutes()}`;
}

const statusStr = ["Провалено", "Выполняется", "Выполнено"];
const statusColor = ["red", "#404040","#00ff11"]

export default function TaskBox({taskid, task}: {taskid: number, task: Task}) {
    const [show, setShow] = useState(false);
    const [context, setContext] = useState({x: 0, y: 0})
    const [contextShow, setContextShow] = useState(false);

    const handleContext = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        setContextShow(true);
        setContext({x: e.clientX, y: e.clientY});
    }

    const { types } = useContext(TypeContext);

    const [sY, eY, X] = getPixels(task);

    const type = types!.get(task.typeid);

    return (
        <>
            <TaskForm open={show} close={() => setShow(false)} task={task} taskid={taskid}/>
            {contextShow && <ContextMenu x={context.x} y={context.y} close={() => setContextShow(false)} taskid={taskid}/>}
            <div className="task" 
                style={
                    {
                    backgroundColor: type ? type.color : "#fff5", 
                    gridRow: `${96 - sY} / ${96 - eY}`,
                    gridColumn: `${X}`,
                    }}
                onClick={() => setShow(true)}
                onContextMenu={e => handleContext(e)}
                >

                <div className="taskName">
                    {task.name}
                </div>
                
                <div className="taskStatus">
                    {statusStr[task.status]}
                    <div className="statusCircle" style={{backgroundColor: statusColor[task.status]}} />
                </div>
                
                <div className="taskTime">
                    {`${dateToTime(task.startTime)} - ${dateToTime(task.endTime)}`}
                </div>
               
            </div>
        </>
    )
}