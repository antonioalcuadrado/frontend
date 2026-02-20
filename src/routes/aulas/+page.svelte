<script>
    import './sass/page.sass'
    import { BigDropdown } from '$lib/components'
    import { fetchAllHalls } from '../../hooks/halls.js'

    let halls = []
    let floors = -1

    const updateFloors = (code) => {
        const number_part = code.replace(/\D/g, "")
        const first_digit = parseInt(number_part[0], 10)

        if (first_digit > floors) {
            floors = first_digit
        }
    }

    const handleChange = async (e) => {
        const value = e.target.value
        floors = -1

        const data = await fetchAllHalls()
        halls = data.filter((data) => data.code.startsWith(value));
        halls.forEach(hall => updateFloors(hall.code))

        console.log(data)
    }
</script>

<div class="halls">
    <section class="halls-selector">
        <label>Edificio</label>
        <select on:change={handleChange}>
            <option value="0" disabled selected>Selecciona un edificio</option>
            <option value="MD">Madrid</option>
            <option value="BE">Berlín</option>
            <option value="BR">Bruselas</option>
            <option value="LD">Londres</option>
        </select>
    </section>
    <section class="halls-floors">
        {#if floors > -1}
            {#each Array(floors + 1) as _, i}
                <BigDropdown name="Planta {i}" />
            {/each}
        {:else}
            <p style="margin-left: 2%; color: gray;">No hay plantas con clases en este edificio</p>
        {/if}
    </section>
</div>
