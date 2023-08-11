import { createContext, ReactNode, useEffect, useState } from 'react'
import { get } from '../util/api';
import useMap from '../util/mapState';

export type TaskType = {
    typename: string,
    color: string
}

export type DBType = {
    id?: number,
    name: string,
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
            const check = async () => {await get("api/TaskType").catch(check)}
            await check();

            var json = await get("api/TaskType");
                
                for (var type of json) {
                    var prom: DBType = type;
                    setTypes.set(prom.id!, { typename: prom.name, color: prom.color });
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