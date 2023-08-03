import { useContext, useState } from "react"
import { Task, TaskContext } from "../contexts/TaskContext"
import { TypeContext } from "../contexts/TypeContext";
import TaskBox from "./TaskBox";
import '../styles/Calendar.css'

const genTime = () => { 
    var t: string[] = []; 
    for (var i = 0; i < 24; i += 3)
    {
        var hours = i.toString();
        
        hours = hours.length < 2 ? '0' + hours : hours;

        t.push(hours + ":00");
    }
    return t;
}

const time = genTime();

const days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

export default function TasksGraph() {
    const { tasks } = useContext(TaskContext);

    const { types } = useContext(TypeContext);

    return (
        <div className="fullGrid">
            <div className="tasksgraph">
                { Array.from(tasks!.entries()).map(([key, task]) =><TaskBox key={key} taskid={key} task={task}/>) }

                { time.map((hour, idx) => <div className="graphTime" style={{gridRow: `${96 - (idx * 12) - 3}`, gridColumn: 1}}>{hour}</div>)}
                
                { days.map((day, idx) => <div className="graphDay" style={{gridRow: "96", gridColumn: `${idx + 2}`}}>{day}</div> )}
            </div>
            <div className="daysGrid">
            </div>
        </div>
    )
}