<script>
    import './sass/big_dropdown.sass'
    import { RightArrow } from '$lib/icons';
    export let name = "N/A";

    let close = true;

    const handleClick = () => {
        close = !close;
    }
</script>

<button class="dropdown" on:click={handleClick}>
    {name} <RightArrow className={close ? "close" : "open"} />
</button>
