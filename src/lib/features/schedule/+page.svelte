<script>
    import './sass/schedule.sass'

    const days = ["", "Mon", "Tue", "Wed", "Thu", "Fri"]
    const start_hour = 9
    const endHour = 21
    
    let loading = true
    export let classes = []
    export let onClick
    export let id

    const overlap = (a, b) => {
        const startA = a.start_hour
        const endA = a.end_hour
        const startB = b.start_hour
        const endB = b.end_hour

        return startA < endB && startB < endA
    }

    const getOverlaped = (lectures) => {
        let results = []

        lectures.map(lecture => {
            const start = lecture.start_hour
            const end = lecture.end_hour

            const group = lectures.filter(l => l.day === lecture.day && overlap(l, lecture))

            const sorted_group = group.slice().sort((a, b) => a.subject.name.localeCompare(b.subject.name))


            results.push({...lecture, overlap_count: group.length, overlap_index: sorted_group.findIndex(l => l === lecture)})
        })
        
        return results
    }

    $: if (classes) {
        loading = false
    }

    $: processed_classes = getOverlaped(classes)
    
    const dayIndex = day => days.indexOf(day) + 1
    const rowStart = hour => hour - start_hour + 2

    const convertHour = (hour) => {
        const split_hour = hour.split(':')
        const int_hour = parseInt(split_hour[0])

        return int_hour
    }

    const getHall = (cls) => {
        if (!cls.hall) return "N/A"

        return cls.hall.code
    }
    
    const classWidth = (cls) => {
        if (cls.overlap_count > 1) {
            return 82.5 / cls.overlap_count
        }
        return 92
    }

    const classMargin = (cls) => {
        if (cls.overlap_count > 1) {
            return (97 / cls.overlap_count * cls.overlap_index) + 2 * cls.overlap_index
        }
        return 0
    }
</script>

<div class="schedule" on:click={() => onClick(id)} style="position: relative;">
    {#if (!loading)}
        <!-- Time labels -->
        {#each Array(endHour - start_hour + 1) as _, i}
            <div class="time">
                {start_hour + i}:00
            </div>
        {/each}

        <!-- Day headers -->
        {#each days as day}
            <div class="day">{day}</div>
        {/each}

        {#if (processed_classes)}
            <!-- Classes -->
            {#each processed_classes as cls}
                <div
                    class="class"
                    style="
                        grid-column: {cls.day + 2};
                        grid-row: {convertHour(cls.start_hour) + 2 - start_hour} / span {convertHour(cls.end_hour) - convertHour(cls.start_hour)};
                        width: calc({classWidth(cls)}%);
                        margin-left: calc({classMargin(cls)}%);
                    "
                >
                    <strong>{cls.subject.name}</strong>
                    <div>{getHall(cls)}</div>
                    <div>{cls.start_hour}</div>
                </div>
            {/each}
        {/if}
    {/if}
</div>
