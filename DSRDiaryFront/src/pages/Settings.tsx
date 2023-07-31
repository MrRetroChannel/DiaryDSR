import TypeForm from '../components/TypeForm';
import { useState, useContext } from 'react'
import TaskTypeBox from '../components/TaskTypeBox';
import { TypeContext } from '../contexts/TypeContext';

export default function Settings() {
    const { types } = useContext(TypeContext);
    
    const [show, setShow] = useState(false);

    return (
        <div className="settings">
            <button className="addButton" onClick = {() => setShow(!show)}>Добавить тип задачи +</button>
            <TypeForm open={show} close={() => setShow(false)}/>

            {Array.from(types!.entries())
                    .map(([key, type]) => <TaskTypeBox key={key} typeid={key} typename = {type.typename} color = {type.color}/>)}
        </div>
    )
}