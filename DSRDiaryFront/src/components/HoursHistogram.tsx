import { useContext, useState } from 'react'
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
                
    const [show, setShow] = useState(false);
                return (
                    <div key={idx} className="taskTypeColumn" style={{
                        gridColumn: `${week - 1}`,
                        gridRow: `${-lastHour} / ${-(lastHour += Math.round(value))}`,
                        backgroundColor: key.color,
                        overflow: "hidden",
                        border: "1px solid black",
                        zIndex: 2
                    }}
                    onMouseEnter={() => setShow(true)}
                    onMouseLeave={() => setShow(false)}>
                        {key.typename}
                        {show && <div>{`${Math.round(value)} часов`}</div>}
                    </div>
                )
            }) }
        </div>
    )
}