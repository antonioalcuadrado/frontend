<script>
    import { horarioStore } from '$lib/store/horario_store'
    import { goto } from '$app/navigation'
    import { Schedule } from '$lib/features/schedule'
    import { RightArrow, Download } from '$lib/icons'
    import { downloadSchedule } from '../../../../utils'
    import './sass/page.sass'

    let pdfRef;
    let { data } = $props()
    
    const schedule = $derived($horarioStore[data.id])
    
    const goback = () => {
        goto('/horario/personalizado')
    }
</script>

<div>
    <section class="download">
        <button on:click={() => goback()} class="goback-button">
            <RightArrow color="#fff"/>
        </button>
        <button on:click={() => downloadSchedule(pdfRef)} class="download-button">
            Descargar horario<Download size=1 color="#fff" />
        </button>
    </section>

    <section class="custom-schedule-pdf">
        <div bind:this={pdfRef}>
            <Schedule classes={schedule} />
        </div>
    </section>
</div>

