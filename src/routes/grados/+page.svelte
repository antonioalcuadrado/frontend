<script>
    import './sass/page.sass'
    import { Schedule } from '../../lib/features/schedule'
    import { fetchDegrees } from '../../hooks/degrees'
    import { fetchCourses } from '../../hooks/courses'
    import { fetchSubjectsByCourse } from '../../hooks/subjects'
    import { fetchSchedules } from '../../hooks/schedules'
    import { onMount } from 'svelte';

    let degrees = []
    let all_courses = []
    let selected_courses = []
    let classes = []
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

    const handleClick = async (event) => {
        const id = event.currentTarget.value
        let subjects = await fetchSubjectsByCourse(id)

        subjects = subjects.map(s => s.id)
        if (!subjects.length) {
            classes = []
            return
        }

        classes = await fetchSchedules(subjects)
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
                    <button class="option" value={course.id} on:click={handleClick}>{course.code}<p>></p></button>
                {/each}    
            </div>
        </div>
        <div class="degree-schedule">
            <Schedule id="schedule" classes={classes} />
        </div>
    </div>
{/if}
