<script>
    import './sass/page.sass'
    import { slide, fade } from 'svelte/transition'
    import { goto } from '$app/navigation'
    import { BigDropdown, HallCard } from '$lib/components'
    import { fetchAllHalls } from '../../hooks/halls.js'
    import { buildingStore, openFloorsStore } from '$lib/store/building_store'

    let halls = []
    let floors = -1
    $: open = $openFloorsStore
    $: selected = $buildingStore
    
    const updateFloors = (code) => {
        const number_part = code.replace(/\D/g, "")
        const first_digit = parseInt(number_part[0], 10)

        if (first_digit > floors) {
            floors = first_digit
        }
    }

    $: if (selected) {
        handleChange(selected)
        buildingStore.set(selected)
    }

    const handleChange = async (value) => {
        floors = -1

        const data = await fetchAllHalls()
        halls = data.filter((data) => data.code.startsWith(value));
        halls.forEach(hall => updateFloors(hall.code))
    }

    const handleDrop = (i) => {
        open[i] = !open[i]
        openFloorsStore.set(open)
    }

    const getFloorHalls = (i) => {
        const floor_halls = halls.filter((hall) => parseInt(hall.code[2]) === i)

        return floor_halls
    }

    const goToSchedule = async (hall) => {
        goto(`/aulas/${hall.id}`)
    }
</script>

<div class="halls">
    <section class="halls-selector">
        <label>Edificio</label>
        <select bind:value={selected}>
            <option value="default" disabled selected>Selecciona un edificio</option>
            <option value="MD">Madrid</option>
            <option value="BE">Berlín</option>
            <option value="BR">Bruselas</option>
            <option value="LD">Londres</option>
        </select>
    </section>
    <section class="halls-floors">
        {#if floors > -1}
            {#each Array(floors + 1) as _, i}
                <BigDropdown onClick={handleDrop} name="Planta {i}" open={open[i]} />
                {#if open[i]}
                    <div in:fade={{duration:300}} out:fade={{duration:200}}>
                        <div class="halls-floors-halls" in:slide={{duration: 300}} out:slide={{duration:200}}>
                            {#each getFloorHalls(i) as hall}
                                <HallCard onClick={goToSchedule} hall={hall} />
                            {/each}
                        </div>
                    </div>
                {/if}
            {/each}
        {:else}
            <p style="margin-left: 2%; color: gray;">No hay plantas con clases en este edificio</p>
        {/if}
    </section>
</div>
