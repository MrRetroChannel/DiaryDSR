import { useContext } from "react";
import { CompletedTaskContext } from "../contexts/CompletedTaskContext";
import '../styles/Activity.css'
import HoursHistogram from "./HoursHistogram";

export default function StatsGraph() {
    const { completedTasks } = useContext(CompletedTaskContext);

    return (
        <div className="statsGraph">
            {[-1, -2, -3, -4].map(week => <HoursHistogram week={week}/>) }
        </div>
    )
}