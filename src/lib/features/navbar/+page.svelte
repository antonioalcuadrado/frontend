<script>
    import Button from './components/button.svelte'
    import { goto } from '$app/navigation'
    import './sass/navbar.sass'
</script>

<div class="navbar">
    <div class="navbar-buttons">
        <img class="navbar-logo" src="/u-tad-logo.svg" alt="logo" on:click={() => goto('/')} />
        <Button title="GRADOS" url="/grados" />
        <Button title="AULAS" url="/aulas" />
        <Button title="HORARIO" url="/horario" />
<!--        <Button title="PROFESORES" url="/profesores" /> -->
    </div>
    <img class="navbar-user" src="/person.svg" alt="user" on:click={() => goto('/user')} />
</div>
