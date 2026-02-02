<script>
    import { horarioStore } from '../store'
    import { fetchSchedules } from '../../../hooks/schedules'
    import { Schedule } from '../../../lib/features/schedule'

    let loading = true
    $: schedule = $horarioStore

    $: if (schedule) {
        console.log(schedule)
        loading = false
    }
</script>

<div>
    {#if (!loading)}
        <Schedule classes={schedule} />
    {/if}
</div>
