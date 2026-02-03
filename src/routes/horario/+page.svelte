<script>
    import './sass/page.sass'
    import { onMount } from 'svelte'
    import { getSemester, filterSubjectsBySemester } from '../../utils'
    import { fetchCourses } from '../../hooks/courses'
    import { fetchSubjectsByCourse } from '../../hooks/subjects'
    import { fetchSchedules } from '../../hooks/schedules'
    import { SubjectCard, SubjectSelect } from '../../lib/features/subjects'
    import { SearchBar } from '../../lib/components'
    import { horarioStore } from './store'
    import { goto } from '$app/navigation'

    let course_selected = ""
    let semester_selected = getSemester()
    
    let courses = []
    let subjects = []
    let selected_subjects = []
    let loading = true
    
    onMount(async () => {
        try {
            courses = await fetchCourses()
        } catch (error) {
            console.log(error)
        } finally {
            loading = false
        }
    })
 
    const handleBarClick = (code) => {   
        course_selected = code
        handleSearch()
    }

    const handleSearch = async () => {
        if (course_selected && semester_selected) {
            const course = courses.find(c => c.code === course_selected)
            subjects = await fetchSubjectsByCourse(course.id)
            
            subjects = filterSubjectsBySemester(subjects, semester_selected)
        } else if (!course_selected) {
            alert("Selecciona un curso en el buscador con Enter.")
        } else {
            alert("Selecciona un cuatrimestre.")
        }
    }

    const addSubject = (subject) => {
        const exists = selected_subjects.some(s => s.id === subject.id)
        if (exists) return

        selected_subjects = [...selected_subjects, {id: subject.id, alias: subject.alias, semester: subject.cuatrimester, course: course_selected}]
    }

    const handleScheduleCreation = async () => {
        if (!selected_subjects.length) alert("No se han seleccionado asignaturas")
        const subjects_id = selected_subjects.map(s => s.id)
        const classes = await fetchSchedules(subjects_id)

        horarioStore.set(classes)
        goto('/horario/personalizado')
    }
</script>

<div class="horario">
    <div class="horario-selection">
        <section class="horario-selection-filters">
            <div class="filter">
                <label>Curso</label>
                <SearchBar data={courses} handleClick={handleBarClick} />
            </div>
            <div class="filter">
                <label>Cuatrimestre</label>
                <select class="semester" bind:value={semester_selected}>
                    <option class="semester-option" value="" disabled>Selecciona el cuatrimestre</option>
                    <option class="semester-option" value="1">Cuatrimestre 1</option>
                    <option class="semester-option" value="2">Cuatrimestre 2</option> 
                </select>
            </div>
            <button class="search" on:click={() => handleSearch()}>
                Buscar
            </button>
        </section>
        <section class="horario-selection-subjects">
            <div class="horario-selection-subjects-index">
                <p class="alias">Alias</p>
                <p class="name">Nombre</p>
                <p class="semester">Cuatrimestre</p>
            </div>
            {#if (!subjects.length)}
                <p class="empty-msg">No hay ninguna asignatura por mostrar</p>
            {:else}
                {#each subjects as subject}
                    <SubjectCard subject={subject} onClick={addSubject} />
                {/each}
            {/if}
        </section>
    </div>
    <div class="horario-selected">
        <div class="horario-selected-title">
            <h1>Asignaturas seleccionadas</h1>
            <button class="create" on:click={handleScheduleCreation}>Crear</button>
        </div>
        <section class="horario-selected-subjects">
            <div class="horario-selected-subjects-index">
                <p class="alias">Alias</p>
                <p class="course">Curso</p>
                <p class="semester">Cuatrimestre</p>
            </div>
            {#if (!selected_subjects.length)}
                <p class="empty-msg">No se ha seleccionado ninguna asignatura</p>
            {:else}
                {#each selected_subjects as subject}
                    <SubjectSelect subject={subject} />
                {/each}
            {/if}
        </section>
    </div>
</div>
