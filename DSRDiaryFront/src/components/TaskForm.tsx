import { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { TypeContext } from '../contexts/TypeContext';
import '../styles/Form.css'
import { Repeat, Task } from '../contexts/TaskContext';

export function TaskForm({open, close}: {open: boolean, close: () => void }) {
    if (!open)
        return null;

    const { register, handleSubmit }  = useForm<Task>();

    const { types } = useContext(TypeContext);

    const handle: SubmitHandler<Task> = async data => console.log(JSON.stringify(data))

    return (
        <div className={`overlay-background ${open ? "active" : ""}`}>
            <form className = "overlay-form" onSubmit = {handleSubmit(handle)}>
                <button className="closeButton" onClick={close}>&times;</button>

                <input type="text" placeholder = "Имя формы" {...register("name", { required: true})}/>
                <input type="datetime-local" {...register("startTime", { required: true })}/>
                <input type="datetime-local" {...register("endTime", { required: true })}/>
                <input type="text" placeholder="Описание" {...register("text")}/>

                <select { ...register("repeat") }>
                    <option value={Repeat.NONE}>Без повторений</option>
                    <option value={Repeat.DAILY}>Каждый день</option>
                    <option value={Repeat.WEEKLY}>Каждую неделю</option>
                    <option value={Repeat.MONTHLY}>Каждый месяц</option>
                    <option value={Repeat.YEARLY}>Каждый год</option>
                </select>

                <select { ...register("type") }>
                    {Array.from(types!.entries())
                        .map(([key, type]) => <option key = {key} value={key}>
                                                {type.typename}
                                            </option>)}
                </select>

                <button>Сохранить</button>
            </form>
        </div>
    )
}