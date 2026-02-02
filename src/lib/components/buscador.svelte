<script>
    export let handleClick
    export let data
    
    let query = ''

    $: results = query.length > 0 ? data.filter(d => d.code.toLowerCase().includes(query.toLowerCase())) : []

    const handleSelect = (item) => {
        handleClick(item)
        query = ''
    }
</script>

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
                <button on:click={() => handleSelect(item)}>
                    {item.code}
                </button>
            {/each}
        </div>
    {/if}
</div>
