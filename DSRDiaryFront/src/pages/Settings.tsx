import { TypeForm } from "../components/TypeForm"
import { useState } from 'react'
import { types } from "../components/TypeForm";
import TaskTypeBox from "../components/TaskTypeBox";

export default function Settings() {
    const [show, setShow] = useState(false);

    return (
        <>
            <button onClick = {() => setShow(!show)}>Добавить тип задачи</button>
            <TypeForm open={show} close={() => setShow(false)}/>

            {Array.from(types.entries())
                    .map(([key, type]) => <TaskTypeBox key = {key} typeid={key} typename = {type.typename} color = {type.color}/>)}
        </>
    )
}