<script>
    import './sass/page.sass'
    import { horarioStore } from '../store'
    import { fetchSchedules } from '../../../hooks/schedules'
    import { Schedule } from '../../../lib/features/schedule'
    import { Trash, RightArrow } from '../../../lib/icons'

    let loading = true
    $: schedule = $horarioStore

    $: if (schedule) {
        loading = false
    }

    const handleDelete = (id) => {
        if (!schedule) return

        schedule = schedule.filter((_, i) => i !== id)
    }
</script>

<div class="custom-schedule-grid">
    {#if (!loading)}
        {#each schedule as sch, i}
            <div class="container">
                <Schedule classes={sch} />
                <div class="action-buttons">
                    <button>
                        Visualizar<RightArrow id="arrow" size=0.6 color="#fff" />
                    </button>
                    <button class="trash" on:click={() => handleDelete(i)}>
                        <Trash size=0.9 color="#fff"/>
                    </button>
                </div>
            </div>
        {/each}
    {/if}
</div>
