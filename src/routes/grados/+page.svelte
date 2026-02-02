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

    const handleClick = async (item) => {
        if (!selected_semester) alert("Selecciona un cuatrimestre")
        const id = item.id

        classes = await fetchLecturesByGroup(id, parseInt(selected_semester.split(' ')[1]));
        
    }
</script>

{#if (loading)}
    <h1>Loading...</h1>
{:else}
    <div class="degree">
        <section class="degree-search">
            <SearchBar handleClick={handleClick} data={groups} />

            <select class="semester-picker" bind:value={selected_semester}>
                <option class="option" value="" selected disabled>Selecciona un cuatrimestre</option>
                <option class="option">Cuatrimestre 1</option>
                <option class="option">Cuatrimestre 2</option>
            </select>
        </section>
        <div class="degree-schedule">
            <Schedule id="schedule" classes={classes} />
        </div>
    </div>
{/if}
