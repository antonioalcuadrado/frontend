<script>
    import './sass/page.sass'
    import { horarioStore } from '../store'
    import { fetchSchedules } from '../../../hooks/schedules'
    import { Schedule } from '../../../lib/features/schedule'

    let loading = true
    $: schedule = $horarioStore

    $: if (schedule) {
        loading = false
    }
</script>

<div class="custom-schedule-grid">
    {#if (!loading)}
        {#each schedule as sch}
            <Schedule classes={sch} />
        {/each}
    {/if}
</div>
