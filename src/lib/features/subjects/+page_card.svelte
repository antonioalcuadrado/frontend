<script>
    import './sass/card.sass'

    export let subject
    export let onClick

    const handleClick = () => {
        onClick(subject)
    }
</script>

<div class="subject-card">
    <section class="subject-card-alias">
        {subject.alias}
    </section>
    <section class="subject-card-name">
        {subject.name}
    </section>
    <section class="subject-card-semester">
        {subject.cuatrimester}
    </section>
    <button class="subject-card-add" on:click={handleClick}>
        Añadir
    </button>
</div>
