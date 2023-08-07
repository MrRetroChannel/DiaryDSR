import { SetStateAction, createContext, ReactNode, useState, Dispatch, useEffect } from "react"
import { getDaysDiff } from "../util/dateUtil"
import { get } from "../util/api"

export enum Status {
    FAILED,
    INPROGRESS,
    DONE
}

export type CompletedTask = {
    taskid: number,
    day: Date,
    status: Status
}

export type DBCompleted = {
    id?: number
} & CompletedTask

export type CompletedTasksContext = {
    completedTasks: CompletedTask[],
    setCompletedTasks: Dispatch<SetStateAction<CompletedTask[]>>
}

export const CompletedTaskContext = createContext<Partial<CompletedTasksContext>>({});

export function isEqual(task1: CompletedTask, task2: CompletedTask): boolean {
    return getDaysDiff(task1.day, task2.day) == 0 && task1.taskid == task2.taskid;
}

export function CompletedTasksProvider({children}: {children: ReactNode}) {
    const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>([]);

    useEffect(() => {
        

        const getCompletedTasks = async () => {
            const json = await get("api/Tasks/Completed");

            for (let task of json) {
                let prom: DBCompleted = task;
                setCompletedTasks(prev => [...prev, { taskid: prom.taskid, day: new Date(prom.day), status: prom.status}]);
                
            }
        }

        getCompletedTasks();
    }, [])

    return (
        <CompletedTaskContext.Provider value={{completedTasks, setCompletedTasks}}>
            {children}
        </CompletedTaskContext.Provider>
    )
}