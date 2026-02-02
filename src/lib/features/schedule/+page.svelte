<script>
    import './sass/schedule.sass'

    const days = ["", "Mon", "Tue", "Wed", "Thu", "Fri"]
    const startHour = 9
    const endHour = 21
    
    let loading = true
    export let classes = []

    $: if (classes) {
        loading = false
    }

    const dayIndex = day => days.indexOf(day) + 1
    const rowStart = hour => hour - startHour + 2
</script>

<div class="schedule">
    {#if (!loading)}
        <!-- Time labels -->
        {#each Array(endHour - startHour) as _, i}
            <div class="time">
                {startHour + i}:00
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
                        grid-row: {cls.hour + 2} / span 2;
                    "
                >
                    <strong>{cls.subject_name}</strong>
                    <div>{cls.hour + startHour}:00</div>
                </div>
            {/each}
        {/if}
    {/if}
</div>
