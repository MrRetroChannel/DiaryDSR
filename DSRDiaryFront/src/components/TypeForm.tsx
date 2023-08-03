import { useContext, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TaskType, TypeContext } from '../contexts/TypeContext'
import { post, put } from '../util/api';
import '../styles/Form.css'

export default function TypeForm({open, close, name, color, typeid}: {open: boolean, close: () => void, name?: string, color?: string, typeid?: number}) {
    if (open == false)
        return null;

    const isEditing = name !== undefined || color !== undefined;

    const { register, handleSubmit, formState: { errors } }  = useForm<TaskType>()

    const { setTypes } = useContext(TypeContext);

    const [lname, setName] = useState(name);
    const [lcolor, setColor] = useState(color);

    const handle: SubmitHandler<TaskType> = async data => {
        if (!isEditing) 
            setTypes!.set(await post("api/TaskType", JSON.stringify(data)), data); 
        else
        {
            setTypes!.set(typeid!, data);
            const putData: {typeid: number} & TaskType = { typeid: typeid!, ...data };
            await put("api/TaskType", JSON.stringify(putData));
        }
    }

    return (
        <div className={`overlay-background ${open ? "active" : ""}`}>
            <form className="overlay-form" onSubmit={handleSubmit(handle)}>
                <button className="closeButton" onClick={close}>&times;</button>
                <input placeholder="Имя типа" className={errors.typename? "errorField" : ""} type="text" value={lname} {...register("typename", { required: true })} onChange={(e) => setName(e.target.value)}/>
                <input type="color" value={lcolor === undefined ? "#000000" : lcolor} {...register("color")} onChange={(e) => setColor(e.target.value)}/>
                {isEditing && <button className="deleteButton">Удалить</button>}
                <button className="saveButton">Сохранить</button>
            </form>
        </div>
    )
}