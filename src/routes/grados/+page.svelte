<script>
    import './sass/page.sass'
    import { Schedule } from '../../lib/features/schedule'
    import { SearchBar } from '../../lib/components'
    import { fetchGroups, fetchLecturesByGroup } from '../../hooks/groups'
    import { onMount } from 'svelte';

    let groups = [] 
    let loading = true
    let selected_semester = ''
    let classes = []

    onMount(async () => {
        try {
            groups = await fetchGroups()
        } catch (error) {
            console.error('Error while fetching groups:', error)    
        } finally {
            loading = false
        }
    })    

    const hoy = new Date()
    const mes = hoy.getMonth() + 1

    // Select a initial semester
    if (mes >= 9 || mes <= 1) {
        selected_semester = "1"
    } else if (mes >= 2 && mes <= 6) {
        selected_semester = "2"
    } 

    const handleClick = async (item) => {
        if (!selected_semester) alert("Selecciona un cuatrimestre")
        const id = item.id

        classes = await fetchLecturesByGroup(id, parseInt(selected_semester));
        
    }
</script>

{#if (loading)}
    <h1>Loading...</h1>
{:else}
    <div class="degree">
        <section class="degree-search">
            <SearchBar handleClick={handleClick} data={groups} doFetch={true} />
            <select class="semester-picker" bind:value={selected_semester}>
                <option class="option" value="" selected disabled>Selecciona un cuatrimestre</option>
                <option class="option" value="1">Cuatrimestre 1</option>
                <option class="option" value="2">Cuatrimestre 2</option>
            </select>
        </section>
        <div class="degree-schedule">
            <Schedule id="schedule" classes={classes} />
        </div>
    </div>
{/if}
