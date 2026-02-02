<script>
    import './sass/page.sass'
    import { fetchGroups, fetchLecturesByGroup } from '../../hooks/groups'
    import { Schedule } from '../../lib/features/schedule'
    import { onMount } from 'svelte';

    let groups = []
    let query = ''
    let results = []
    let classes = []
    let loading = true

    onMount(async () => {
        try {
            groups = await fetchGroups()
            console.log('Groups:', groups)
        } catch (error) {
            console.error('Error while fetching groups:', error)    
        } finally {
            loading = false
        }
    })

    $: results = query.length > 0 ? groups.filter(group => group.code.toLowerCase().includes(query.toLowerCase())) : []

    const handleClick = async (item) => {
        const id = item.id
        
        classes = await fetchLecturesByGroup(id, 2)
        console.log(classes)
    }
</script>

{#if loading}
    <div>
        <h1>Loading...</h1>
    </div>
{:else}
    <div class="degree">
        <div class="degree-search">
            <input
                type="text"
                placeholder="Buscar…"
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
        <div class="degree-schedule">
            <Schedule id="schedule" classes={classes} />
        </div>
    </div>
{/if}
