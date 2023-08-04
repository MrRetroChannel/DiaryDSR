import { useContext } from "react";
import { Status, TaskContext } from "../contexts/TaskContext";
import { apiDelete, put } from "../util/api";

export default function ContextMenu({x, y, close, taskid}: {x: number, y: number, close: () => void, taskid: number}) {
    const { tasks, setTasks } = useContext(TaskContext)

    return (
        <div style={{position: "fixed", top: 0, left: 0, right: 0, bottom: 0}} onClick={close}>
            <div className="contextMenu" style={{top: y, left: x}}>
                <div className="completeCtxButton" onClick={ async () => { await put(`api/Tasks/setComplete/${taskid}`); let cur = tasks!.get(taskid)!; cur.status = Status.DONE; setTasks!.set(taskid, cur);}}>Выполнить</div>
                <div className="deleteCtxButton" onClick={ async () => { setTasks?.remove(taskid!); await apiDelete(`api/Tasks`, taskid); close() }}>Удалить</div>
            </div>
        </div>
    )
}