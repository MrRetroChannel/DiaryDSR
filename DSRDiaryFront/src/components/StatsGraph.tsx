import '../styles/Activity.css'
import { getDayOfWeek } from '../util/dateUtil';
import HoursHistogram from "./HoursHistogram";
import { getWeekDate } from './TasksGraph';

function lastWeeksDates(): string[] {
    let today = new Date();

    let startWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    startWeek.setDate(startWeek.getDate() - getDayOfWeek(startWeek) + 1);

    let ret: string[] = [];

    for (var i = 0; i < 4; startWeek.setDate(startWeek.getDate() - 6), i++)
        ret.push(getWeekDate(startWeek));

        return ret;
}

export default function StatsGraph() {
    return (
        <div className="statsGraph">
            <div className="statsDays">
                {lastWeeksDates().map((val, idx) => {
                    idx += 1;
                    return (
                        <div style={{gridColumn: `${-idx} / ${-idx - 1}`, gridRow: 1, marginTop: 5}}>
                            {val}
                        </div>
                    )
                })}
            </div>

            {[-1, -2, -3, -4].map(week => <HoursHistogram week={week}/>) }
        </div>
    )
}