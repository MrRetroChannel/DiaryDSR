import { useForm, SubmitHandler } from 'react-hook-form'
import { get, post } from '../util/api';
import useMap from '../util/mapState';
import "../styles/Form.css"
import { createContext } from 'react';

export type TaskType = {
    typename: string,
    color: string
}

var types: Map<number, TaskType> = new Map();

//const [types, setTypes] = useMap<number, TaskType>();
//export const TypesContext = createContext<Map<number, TaskType> | undefined>(undefined);    

async function parseTypes() {
    var json = await get("api/TaskType");
    for (var type of json) {
        type DBType = {typeid: number} & TaskType;

        var prom: DBType = type;
        
        types.set(prom.typeid, { typename: prom.typename, color: prom.color });
        //setTypes.set(prom.typeid, { typename: prom.typename, color: prom.color });
    }
}

//await parseTypes();

export function TypeForm({open, close, name, color}: {open: boolean, close: () => void, name?: string, color?: string}) {
    if (open == false)
        return null;

    const { register, handleSubmit, formState: { errors } }  = useForm<TaskType>()

    const handle: SubmitHandler<TaskType> = async data => { 
        types.set(types.size + 1, data);  
        await post("api/TaskType", JSON.stringify(data)) 
    }

    return (
        <>
            <div className={`overlay-background ${open ? "active" : ""}`}>
                <form className="overlay-form" onSubmit = {handleSubmit(handle)}>
                    <button className="closeButton" onClick={close}>&times;</button>
                    <input placeholder="Имя типа" className = {errors.typename? "errorField" : ""} type="text" value = {name} {...register("typename", { required: true })}/>
                    <input type="color" value = {color} {...register("color")}/>
                    <button>Сохранить</button>
                </form>
            </div>
        </>
    )
}

export { types };