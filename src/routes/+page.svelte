<script>
    import './sass/home.sass'
import { goto } from '$app/navigation'
</script>

<div class="home">
    <section class="home-body">
        <h1 class="home-body-title">Personaliza tu horario</h1>
        <p class="home-body-txt">Usa nuestra herramienta para conseguir el mejor horario posible y deja de pasar 12 horas dentro de la universidad, para solo 4 horas de clases.</p>
        <button class="home-body-create" on:click={() => {goto("/horario")}}>Crea tu horario</button>
    </section>
</div>
