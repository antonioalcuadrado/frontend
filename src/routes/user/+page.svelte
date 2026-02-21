<script>
    import './sass/page.sass'
    import { Schedule } from '$lib/features/schedule'
    import { customStore } from '$lib/store/custom_schedule_store.js'
    
    $: schedule = $customStore
    let loading = true

    $: if (schedule) {
        loading = false
    }
</script>

<div class="saved-schedule">
    {#if loading}
        <p>Loading...</p>
    {:else if schedule.length > 0}
        <Schedule classes={schedule} />
    {:else}
        <p>No se ha guardado ningún horario</p>
    {/if}
</div>
