<script>
    export let handleClick
    export let data
    export let doFetch = false
    
    let query = ''

    $: results = query.length > 0 ? data.filter(d => d.code.toLowerCase().includes(query.toLowerCase())) : []
    
    $: if (results.length > 0 && results[0].code != query) {
        results = data.filter(d => d.code.toLowerCase().includes(query.toLowerCase()))
    } else {
        results = []
        if (!doFetch) {
            handleClick(query)
        }
    }


    const handleSelect = (item) => {
        if (doFetch) {
            handleClick(item)
            query = ''

            return
        }
        
        query = item.code
        handleClick(item)
    }
</script>

<div class="search-bar">
    <input class="input"
        type="text"
        placeholder="Busca el alias…"
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
