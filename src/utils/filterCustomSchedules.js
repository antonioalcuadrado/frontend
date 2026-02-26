const getHour = (hour) => {
    const [h,m,s] = hour.split(':').map(Number)
    return h
}

const getDayMaxDiff = (day) => {
    let max_diff = 0

    day.forEach((cls, i) => {
        if (!day[i + 1]) return
        
        const diff = getHour(day[i + 1].start_hour) - getHour(cls.end_hour)
        //console.log("Hora start: " + getHour(day[i + 1].start_hour) + " Hora end: " + getHour(cls.end_hour) + " Diff: " + diff)
        if (diff > max_diff)
            max_diff = diff
    });

    return max_diff
}

const filterCustomSchedules = (schedules, max_hours, max_waiting_time) => {
    return schedules.filter(schedule => {
        const classByDay = {}
        
        // Divides the schedule by days
        schedule.forEach(cls => {
            const day = cls.day
            if (!classByDay[day])
                classByDay[day] = []

            classByDay[day].push(cls)
        })
      
        // Checks if every day satisfies the filters
        for (const day in classByDay) {
            const classes_sorted = classByDay[day].sort((a, b) => a.start_hour.localeCompare(b.start_hour))
            console.log(classes_sorted)
            const total_hours = classByDay[day].reduce((total, cls) => total + (getHour(cls.end_hour) - getHour(cls.start_hour)), 0)

            const max_diff = getDayMaxDiff(classByDay[day])

            if (total_hours > max_hours) return false
            if (max_diff > max_waiting_time) return false
        }
        
        return true
    })
}

export default filterCustomSchedules
