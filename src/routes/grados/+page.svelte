<script>
    import './sass/page.sass'
    import { Schedule } from '../../lib/features/schedule'
    import { fetchDegrees } from '../../hooks/degrees'
    import { fetchCourses } from '../../hooks/courses'
    import { onMount } from 'svelte';

    let degrees = []
    let all_courses = []
    let selected_courses = []
    let loading = true
    let error = ''

    onMount(async () => {
        try {
            degrees = await fetchDegrees()
            all_courses = await fetchCourses()
        } catch (err) {
            error = err.message
        } finally {
            loading = false
        }
    })

    let selected = ''
    let userSelected = false

    $: if (userSelected && selected) {
        const degree = degrees.find(degree => degree.code === selected)
        if (degree) {
            selected_courses = all_courses.filter(course => course.degree_id === degree.id)
        }
    }
</script>

{#if loading}
    <div>
        <h1>Loading...</h1>
    </div>
{:else}
    <div class="degree">
        <div class="degree-selection">
            <div class="degree-selection-dropdown">
                <select bind:value={selected} on:change={() => userSelected = true}>
                    <option value="" disabled selected>Selecciona un grado</option>
                    {#each degrees as degree}
                        <option>{degree.code}</option>
                    {/each}
                </select>
            </div>
            <div class="degree-selection-groups">
                {#each selected_courses as course}
                    <h2 class="option">{course.code}<p>></p></h2>
                {/each}    
            </div>
        </div>
        <div class="degree-schedule">
            <Schedule id="schedule" />
        </div>
    </div>
{/if}
