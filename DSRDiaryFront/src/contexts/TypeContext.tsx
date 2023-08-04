import { createContext, ReactNode, useEffect, useState } from 'react'
import { get } from '../util/api';
import useMap from '../util/mapState';

export type TaskType = {
    typename: string,
    color: string
}

type TypesContext = {
    types: Map<number, TaskType>,
    setTypes: {
        set: (key: number, value: TaskType) => void,
        remove: (key: number) => void
    }
}

export const TypeContext = createContext<Partial<TypesContext>>({});

export function TypesProvider({children} : {children: ReactNode}) {
    const [types, setTypes] = useMap<number, TaskType>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const parseTypes = async () => { 
                var json = await get("api/TaskType");
                type DBType = {typeid: number} & TaskType;
                
                for (var type of json) {
                    var prom: DBType = type;
                    setTypes.set(prom.typeid, { typename: prom.typename, color: prom.color });
                }

                setLoading(false);
            };
        parseTypes();
    }, [])

    if (loading)
    return (
        <div className="loading">Загрузка...</div>
    )
    
    return (
        <TypeContext.Provider value = {{types, setTypes}}>
            {children}
        </TypeContext.Provider>
    )
}