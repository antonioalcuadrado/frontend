<script>
    import './sass/page.sass'
    import { fetchGroups, fetchLecturesByGroup } from '../../hooks/groups'
    import { Schedule } from '../../lib/features/schedule'
    import { onMount } from 'svelte';

    let selected_semester = ''

    let groups = []
    let query = ''
    let results = []
    let classes = []
    let loading = true

    onMount(async () => {
        try {
            groups = await fetchGroups()
        } catch (error) {
            console.error('Error while fetching groups:', error)    
        } finally {
            loading = false
        }
    })

    $: results = query.length > 0 ? groups.filter(group => group.code.toLowerCase().includes(query.toLowerCase())) : []

    const handleClick = async (item) => {
        if (!selected_semester) alert("Selecciona un cuatrimestre")
        const id = item.id

        classes = await fetchLecturesByGroup(id, parseInt(selected_semester.split(' ')[1]));
        
        query = ''
    }
</script>

{#if loading}
    <div>
        <h1>Loading...</h1>
    </div>
{:else}
    <div class="degree">
        <section class="degree-search">
            <div class="search-bar">
                <input class="input"
                    type="text"
                    placeholder="Busca el alias de tu grado…"
                    bind:value={query}
                    autocomplete="off"
                />

                {#if results.length}
                    <div class="results">
                        {#each results as item}
                            <button on:click={() => handleClick(item)}>
                                {item.code}
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>
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
