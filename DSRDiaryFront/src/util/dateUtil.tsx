export function getDaysDiff(date1: Date, date2: Date): number {
    const days1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const days2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return Math.round((days1.getTime() - days2.getTime()) / (1000 * 3600 * 24));
}

export function getDayOfWeek(date: Date): number {
    if (date.getDay() == 0)
        return 7;

    return date.getDay();
}