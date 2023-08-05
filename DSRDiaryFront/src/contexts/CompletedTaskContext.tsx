import { SetStateAction, createContext, ReactNode, useState, Dispatch } from "react"

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

export function CompletedTasksProvider({children}: {children: ReactNode}) {
    const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>([]);
    <CompletedTaskContext.Provider value={{completedTasks, setCompletedTasks}}>
        {children}
    </CompletedTaskContext.Provider>
}