<script>
    import './sass/big_dropdown.sass'
    import { RightArrow } from '$lib/icons';
    export let name = "N/A";
    export let onClick;

    export let open = false;

    const handleClick = () => {
        open = !open;
        onClick(parseInt(name[7]));
    }
</script>

<button class="dropdown" on:click={handleClick}>
    {name} <RightArrow className={open ? "open" : "close"} />
</button>
