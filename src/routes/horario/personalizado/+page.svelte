<script>
    import './sass/page.sass'
    import { horarioStore } from '$lib/store/horario_store'
    import { customStore } from '$lib/store/custom_schedule_store'
    import { goto } from '$app/navigation'
    import { fetchSchedules } from '../../../hooks/schedules'
    import { Schedule } from '$lib/features/schedule'
    import { Trash, Save } from '$lib/icons'

    let loading = true
    $: schedule = $horarioStore

    $: if (schedule) {
        loading = false
    }

    const handleDelete = (id) => {
        if (!schedule) return

        schedule = schedule.filter((_, i) => i !== id)
        horarioStore.set(schedule)
    }

    const handleVisualize = (id) => {
        goto(`/horario/personalizado/${id}`)
    }
    
    const handleSave = (sch) => {
        customStore.set(sch)
    }
</script>

<div class="custom-schedule-grid">
    {#if (!loading)}
        {#each schedule as sch, i}
            <div class="container">
                <Schedule classes={sch} onClick={handleVisualize} id={i} />
                <div class="action-buttons">
                    <button on:click={() => handleSave(sch)}>
                        Guardar en perfil<Save size=0.9 color="#fff" />
                    </button>
                    <button class="trash" on:click={() => handleDelete(i)}>
                        <Trash size=0.9 color="#fff"/>
                    </button>
                </div>
            </div>
        {/each}
    {/if}
</div>
