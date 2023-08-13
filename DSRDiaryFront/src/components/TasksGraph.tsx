import { useContext, useState, useEffect } from "react"
import { Repeat, TaskContext } from "../contexts/TaskContext"
import TaskBox from "./TaskBox";
import '../styles/Calendar.css'
import { CompletedTask, CompletedTaskContext, Status, isEqual } from "../contexts/CompletedTaskContext";
import { getDayOfWeek, getDaysDiff } from "../util/dateUtil";

const genTime = () => { 
    var t: string[] = []; 
    for (var i = 0; i < 24; i += 3)
        t.push((i < 10 ? '0' : '') + i.toString() + ":00");
    t.push("00:00");
    return t;
}

export function getWeekDate(date?: Date) : string {
    const today = date ?? new Date();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - getDayOfWeek(today) + 1);
    let day = startOfWeek.getDate();
    let month = startOfWeek.getMonth() + 1;
    const first = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}`;

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    day = endOfWeek.getDate();
    month = endOfWeek.getMonth() + 1;
    const second = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}`;

    return first + ' - ' + second;
}

const time = genTime();

const days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

export default function TasksGraph() {
    const { tasks } = useContext(TaskContext);
    const { completedTasks, setCompletedTasks } = useContext(CompletedTaskContext);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        var eventSource = new EventSource("https://localhost:7177/api/TasksUpdater");

        eventSource.onmessage = e => {
            const completed = JSON.parse(e.data);

            for (let task of completed)
                setCompletedTasks!(prev => [...prev, { taskid: task.Taskid, day: new Date(task.Day), status: task.Status }]);
        }
    }, [])

    let startWeek = new Date(date);
    startWeek.setDate(startWeek.getDate() - getDayOfWeek(date) + 1);

    let endWeek = new Date(startWeek);
    endWeek.setDate(startWeek.getDate() + 6);

    const changeDate = (days: number) => {
        date.setDate(date.getDate() + days); 
        setDate(new Date(date));
    }

    const getWeekTasks = () => {
        var thisWeekTasks: CompletedTask[] = [];

        var curDate = new Date(startWeek);

        for (let i = 0; i < 7; i++) {
            tasks!.forEach((value, key) => {
                const diff = getDaysDiff(curDate, value.startTime);
                const virtualTask: CompletedTask = { taskid: key, day: new Date(curDate), status: Status.INPROGRESS};
                if (diff >= 0)
                switch (value.repeat) {
                    case Repeat.NONE:
                        if (diff == 0)
                            thisWeekTasks.push(virtualTask);
                        break;

                    case Repeat.DAILY:
                        if (diff % 1 == 0)
                            thisWeekTasks.push(virtualTask);
                        break;

                    case Repeat.WEEKLY:
                        if (diff % 7 == 0)
                            thisWeekTasks.push(virtualTask);
                        break;

                    case Repeat.MONTHLY:
                        if (diff % 30 == 0)
                            thisWeekTasks.push(virtualTask);
                        break;

                    case Repeat.YEARLY:
                        if (diff % 365 == 0)
                            thisWeekTasks.push(virtualTask);
                        break;    
                }
            })
            curDate.setDate(curDate.getDate() + 1);
        }

        for (var i of thisWeekTasks)
            for (var i1 of completedTasks!)
                if (isEqual(i, i1))
                    i.status = i1.status;

        return thisWeekTasks;
    }
    
    return (
        <>
        <div className="curDate">
            <button className="weekButtonForward" onClick={() => changeDate(-7)}>
                {"<"}
            </button>

            <div className="titleDays">
                {`${getWeekDate(date)}`}
            </div>

            <button className="weekButtonBack" onClick={() => changeDate(7)}>
                {">"}
            </button>
            
            <div className="titleYear">
                {`${date.getFullYear()}`}
            </div>

            
        </div>
        <div className="fullGrid">
            <div className="tasksgraph">
            { getWeekTasks().sort(
                (a, b) => { 
                    let taska = tasks!.get(a.taskid);
                    let taskb = tasks!.get(b.taskid);
                    
                    let aNum = taska!.endTime.getTime() - taska!.startTime.getTime();
                    let bNum = taskb!.endTime.getTime() - taskb!.startTime.getTime();

                    if (aNum > bNum)
                        return -1;
                    if (aNum < bNum)
                        return 1;
                    return 0;
                })
                .map((task, idx) => <TaskBox key={idx} virtualTask={task}/>) }
            </div>

            <div className="timeGrid">
                { time.map((hour, idx) => <div key={idx} className="graphTime" style={{gridRow: `${time.length - idx}`, gridColumn: 1}}>{hour}</div>)}
            </div>

            <div className="daysGrid">
                { days.map((day, idx) => <div key={idx} className="graphDay" style={{gridRow: "1", gridColumn: `${idx + 1}`}}>{day}</div> )}
            </div>
        </div>
        </>
    )
}