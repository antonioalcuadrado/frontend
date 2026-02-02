<script>
    import './sass/page.sass'
    import { onMount } from 'svelte'
    import { fetchDegrees } from '../../hooks/degrees'
    import { fetchCourses } from '../../hooks/courses'
    import { fetchSubjectsByCourse } from '../../hooks/subjects'
    import { fetchSchedules } from '../../hooks/schedules'
    import { SubjectCard, SubjectSelect } from '../../lib/features/subjects'
    import { horarioStore } from './store'
    import { goto } from '$app/navigation'

    let degree_selected = ""
    let course_selected = ""
    let semester_selected = ""

    let str_course = "Primero selecciona grado"
    let str_semester = "Primero selecciona curso"

    let degrees = []
    let all_courses = []
    let selected_courses = []
    let subjects = []
    let selected_subjects = []
    let loading = true
    
    onMount(async () => {
        try {
            degrees = await fetchDegrees()
            all_courses = await fetchCourses()
        } catch (error) {
            console.log(error)
        } finally {
            loading = false
        }
    })

    $ : if (degree_selected) {

        const degree = degrees.find(degree => degree.code === degree_selected)
        
        if (degree) {
            str_course = "Selecciona curso"
            selected_courses = all_courses.filter(course => course.degree_id === degree.id)
        }
    }

    $ : if (course_selected) {
        str_semester = "Selecciona cuatrimestre"
    }

    const handleSearch = async () => {
        if (degree_selected && course_selected && semester_selected) {
            const course = selected_courses.find(course => course.code === course_selected)
            
            subjects = await fetchSubjectsByCourse(course.id)
            
            if (semester_selected == "1er Cuatrimestre") {
                subjects = subjects.filter(subject => subject.cuatrimester === 1)
            } else {
                subjects = subjects.filter(subject => subject.cuatrimester === 2)
            }
        } else {
            console.log("Error")
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
                <label>Grado</label>
                <select class="degrees" bind:value={degree_selected}>
                    <option class="degree-option" value="" selected disabled>Selecciona grado</option>
                    {#each degrees as degree}
                        <option class="degree-option">{degree.code}</option>
                    {/each}
                </select>
            </div>
            <div class="filter">
                <label>Curso</label>
                <select class="course" bind:value={course_selected}>
                    <option class="course-option" value="" selected disabled>{str_course}</option>
                    {#each selected_courses as course}
                        <option class="course-option">{course.code}</option>
                    {/each}
                </select>
            </div>
            <div class="filter">
                <label>Cuatrimestre</label>
                <select class="semester" bind:value={semester_selected}>
                    <option class="semester-option" value="" selected disabled>{str_semester}</option>
                    {#if (course_selected)}
                        <option class="semester-option">1er Cuatrimestre</option>
                        <option class="semester-option">2º Cuatrimestre</option>
                    {/if}
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
                <p>No hay ninguna asignatura por mostrar</p>
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
                <p>No se ha seleccionado ninguna asignatura</p>
            {:else}
                {#each selected_subjects as subject}
                    <SubjectSelect subject={subject} />
                {/each}
            {/if}
        </section>
    </div>
</div>
