import { useContext, useState } from "react"
import { Task, TaskContext } from "../contexts/TaskContext"
import { TypeContext } from "../contexts/TypeContext";
import TaskBox from "./TaskBox";
import '../styles/Calendar.css'

const genTime = () => { 
    var t: string[] = []; 
    for (var i = 0; i < 24; i += 3)
    {
        t.push((i < 10 ? '0' : '') + i.toString() + ":00");
    }

    t.push("00:00");

    return t;
}

function getWeekDate(date?: Date) : string {
    const today = date ?? new Date();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);
    let day = startOfWeek.getDate();
    let month = startOfWeek.getMonth() + 1;
    const first = `${day < 10 ? '0' : ''}${day}/${month + 1 < 10 ? '0' : ''}${month}`;

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    day = endOfWeek.getDate();
    month = endOfWeek.getMonth() + 1;
    const second = `${day < 10 ? '0' : ''}${day}/${month + 1 < 10 ? '0' : ''}${month}`;

    return first + ' - ' + second;
}

const time = genTime();

const days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

export default function TasksGraph() {
    const { tasks } = useContext(TaskContext);

    const [date, setDate] = useState(new Date());

    const changeDate = (days: number) => {
        date.setDate(date.getDate() + days); 
        setDate(new Date(date));
    }

    return (
        <>
        <div className="curDate">
            <button className="weekButtonForward" onClick={() => changeDate(-7)}>
                {"<"}
            </button>
            {`${getWeekDate(date)}         ${date.getFullYear()}`}
            <button className="weekButtonBack" onClick={() => changeDate(7)}>
                {">"}
            </button>
        </div>
        <div className="fullGrid">
            <div className="tasksgraph">
                { Array.from(tasks!.entries()).map(([key, task]) =><TaskBox key={key} taskid={key} task={task}/>) }
            </div>

            <div className="timeGrid">
                { time.map((hour, idx) => <div className="graphTime" style={{gridRow: `${time.length - idx}`, gridColumn: 1}}>{hour}</div>)}
            </div>

            <div className="daysGrid">
                { days.map((day, idx) => <div className="graphDay" style={{gridRow: "1", gridColumn: `${idx + 1}`}}>{day}</div> )}
            </div>
        </div>
        </>
    )
}