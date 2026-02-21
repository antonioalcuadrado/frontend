<script>
    import './sass/big_dropdown.sass'
    import { RightArrow } from '$lib/icons';
    export let name = "N/A";
    export let onClick;

    let close = true;

    const handleClick = () => {
        close = !close;
        onClick(parseInt(name[7]));
    }
</script>

<button class="dropdown" on:click={handleClick}>
    {name} <RightArrow className={close ? "close" : "open"} />
</button>
