import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { apiDelete, post, put } from "../util/api";
import { CompletedTask, CompletedTaskContext, Status } from "../contexts/CompletedTaskContext";

export default function ContextMenu({x, y, close, task}: {x: number, y: number, close: () => void, task: CompletedTask}) {
    const { tasks, setTasks } = useContext(TaskContext);
    const { completedTasks, setCompletedTasks } = useContext(CompletedTaskContext);
    return (
        <div style={{position: "fixed", top: 0, left: 0, right: 0, bottom: 0}} onClick={close}>
            <div className="contextMenu" style={{top: y, left: x}}>
                {task.status == Status.INPROGRESS && <div className="completeCtxButton" onClick={ async () => { task.status = Status.DONE; await post(`api/Tasks/setComplete`, JSON.stringify(task)); setCompletedTasks!([...completedTasks!, task])}}>Выполнить</div> }
                <div className="deleteCtxButton" onClick={ async () => { setTasks!.remove(task.taskid); await apiDelete(`api/Tasks`, task!.taskid); close(); }}>Удалить</div>
            </div>
        </div>
    )
}