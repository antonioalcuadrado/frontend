<script>
    import { goto } from "$app/navigation"
    export let title = "Click me"
    export let url = "#"
</script>

<div on:click={() => goto(url)} class="navbar-button">
    <h1 class="navbar-button-text">{title}</h1>
</div>

<style lang="sass">
    @use "../sass/Button" as *;
</style>
