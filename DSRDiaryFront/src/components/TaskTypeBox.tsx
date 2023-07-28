import { TaskType, TypeForm } from "./TypeForm";
import { useState } from "react"

export default function TaskTypeBox({typeid, typename, color}: {typeid: number} & TaskType) {
    const [show, setShow] = useState(false);

    return (
        <div className="typebox">
            {typename}
            <div style={{backgroundColor: color, height: 15, width: 15}}></div>
            <button onClick={ () => { setShow(!show) } }>Изменить</button>
            {show && <TypeForm name={typename} color={color} />}
            <button onClick={ () => {} }>Удалить</button>
        </div>
    )
}