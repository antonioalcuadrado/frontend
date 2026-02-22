<script>
    import './sass/page.sass'
    import { Schedule } from '$lib/features/schedule'
    import { customStore } from '$lib/store/custom_schedule_store.js'
    import { Download } from '$lib/icons'
    import { downloadSchedule } from '../../utils'
    
    $: schedule = $customStore
    let loading = true
    let pdfRef

    $: if (schedule) {
        loading = false
    }
</script>

<div class="saved-schedule">
    <section class="saved-schedule-info">
        <p>Horario personalizado</p>
        {#if !loading}
            <button class="download" on:click={() => downloadSchedule(pdfRef)}>
                <div>Descargar horario <Download size=0.9 color="#fff" /></div>
            </button>
        {/if}
    </section>
    <section class="saved-schedule-viewer">
        {#if loading}
            <p>Loading...</p>
        {:else if schedule.length > 0}
            <div bind:this={pdfRef}>
                <Schedule classes={schedule} />
            </div>
        {:else}
            <p>No se ha guardado ningún horario</p>
        {/if}
    </section>
</div>
