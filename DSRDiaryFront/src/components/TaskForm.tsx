import { useContext, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { TypeContext } from '../contexts/TypeContext';
import '../styles/Form.css'
import { DBTask, Repeat, Status, Task, TaskContext } from '../contexts/TaskContext';
import { apiDelete, post, put } from '../util/api';

function toISO(date: Date) {
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime() - offset * 60000).toISOString();
}

export function TaskForm({open, close, task, taskid}: {open: boolean, close: () => void, task?: Task, taskid?: number }) {
    if (!open)
        return null;

    const { register, handleSubmit, getValues, formState: { errors } }  = useForm<Task>();

    const { types } = useContext(TypeContext);
    const { setTasks } = useContext(TaskContext);

    const isEditing = task ? true : false;

    const [lname, setName] = useState(task ? task.name : "");
    const [lStart, setStart] = useState(task ? toISO(task.startTime).substring(0, 16) : "");
    const [lEnd, setEnd] = useState(task ? toISO(task.endTime).substring(0, 16) : "");
    const [lText, setText] = useState(task ? task.text : "");
    const [lRepeat, setRepeat] = useState(task ? task.repeat : 0);
    const [lType, setType] = useState(task ? task.typeid : 0);

    const handle: SubmitHandler<Task> = async data => {
        data.typeid = parseInt(data.typeid.toString());
        data.repeat = parseInt(data.repeat.toString()); 
        data.startTime = new Date(data.startTime);
        data.endTime = new Date(data.endTime);
        data.status = Status.INPROGRESS;
        
        const dbTask: DBTask = { taskname: data.name, 
                                 starttime: data.startTime.toISOString(),
                                 endtime: data.endTime.toISOString(),
                                 taskcomment: data.text,
                                 typeId: data.typeid,
                                 status: Status.INPROGRESS,
                                 repeat: data.repeat
                                };
        
        if (!isEditing)
            setTasks!.set(await post("api/Tasks", JSON.stringify(dbTask)), data);
        else {
            setTasks!.set(taskid!, data);
            dbTask.taskid = taskid;
            await put("api/Tasks", JSON.stringify(dbTask));
        }

        close();
    }

    return (
        <div className={`overlay-background ${open ? "active" : ""}`}>
            <form className={"overlay-form"} onSubmit = {handleSubmit(handle)}>
                <button className="closeButton" onClick={close}>&times;</button>

                <input className={errors.name ? "errorField" : ""} value={lname} type="text" placeholder = "Имя задачи" {...register("name", { required: true})} onChange={e => setName(e.target.value)}/>
                <label>Время начала:</label>
                <input className={`datepicker ${errors.startTime ? "errorField" : ""}`} value={lStart} type="datetime-local" {...register("startTime", { required: true})} onChange={e => setStart(e.target.value)}/>
                <label>Время завершения:</label>
                <input className={`datepicker ${errors.startTime ? "errorField" : ""}`} value={lEnd} type="datetime-local" {...register("endTime", { required: true, validate: date => { const start = new Date(getValues("startTime")); const end = new Date(date); return start.getDate() === end.getDate() && start.getTime() < end.getTime(); } })} onChange={e => setEnd(e.target.value)}/>
                <input className="formcomment" value={lText} type="text" placeholder="Описание" {...register("text")} onChange={e => setText(e.target.value)}/>

                <select value={lRepeat} { ...register("repeat") } onChange={e => setRepeat(parseInt(e.target.value))}>
                    <option value={Repeat.NONE}>Без повторений</option>
                    <option value={Repeat.DAILY}>Каждый день</option>
                    <option value={Repeat.WEEKLY}>Каждую неделю</option>
                    <option value={Repeat.MONTHLY}>Каждый месяц</option>
                    <option value={Repeat.YEARLY}>Каждый год</option>
                </select>

                <select value={lType} { ...register("typeid") } onChange={e => setType(parseInt(e.target.value))}>
                    {Array.from(types!.entries())
                        .map(([key, type]) => <option key = {key} value={key}>
                                                {type.typename}
                                              </option>)}
                </select>
                {isEditing && <button className="deleteButton" onClick={ async () => { setTasks?.remove(taskid!); await apiDelete(`api/Tasks`, taskid) }}>Удалить</button>}
                <button>Сохранить</button>
            </form>
        </div>
    )
}