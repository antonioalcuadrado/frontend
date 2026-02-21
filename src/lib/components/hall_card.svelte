<script>
    import './sass/hall_card.sass'
    import { RightArrow } from '$lib/icons'
    export let code;
</script>

<div class="hall-card">
    <h1>{code}</h1>
    <RightArrow size="1.5" color="#000" className="hall-arrow" />
</div>
