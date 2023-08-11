import { useContext, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TaskType, TypeContext, DBType } from '../contexts/TypeContext'
import { post, put, apiDelete } from '../util/api';
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
        let prom: DBType = { name: data.typename, color: data.color };

        if (!isEditing) 
            setTypes!.set(await post("api/TaskType", JSON.stringify(prom)), data); 
        else
        {
            setTypes!.set(typeid!, data);
            prom.id = typeid!;
            await put("api/TaskType", JSON.stringify(prom));
        }

        close(); 
    }

    return (
        <div className={`overlay-background ${open ? "active" : ""}`}>
            <form className="overlay-form" onSubmit={handleSubmit(handle)}>
                <div style={{height: "10px"}}></div>
                <button className="closeButton" onClick={close}>&times;</button>
                <input placeholder="Имя типа" className={errors.typename? "errorField" : ""} type="text" value={lname} {...register("typename", { required: true })} onChange={(e) => setName(e.target.value)}/>
                <label>Цвет</label>
                <input className="colorPicker" type="color" value={lcolor === undefined ? "#000000" : lcolor} {...register("color")} onChange={(e) => setColor(e.target.value)}/>
                <div className="buttons">
                {isEditing && <button className="deleteButton" style={{marginTop: "5px"}} onClick={async () => { setTypes!.remove(typeid!); await apiDelete("api/TaskType", typeid); close(); }}>
                                Удалить
                              </button>}
                <button className="saveButton">Сохранить</button>
                </div>
            </form>
        </div>
    )
}