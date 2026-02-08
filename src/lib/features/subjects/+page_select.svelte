<script>
    import './sass/selected.sass'
    import { Trash } from '../../icons'

    export let subject    
    export let index
    export let handleClick
</script>

<div class="subject-select-card">
    <section class="alias">
        <p>{subject.alias}</p>
    </section>
    <section class="course">
        <p>{subject.course}</p>
    </section>
    <section class="semester">
        <p>{subject.semester}</p>
    </section>
    <button class="delete" on:click={() => handleClick(index)}>
        <Trash size=60 color="#fff" />
    </button>
</div>
