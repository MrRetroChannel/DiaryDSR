import { TypeContext } from '../contexts/TypeContext';
import TypeForm from './TypeForm';
import { TaskType } from '../contexts/TypeContext';
import { useState, useContext } from 'react'
import { apiDelete } from '../util/api';
import '../styles/Settings.css'
import Trash from '../assets/trash.svg'

export default function TaskTypeBox({typeid, typename, color}: {typeid: number} & TaskType) {
    const [show, setShow] = useState(false);

    const { setTypes } = useContext(TypeContext);

    return (
        <div className="typebox">
            <div className="boxText">
                {typename}
            </div>
            <div style={{backgroundColor: color, height: 15, width: 15, borderRadius: "50%", border: "1px solid white"}}></div>
            <button className="editButton" style={{float: "right"}} onClick={ () => { setShow(true) } }>Изменить</button>
            <TypeForm open={show} close={ () => setShow(false) } name={typename} color={color} typeid={typeid} />
            <button className="deleteButton" style={{float: "right"}} onClick={ async () => { setTypes!.remove(typeid); await apiDelete("api/TaskType", typeid) } }><img src={Trash} style={{height: "0.8rem"}}/> Удалить</button>
        </div>
    )
}