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

export enum Status {
    FAILED,
    INPROGRESS,
    DONE
}

export type Task = {
    name: string,
    startTime: Date,
    endTime: Date,
    text: string,
    typeid: number,
    repeat: Repeat,
    status: Status
}

export type DBTask = {
    taskid?: number,
    taskname: string,
    starttime: string,
    endtime: string,
    taskcomment: string,
    typeId: number,
    status: Status,
    repeat: Repeat,
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
                
                setTasks.set(prom.taskid!, {
                    name: prom.taskname,
                    startTime: new Date(prom.starttime),
                    endTime: new Date(prom.endtime),
                    text: prom.taskcomment,
                    typeid: prom.typeId,
                    repeat: prom.repeat,
                    status: prom.status
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