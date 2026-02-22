<script>
    import './sass/page.sass'
    import { slide, fade } from 'svelte/transition'
    import { goto } from '$app/navigation'
    import { BigDropdown, HallCard } from '$lib/components'
    import { buildingStore, openFloorsStore } from '$lib/store/building_store'

    let { data } = $props()
    let halls = []
    let floors = $state(-1)
    let open = $state($openFloorsStore)
    let selected = $state("default")

    const onSelectChange = (e) => { 
        const value = e.target.value
        open = [false, false, false]
        openFloorsStore.set(open)
        buildingStore.set(value)
    }

    const updateFloors = (code) => {
        const number_part = code.replace(/\D/g, "")
        const first_digit = parseInt(number_part[0], 10)

        if (first_digit > floors) {
            floors = first_digit
        }
    }

    const handleChange = async (value) => {
        floors = -1

        halls = data.halls.filter((data) => data.code.startsWith(value));
        halls.forEach(hall => updateFloors(hall.code))
    }

    buildingStore.subscribe((value) => {
        if (value && value !== selected) {
            selected = value
            handleChange(selected)
        }
    })

    const handleDrop = (i) => {
        open = open.map((v, index) => index === i ? !v : v)
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
        <select value={selected} on:change={onSelectChange}>
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
