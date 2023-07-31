import { TypeContext } from '../contexts/TypeContext';
import TypeForm from './TypeForm';
import { TaskType } from '../contexts/TypeContext';
import { useState, useContext } from 'react'
import { apiDelete } from '../util/api';
import '../styles/TypeBox.css'

export default function TaskTypeBox({typeid, typename, color}: {typeid: number} & TaskType) {
    const [show, setShow] = useState(false);

    const { setTypes } = useContext(TypeContext);

    return (
        <div className="typebox">
            {typename}
            <div style={{backgroundColor: color, height: 15, width: 15, borderRadius: "50%", border: "1px solid white"}}></div>
            <button onClick={ () => { setShow(true) } }>Изменить</button>
            <TypeForm open={show} close={ () => setShow(false) } name={typename} color={color} typeid={typeid} />
            <button onClick={ async () => { setTypes!.remove(typeid); await apiDelete("api/TaskType", typeid) } }>Удалить</button>
        </div>
    )
}