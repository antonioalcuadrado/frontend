<script>
    export let handleClick;
    export let data;
    export let doFetch = false;
    
    let query = '';
    let selected_index = -1; // -1 significa que nada está resaltado
    let results = [];

    // Filtrado de resultados
    $: results = query.length > 0 ? data.filter(d => d.code.toLowerCase().includes(query.toLowerCase())) : []
    
    $: if (data.filter(d => d.code.toLowerCase() === query.toLowerCase()).length > 0) results = []

    // Resetear el índice cuando cambia la búsqueda
    $: if (query) selected_index = -1;

    const handleSelect = (code) => {
        if (!code) return;

        if (doFetch) {
            handleClick(code);
            query = '';
        } else {
            query = code;
            handleClick(code);
        }
        selected_index = -1;
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();

            selected_index = selected_index < results.length - 1 
                ? selected_index + 1 : 0
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();

            selected_index = selected_index > 0
                ? selected_index - 1 : results.length - 1
        } else if (e.key === 'Enter') {
            if (selected_index > -1) {
                handleSelect(results[selected_index].code);
            } else {
                handleSelect(query.toUpperCase());
            }
        } else if (e.key === 'Escape') {
            results = [];
            selected_index = -1;
        }
    };
</script>

<div class="search-bar">
    <input 
        class="input"
        type="text"
        placeholder="Busca el alias…"
        bind:value={query}
        on:keydown={handleKeyDown}
        autocomplete="off"
    />

    {#if results.length}
        <div class="results">
            {#each results as item, i}
                <button 
                    class:highlighted={i === selected_index}
                    on:click={() => handleSelect(item.code)}
                    on:mouseenter={() => selected_index = i}
                >
                    {item.code}
                </button>
            {/each}
        </div>
    {/if}
</div>
