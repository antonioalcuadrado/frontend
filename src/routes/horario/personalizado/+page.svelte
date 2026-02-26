<script>
    import './sass/page.sass'
    import { horarioStore } from '$lib/store/horario_store'
    import { customStore } from '$lib/store/custom_schedule_store'
    import { goto } from '$app/navigation'
    import { fetchSchedules } from '../../../hooks/schedules'
    import { filterCustomSchedules } from '../../../utils'
    import { Schedule } from '$lib/features/schedule'
    import { Trash, Save } from '$lib/icons'

    let loading = true
    $: schedule = $horarioStore
    let schedules_view
    
    let max_hours_value = 12
    let waiting_time_value = 0

    $: if (schedule) {
        loading = false
        schedules_view = schedule
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

    const checkWaitingTime = () => {
        if (waiting_time_value < 0)
            waiting_time_value = 0
        else if (waiting_time_value > 10)
            waiting_time_value = 10
    }

    const checkMaxHours = () => {
        if (max_hours_value < 0)
            max_hours_value = 0
        else if (max_hours_value > 12)
            max_hours_value = 12
    }

    const checkFilterEmpty = (value) => {
        return !value && value != 0
    } 

    const searchSchedules = () => {
        if (checkFilterEmpty(max_hours_value) || checkFilterEmpty(waiting_time_value)) return;

        schedules_view = filterCustomSchedules(schedule, max_hours_value, waiting_time_value)

        console.log(schedules_view)
    }
</script>

<div>
    <section class="custom-schedule-filters">
        <form on:submit={searchSchedules}>
            <div>
                <label>Tiempo de espera máximo</label>
                <input 
                    type="number"
                    min="0"
                    max="10"
                    bind:value={waiting_time_value}
                    on:input={checkWaitingTime}
                    placeholder="Inserte horas de espera"
                    />
            </div>
            <div>
                <label>Horas máximas por día</label>
                <input 
                    type="number"
                    min="0"
                    max="12"
                    bind:value={max_hours_value}
                    on:input={checkMaxHours}
                    placeholder="Inserte número de horas" 
                    />
            </div>
            <button type="submit">Buscar</button>
        </form>
    </section>
    <section class="custom-schedule-grid">
        {#if (!loading)}
            {#each schedule as sch, i}
                {#if (schedules_view.includes(sch))}
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
                {/if}
            {/each}
        {/if}
    </section>
</div>
