<script>
    import './sass/schedule.sass'

    const days = ["", "Mon", "Tue", "Wed", "Thu", "Fri"]
    const start_hour = 9
    const endHour = 21
    
    let loading = true
    export let classes = []

    $: if (classes) {
        loading = false
    }
    
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
</script>

<div class="schedule">
    {#if (!loading)}
        <!-- Time labels -->
        {#each Array(endHour - start_hour) as _, i}
            <div class="time">
                {start_hour + i}:00
            </div>
        {/each}

        <!-- Day headers -->
        {#each days as day}
            <div class="day">{day}</div>
        {/each}

        {#if (classes)}
            <!-- Classes -->
            {#each classes as cls}
                <div
                    class="class"
                    style="
                        grid-column: {cls.day + 2};
                        grid-row: {convertHour(cls.start_hour) + 2 - start_hour} / span {convertHour(cls.end_hour) - convertHour(cls.start_hour)};
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
