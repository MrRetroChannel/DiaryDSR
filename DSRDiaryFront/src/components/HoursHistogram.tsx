import { useContext, useState, useEffect } from 'react'
import { CompletedTaskContext, Status } from '../contexts/CompletedTaskContext'
import { TaskContext } from '../contexts/TaskContext';
import { TaskType, TypeContext } from '../contexts/TypeContext';
import { getDayOfWeek } from '../util/dateUtil';

export default function HoursHistogram({week}: {week: number}) {
    const { completedTasks } = useContext(CompletedTaskContext);
    const { tasks } = useContext(TaskContext);
    const { types } = useContext(TypeContext);

    let today = new Date();

    let startWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    startWeek.setDate(startWeek.getDate() + (week + 1) * 7)
    startWeek.setDate(startWeek.getDate() - getDayOfWeek(today) + 1)

    let endWeek = new Date(startWeek);
    endWeek.setHours(23); endWeek.setMinutes(59); endWeek.setSeconds(59);
    endWeek.setDate(startWeek.getDate() + 6);

    const typeMap = new Map<TaskType, number>();

    for (let ctask of completedTasks!) {
        if (ctask.status == Status.DONE && startWeek.getTime() < ctask.day.getTime() && ctask.day.getTime() < endWeek.getTime()) {
            const task = tasks!.get(ctask.taskid);
            
            if (task != undefined) {
                const type = types!.get(task.typeid);

                if (type != undefined) {
                    const hours = (task.endTime.getTime() - task.startTime.getTime()) / 3600000;
                    typeMap.set(type, hours + (typeMap.get(type) ?? 0));
                }
            }
        }
    }

    let lastHour = 1;

    return (
        <div className="hoursHistogram">
            { Array.from(typeMap.entries()).map(([key, value], idx) => {
                const [x, setX] = useState(0);
                const [y, setY] = useState(0);
            
                const [show, setShow] = useState(false);
            
                useEffect(() => {
                    let listener = (e: MouseEvent) => {
                        setX(e.x);
                        setY(e.y);
                    }
                    window.addEventListener('mousemove', listener);

                    return () => window.removeEventListener('mousemove', listener);
                })
                return (
                    <div key={idx} className="taskTypeColumn" style={{
                        gridColumn: `${week - 1}`,
                        gridRow: `${-lastHour} / ${-(lastHour += Math.round(value))}`,
                        backgroundColor: key.color,
                        overflow: "hidden",
                        border: "1px solid black",
                        zIndex: 2,
                        position: 'relative'
                    }}
                    onMouseEnter={() => setShow(true)}
                    onMouseLeave={() => setShow(false)}>
                        {show && <div style={{position: 'fixed', top: y - 10, left: x + 10, width: '100px', backgroundColor: '#000a'}}>{`${Math.round(value)} часов`}</div>}
                        {key.typename}
                    </div>
                )
            }) }
        </div>
    )
}