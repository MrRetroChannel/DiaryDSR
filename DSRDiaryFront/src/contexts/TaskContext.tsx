import { createContext, ReactNode, useEffect } from 'react';
import { TaskType } from './TypeContext';
import useMap from '../util/mapState';

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
    repeat: Repeat,
    type: TaskType
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

    }, []);

    return (
        <TaskContext.Provider value={{tasks, setTasks}}>
            {children}
        </TaskContext.Provider>
    )
}