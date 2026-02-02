<script>
    import './sass/selected.sass'

    export let subject    
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
</div>
