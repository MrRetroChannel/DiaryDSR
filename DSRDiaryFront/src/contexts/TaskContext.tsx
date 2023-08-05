import { createContext, ReactNode, useEffect } from 'react';
import useMap from '../util/mapState';
import { get } from '../util/api';

export enum Repeat {
    NONE,
    DAILY,
    WEEKLY,
    MONTHLY,
    YEARLY
}

export type Task = {
    name: string,
    startTime: Date,
    endTime: Date,
    text: string,
    typeid: number,
    repeat: Repeat
}

export type DBTask = {
    id?: number,
    name: string,
    starttime: string,
    endtime: string,
    comment: string,
    typeid: number,
    repeat: Repeat
}

export type TasksContext = {
    tasks: Map<number, Task>,
    setTasks: {
        set: (key: number, value: Task) => void,
        remove: (key: number) => void
    }
}

export const TaskContext = createContext<Partial<TasksContext>>({});

export function TasksProvider({children} : {children: ReactNode}) {
    const [tasks, setTasks] = useMap<number, Task>();
    useEffect(() => {
        const parseTasks = async () => { 
            var json = await get("api/Tasks");

            for (var type of json) {
                var prom: DBTask = type;
                
                setTasks.set(prom.id!, {
                    name: prom.name,
                    startTime: new Date(prom.starttime),
                    endTime: new Date(prom.endtime),
                    text: prom.comment,
                    typeid: prom.typeid,
                    repeat: prom.repeat,
                })
            }
        };

    parseTasks();
    }, []);

    return (
        <TaskContext.Provider value={{tasks, setTasks}}>
            {children}
        </TaskContext.Provider>
    )
}