import { Task, TaskContext } from '../contexts/TaskContext'
import { useContext, useState } from 'react'
import { TypeContext } from '../contexts/TypeContext';
import { TaskForm } from './TaskForm';
import ContextMenu from './ContextMenu';
import '../styles/TaskBox.css'
import { CompletedTask } from '../contexts/CompletedTaskContext';
import { getDayOfWeek } from '../util/dateUtil';

function getPixels(task: Task): number[] {
    const startY = (task.startTime.getHours() * 60 + task.startTime.getMinutes()) / 15;
    const endY = (task.endTime.getHours() * 60 + task.endTime.getMinutes()) / 15;

    return [ Math.round(startY), Math.round(endY)];
}

function dateToTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

const statusStr = ["Провалено", "Выполняется", "Выполнено"];
const statusColor = ["red", "#404040","#00ff11"]

export default function TaskBox({virtualTask}: {virtualTask: CompletedTask}) {
    const [show, setShow] = useState(false);
    const [context, setContext] = useState({x: 0, y: 0})
    const [contextShow, setContextShow] = useState(false);

    const handleContext = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        setContextShow(true);
        setContext({x: e.clientX, y: e.clientY});
    }

    const { types } = useContext(TypeContext);
    const { tasks } = useContext(TaskContext);

    const task = tasks!.get(virtualTask.taskid)!;
    const type = types!.get(task.typeid);

    const [sY, eY] = getPixels(task);

    const X = getDayOfWeek(virtualTask.day);

    return (
        <>
            <TaskForm open={show} close={() => setShow(false)} task={task} taskid={virtualTask.taskid}/>
            {contextShow && <ContextMenu x={context.x} y={context.y} close={() => setContextShow(false)} task={virtualTask}/>}
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
                    {statusStr[virtualTask.status]}
                    <div className="statusCircle" style={{backgroundColor: statusColor[virtualTask.status]}} />
                </div>
                
                <div className="taskTime">
                    {`${dateToTime(task.startTime)} - ${dateToTime(task.endTime)}`}
                </div>
               
            </div>
        </>
    )
}