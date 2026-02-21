<script>
    import './sass/hall_card.sass'
    import { RightArrow } from '$lib/icons'
    export let hall;
    export let onClick;
</script>

<button class="hall-card" on:click={() => onClick(hall)}>
    <h1>{hall.code}</h1>
    <RightArrow size="1.5" color="#000" className="hall-arrow" />
</button>
