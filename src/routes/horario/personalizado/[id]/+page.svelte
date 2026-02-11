<script>
    import { horarioStore } from '../../store'
    import { Schedule } from '$lib/features/schedule'

    let { data } = $props()
    
    const schedule = $derived($horarioStore[data.id])
</script>

<Schedule classes={schedule} />
